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
.footer {
  max-width: 1120px;
  margin: 70px auto 20px;
  padding: 38px 20px;
  text-align: center;
  border-top: 2px solid rgba(111, 153, 64, 0.22);
  position: relative;
  z-index: 1;
}

.footer img {
  width: 170px;
  max-width: 70vw;
  display: block;
  margin: 0 auto 12px;
}

.footer h2 {
  font-family: var(--font-heading), Georgia, serif;
  font-size: 34px;
  margin: 8px 0;
  color: #2f261f;
}

.footer p {
  margin: 0 0 22px;
  color: #6b5648;
  font-size: 15px;
}

.footerLinks {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 22px;
}

.footerLinks a {
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(111, 153, 64, 0.18);
  color: #4f742a;
  padding: 11px 15px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 900;
  transition: 0.2s ease;
}

.footerLinks a:hover {
  background: #6f9940;
  color: white;
  transform: translateY(-2px);
}

.footer small {
  color: #6b5648;
}
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
