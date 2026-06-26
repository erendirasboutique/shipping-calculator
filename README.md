# Erendira's Boutique Matching Shippo Calculator

This version is styled to better match the Tracking and Returns portals:
- Centered logo
- Purple pill title
- Purple and green brand accents
- Floral background details
- Calculator directly on homepage
- Matching clean footer with green divider
- Solid purple Calculate Shipping button
- Smaller page logo

## Origin ZIP

Add your origin ZIP in `.env.local` locally, or in Vercel Environment Variables:

```env
ORIGIN_ZIP=92335
```

Also add your full origin address and Shippo token.

## Font

The CSS loads:

```text
/public/fonts/MDNichrome-Bold.otf
```

or:

```text
/public/fonts/MDNichrome-Bold.ttf
```

If the font still shows as Arial, the font file is not deployed in that exact location or the filename/extension does not match.

## Run

```bash
npm install
npm run dev
```
