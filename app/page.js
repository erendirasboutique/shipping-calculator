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
      <header className="topHeader">
        <div className="headerButton">Shipping Calculator</div>
        <img src="/eb-logo.png" alt="Erendira's Boutique" className="mainLogo" />
      </header>

      <main className="content">
        <section className="calculatorShell">
          <div className="flower flowerOne">✿</div>
          <div className="flower flowerTwo">✿</div>
          <div className="flower flowerThree">✿</div>

          <div className="intro">
            <h1>Shipping Calculator</h1>
            <p>
              Enter your ZIP code and package weight to view live shipping rates
              through Shippo before checkout.
            </p>
          </div>

          <form className="form" onSubmit={calculateRates}>
            <div className="field">
              <label htmlFor="zip">Destination ZIP Code</label>
              <input
                id="zip"
                value={zip}
                onChange={(event) => setZip(event.target.value)}
                placeholder="Example: 92335"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="weight">Package Weight</label>
              <input
                id="weight"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                placeholder="Example: 1.5"
                type="number"
                min="0.1"
                step="0.1"
                required
              />
            </div>

            <button className="calculateButton" disabled={loading}>
              {loading ? "Calculating..." : "Calculate Shipping"}
            </button>
          </form>

          {error && <div className="errorBox">{error}</div>}

          {rates.length > 0 && (
            <section className="results">
              <h2>Available Rates</h2>

              <div className="rateList">
                {rates.map((rate, index) => (
                  <article className="rateCard" key={`${rate.provider}-${rate.service}-${index}`}>
                    <div>
                      <p className="provider">{rate.provider}</p>
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

                    <p className="ratePrice">${rate.amount}</p>
                  </article>
                ))}
              </div>
            </section>
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
