export async function onRequest(context) {

    // !! UPDATE ME !! - HARDCODED SECRETS. Use wrangler.toml if you prefer more opsec.
    const SLIVER_ENDPOINT = "https://sliver.domain.com";
    const LIGOLO_ENDPOINT = "https://ligolo.domain.com";
    const SERVICE_CF_ID = "redacted.access";
    const SERVICE_CF_SECRET = "redacted";
    const SLIVER_HEADER_NAME = ["header1", "header2"];
    const SLIVER_HEADER_VALUE = ["value1", "value2"];
    const SLIVER_UA = "sliverua";
    const LIGOLO_UA = "ligoloua";

    const req = context.request;
    const userAgent = req.headers.get("User-Agent");
    let endpoint = ""; 

    
    // Ligolo - UA check 
    if (userAgent && userAgent === LIGOLO_UA) {
        endpoint = LIGOLO_ENDPOINT;
    } 
    // Sliver - HTTP Header & Value + UA & UA value
    else{ 
        for (let i = 0; i < SLIVER_HEADER_NAME.length; i++) {
            const headerName = SLIVER_HEADER_NAME[i];
            const headerValue = SLIVER_HEADER_VALUE[i];
            const reqHeaderValue = req.headers.get(headerName);

            if (!reqHeaderValue || reqHeaderValue !== headerValue) {
                return new Response("Forbidden", { status: 403 });
            }
        }

        if (!userAgent || userAgent !== SLIVER_UA) {
            return new Response("Forbidden", { status: 403 });
        }

        endpoint = SLIVER_ENDPOINT;
    }

    // Build request for backend tunnel 
    const originalUrl = new URL(req.url);
    const tunnelUrl = new URL(originalUrl.pathname + originalUrl.search, endpoint).toString(); 
    const modifiedHeaders = new Headers(req.headers);

    const incomingCookie = req.headers.get("Cookie") || "";
    if (!incomingCookie.includes("CF_Authorization=")) {
        modifiedHeaders.set("CF-Access-Client-Id", SERVICE_CF_ID);
        modifiedHeaders.set("CF-Access-Client-Secret", SERVICE_CF_SECRET);
    } else {
        modifiedHeaders.delete("CF-Access-Client-Id");
        modifiedHeaders.delete("CF-Access-Client-Secret");
    }

    // Send it 
    const tunnelRequest = new Request(tunnelUrl, {
        method: req.method,
        headers: modifiedHeaders,
        body: req.body,
    });
    
    const tunnelResponse = await fetch(tunnelRequest);

    return tunnelResponse;
}
