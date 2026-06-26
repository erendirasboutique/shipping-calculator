import { NextResponse } from "next/server";

function cleanZip(zip) {
  return String(zip || "").trim().slice(0, 10);
}

function cleanWeight(weight) {
  const number = Number(weight);
  if (!Number.isFinite(number) || number <= 0) return null;
  return number.toFixed(2);
}

export async function POST(req) {
  try {
    const { zip, weight } = await req.json();

    const destinationZip = cleanZip(zip);
    const packageWeight = cleanWeight(weight);

    if (!destinationZip || !packageWeight) {
      return NextResponse.json(
        { error: "Please enter a valid ZIP code and package weight." },
        { status: 400 }
      );
    }

    if (!process.env.SHIPPO_API_TOKEN) {
      return NextResponse.json(
        { error: "Missing Shippo API token. Add SHIPPO_API_TOKEN in Vercel environment variables." },
        { status: 500 }
      );
    }

    const shipment = {
      address_from: {
        name: process.env.ORIGIN_NAME || "Erendira's Boutique",
        street1: process.env.ORIGIN_STREET || "YOUR BUSINESS STREET",
        city: process.env.ORIGIN_CITY || "Fontana",
        state: process.env.ORIGIN_STATE || "CA",
        zip: process.env.ORIGIN_ZIP || "92335",
        country: "US",
        phone: process.env.ORIGIN_PHONE || "9090000000",
        email: process.env.ORIGIN_EMAIL || "support@erendirasboutique.com",
      },
      address_to: {
        name: "Customer",
        street1: "Customer Address",
        city: "Customer City",
        state: "CA",
        zip: destinationZip,
        country: "US",
      },
      parcels: [
        {
          length: process.env.PARCEL_LENGTH || "10",
          width: process.env.PARCEL_WIDTH || "7",
          height: process.env.PARCEL_HEIGHT || "2",
          distance_unit: "in",
          weight: packageWeight,
          mass_unit: "lb",
        },
      ],
      async: false,
    };

    const response = await fetch("https://api.goshippo.com/shipments/", {
      method: "POST",
      headers: {
        Authorization: `ShippoToken ${process.env.SHIPPO_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shipment),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Shippo could not calculate rates for this ZIP and weight.",
          details: data,
        },
        { status: response.status }
      );
    }

    const rates = (data.rates || [])
      .map((rate) => ({
        provider: rate.provider,
        service: rate.servicelevel?.name || rate.servicelevel?.token || "Shipping Service",
        amount: rate.amount,
        currency: rate.currency,
        estimatedDays: rate.estimated_days,
        durationTerms: rate.duration_terms,
      }))
      .filter((rate) => rate.amount)
      .sort((a, b) => Number(a.amount) - Number(b.amount));

    return NextResponse.json({ rates });
  } catch {
    return NextResponse.json(
      { error: "Server error calculating shipping rates." },
      { status: 500 }
    );
  }
}
