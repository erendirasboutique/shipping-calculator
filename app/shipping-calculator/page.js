"use client";

import { useState } from "react";

export default function ShippingCalculatorPage() {
  const [zip, setZip] = useState("");
  const [weight, setWeight] = useState("");
  const [rates, setRates] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function calculateRates(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setRates([]);

    try {
      const response = await fetch("/api/shippo-rates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ zip, weight })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Could not calculate rates.");
        return;
      }

      if (!data.rates || data.rates.length === 0) {
        setError("No rates were returned for that ZIP and weight.");
        return;
      }

      setRates(data.rates);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="site-shell">
      <nav className="navbar">
        <a href="/" className="brand">Erendira&apos;s Boutique</a>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/tracking">Tracking</a>
          <a href="/returns">Returns</a>
          <a href="/contact">Contact</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Shipping Estimate</span>
          <h1>Calculate your shipping rate.</h1>
          <p className="lead">
            Enter a destination ZIP code and package weight to view live shipping
            rates powered by Shippo. Rates are estimates and may change at checkout.
          </p>

          <div className="feature-list">
            <div className="feature"><span className="dot"></span>Live carrier pricing from Shippo</div>
            <div className="feature"><span className="dot"></span>Sorted from lowest to highest</div>
            <div className="feature"><span className="dot"></span>Works with USPS, UPS, FedEx, DHL, and more when enabled in Shippo</div>
          </div>
        </div>

        <div className="calculator-card">
          <h2 className="card-title">Shipping Calculator</h2>
          <p className="card-subtitle">
            Use pounds for weight. Example: 1.5 for one and a half pounds.
          </p>

          <form onSubmit={calculateRates} className="form-grid">
            <div>
              <label htmlFor="zip">Destination ZIP Code</label>
              <input
                id="zip"
                className="input"
                value={zip}
                onChange={(event) => setZip(event.target.value)}
                placeholder="Example: 92335"
                required
              />
            </div>

            <div>
              <label htmlFor="weight">Package Weight</label>
              <input
                id="weight"
                className="input"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                placeholder="Example: 1.5"
                type="number"
                min="0.1"
                step="0.1"
                required
              />
            </div>

            <button className="button" disabled={loading}>
              {loading ? "Calculating..." : "Calculate Rates"}
            </button>
          </form>

          {error && <div className="error-box">{error}</div>}
        </div>
      </section>

      {rates.length > 0 && (
        <section className="rates">
          <h2>Available Rates</h2>
          <div className="rate-grid">
            {rates.map((rate, index) => (
              <article className="rate-card" key={`${rate.provider}-${rate.service}-${index}`}>
                <div className="rate-provider">{rate.provider}</div>
                <div className="rate-service">{rate.service}</div>
                <div className="rate-price">${rate.amount}</div>
                <div className="rate-meta">
                  {rate.currency && <div>{rate.currency}</div>}
                  {rate.estimatedDays && (
                    <div>Estimated delivery: {rate.estimatedDays} business days</div>
                  )}
                  {rate.durationTerms && <div>{rate.durationTerms}</div>}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <footer className="footer">
        <div className="footer-inner">
          <div>© {new Date().getFullYear()} Erendira&apos;s Boutique</div>
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="https://ebtq.io">ebtq.io</a>
            <a href="/contact">Contact</a>
            <a href="/gallery">Gallery</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
