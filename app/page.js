export default function HomePage() {
  return (
    <main className="site-shell">
      <nav className="navbar">
        <a href="/" className="brand">Erendira&apos;s Boutique</a>
        <div className="nav-links">
          <a href="/shipping-calculator">Shipping Calculator</a>
          <a href="/tracking">Tracking</a>
          <a href="/returns">Returns</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Customer Portal</span>
          <h1>Shipping made simple.</h1>
          <p className="lead">
            Use the shipping calculator to estimate rates by destination ZIP code and package weight.
          </p>
          <a className="button" href="/shipping-calculator" style={{display: "inline-block", width: "auto", marginTop: 24}}>
            Open Calculator
          </a>
        </div>
      </section>
    </main>
  );
}
