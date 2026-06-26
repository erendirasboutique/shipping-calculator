# Erendira's Boutique Shippo Shipping Calculator

A polished Next.js shipping calculator that uses the Shippo API to calculate live shipping rates based on destination ZIP code and package weight.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local`.

3. Add your real Shippo API token:

```env
SHIPPO_API_TOKEN=shippo_test_or_live_token_here
```

4. Update your origin address in `.env.local`.

5. Run the project:

```bash
npm run dev
```

6. Open:

```text
http://localhost:3000/shipping-calculator
```

## Important

Do not put your Shippo token in a client page. This project keeps it inside the server API route.
