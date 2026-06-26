# Erendira's Boutique Fixed Shippo Calculator

Fixed:
- Removed green footer background
- Added thick green footer divider
- Added `/public/logo.png`
- Added `/public/eb-logo.png`
- Wired MDNichrome-Bold font path in CSS

Font file not included because it was not uploaded. Add MDNichrome-Bold.otf or MDNichrome-Bold.ttf to public/fonts.

## Important font step

If the font still shows Arial, place the actual font file here:

```text
public/fonts/MDNichrome-Bold.otf
```

or:

```text
public/fonts/MDNichrome-Bold.ttf
```

The filename must match exactly.

## Setup

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` and add your Shippo API token.
