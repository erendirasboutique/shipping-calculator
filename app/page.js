"use client";

import { useState } from "react";

export default function HomePage() {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zip, weight })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Could not calculate shipping rates.");
        return;
      }

      if (!data.rates || data.rates.length === 0) {
        setError("No rates were found. Try a different ZIP or weight.");
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
    <div className="page">
      <header className="header">
        <a href="/" className="logoWrap">
          <img src="/eb-logo.png" alt="Erendira's Boutique" className="logo" />
        </a>

        <nav className="nav">
          <a href="https://www.erendirasboutique.com/">Home</a>
          <a href="https://www.erendirasboutique.com/return-policy">Return Policy</a>
          <a href="/tracking">Tracking</a>
          <a href="/returns">Returns</a>
        </nav>
      </header>

      <main className="main">
        <section className="hero">
          <div className="flower flowerOne">✿</div>
          <div className="flower flowerTwo">✿</div>

          <p className="kicker">Live Shipping Estimate</p>
          <h1>Shipping Calculator</h1>
          <p className="lead">
            Enter your ZIP code and package weight to view live shipping rates.
          </p>
        </section>

        <section className="calculator">
          <form onSubmit={calculateRates} className="form">
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
              {loading ? "Calculating..." : "Calculate Shipping"}
            </button>
          </form>

          {error && <div className="error">{error}</div>}

          {rates.length > 0 && (
            <div className="rates">
              {rates.map((rate, index) => (
                <article className="rateCard" key={`${rate.provider}-${rate.service}-${index}`}>
                  <div>
                    <p className="provider">{rate.provider}</p>
                    <h3>{rate.service}</h3>
                    {rate.estimatedDays && (
                      <p className="meta">Estimated delivery: {rate.estimatedDays} business days</p>
                    )}
                    {rate.durationTerms && <p className="meta">{rate.durationTerms}</p>}
                  </div>
                  <p className="price">${rate.amount}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="footerInner">
          <img src="/eb-logo.png" alt="Erendira's Boutique" className="footerLogo" />

          <div className="footerLinks">
            <a href="https://www.erendirasboutique.com/">Home</a>
            <a href="https://ebtq.io">ebtq.io</a>
            <a href="/contact">Contact</a>
            <a href="/gallery">Gallery</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
