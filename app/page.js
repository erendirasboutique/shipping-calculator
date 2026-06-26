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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ zip, weight })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Could not calculate shipping rates.");
        return;
      }

      if (!data.rates || data.rates.length === 0) {
        setError("No rates were returned. Try a different ZIP code or package weight.");
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
      <div className="backgroundFlower flowerA">✿</div>
      <div className="backgroundFlower flowerB">✿</div>
      <div className="backgroundFlower flowerC">✿</div>

      <header className="heroHeader">
        <div className="portalPill">Shipping Calculator</div>
        <img src="/logo.png" alt="Erendira's Boutique" className="heroLogo" />
        <p className="heroText">
          Calculate estimated shipping rates by ZIP code and package weight before checkout.
        </p>
      </header>

      <main className="portalCard">
        <section className="cardHeader">
          <p className="miniLabel"> Shipping Rate Estimate</p>
          <h1>Get your shipping rate</h1>
          <p>
            Enter the destination ZIP code and package weight. Rates are live estimates
            from eligible carriers.
          </p>
        </section>

        <form className="rateForm" onSubmit={calculateRates}>
          <div className="field">
            <label htmlFor="zip">Destination ZIP Code</label>
            <input
              id="zip"
              value={zip}
              onChange={(event) => setZip(event.target.value)}
              placeholder="Example: 90210"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="weight">Package Weight</label>
            <input
              id="weight"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              placeholder="Example: 1"
              type="number"
              min="0.1"
              step="0.1"
              required
            />
          </div>

          <button className="primaryButton" disabled={loading}>
            {loading ? "Calculating..." : "Calculate Shipping"}
          </button>
        </form>

        {error && <div className="errorBox">{error}</div>}

        {rates.length > 0 && (
          <section className="results">
            <h2>Available Rates</h2>

            <div className="rateGrid">
              {rates.map((rate, index) => (
                <article className="rateCard" key={`${rate.provider}-${rate.service}-${index}`}>
                  <div>
                    <p className="carrier">{rate.provider}</p>
                    <h3>{rate.service}</h3>

                    {rate.estimatedDays && (
                      <p className="rateMeta">
                        Estimated delivery: {rate.estimatedDays} business days
                      </p>
                    )}

                    {rate.durationTerms && (
                      <p className="rateMeta">{rate.durationTerms}</p>
                    )}
                  </div>

                  <p className="price">${rate.amount}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <img src="/logo.png" alt="Erendira's Boutique" />

        <h2>Erendira&apos;s Boutique</h2>
        <p>Envios cada Sabado!</p>

        <div className="footerLinks">
          <a href="https://www.erendirasboutique.com" target="_blank" rel="noopener noreferrer">🏠 Home</a>
          <a href="https://www.erendirasboutique.com/shop" target="_blank" rel="noopener noreferrer">🛍 Shop</a>
          <a href="https://www.erendirasboutique.com/gallery" target="_blank" rel="noopener noreferrer">📸 Gallery</a>
          <a href="https://www.erendirasboutique.com/contact" target="_blank" rel="noopener noreferrer">📧 Contact</a>
          <a href="https://www.erendirasboutique.com/return-policy" target="_blank" rel="noopener noreferrer">📄 Return Policy</a>
        </div>

        <small>© 2026 Erendira&apos;s Boutique</small>
      </footer>
    </div>
  );
}
