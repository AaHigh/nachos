# Hightower Helix — nachos.ahightower.com

Single serving custom nachos from the Tower District, Fresno.

## What's in this repo

- `index.html` — Beautiful interactive landing page with live pricing and code generator
- `helix-code-encoder.js` — The 5-character code encoder/decoder (v2 with blend 0-9)

## How to deploy to GitHub Pages

1. Create a new repository (or use an existing one) called `nachos` (or whatever you want)
2. Upload these files to the root
3. Go to Settings → Pages
4. Set Source to "Deploy from a branch" → `main` (or `master`)
5. Your site will be live at `https://yourusername.github.io/nachos/`

## Pointing a custom domain (nachos.ahightower.com)

- In your domain registrar / Cloudflare, create a CNAME record:
  - Host: `nachos`
  - Value: `yourusername.github.io`
- In the GitHub repo Settings → Pages, add the custom domain `nachos.ahightower.com`
- GitHub will give you a verification TXT record if needed

## Quick customization

- **Pricing**: Edit the `PRICING` object at the very top of the `<script>` in `index.html`
- **Toppings list**: Edit the `TOPPINGS_LIST` array in the same file
- **Images**: Replace the demo `picsum` image with your real generated nachos photo
- **Contact**: Update the Facebook link in the final CTA

## The Code System

5-character codes like `B5K4P` or `C0X7M` that lock in:
- Base ratio + exact blend 0–9 (0 = pure Indian no-cheese hack)
- All selected toppings

Customers build once, get the code, and can repeat the exact order anytime by just saying/texting the code.

## Encoder (optional)

The `helix-code-encoder.js` file contains the same logic if you want to use it in other tools or a backend later.

Built for Aaron Hightower — Tower District, Fresno.
