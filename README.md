# Cloudflare Pages Functions Redirector 

Create C2 and Ligolo-ng redirector on Cloudflare Pages, using the Functions feature.  

Blog post (KOREAN): https://www.xn--hy1b43d247a.com/infrastructure/cloudflared-tunnel-pages
Inspired by: https://labs.jumpsec.com/putting-the-c2-in-c2loudflare/

## Usage 
```
# Install wrangler 
sudo apt update -y 
sudo apt install npm nodejs -y 
npm install wrangler --save-dev 
npx wrangler login 

# Configure secrets in index.js and [[catchall.js]]
<...> 

# Deploy. Use FULL DIRECTORY name or $PWD. "." will NOT work. 
npx wrangler pages deploy $PWD --project-name pagesrdr --branch=main

# Wait for 5 minutes for deployment + DNS propagation 
```

## MISC 
- Use `wrangler.toml` if you prefer more opsec 
