# Cloudflare Pages Functions Redirector 

Create C2 and Ligolo-ng redirector on Cloudflare Pages, using the Functions feature.  

Blog(?) post (KOREAN): (TBD) 
Inspired by: https://labs.jumpsec.com/putting-the-c2-in-c2loudflare/

## Usage 

```
# Install wrangler 
sudo apt update -y 
sudo apt install npm nodejs -y 
npm install wrangler --save-dev 
npx wrangler login 

# Deploy. Use FULL DIRECTORY name or $PWD. "." will NOT work. 
npx wrangler pages deploy $PWD --project-name pagesrdr --branch=main
```

## MISC 

- Use `wrangler.toml` if you prefer more opsec 
