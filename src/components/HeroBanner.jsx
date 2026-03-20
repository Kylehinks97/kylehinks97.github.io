import { Link } from "react-router-dom";
import OptimizedImage from "./OptimizedImage";
import { heroMetrics, hiringHighlights, reviewLinks } from "../siteData";

export default function HeroBanner() {
  return (
    <section className="hero">
      <Link to="/inquiry" className="hero__hiring-banner">
        <span>We are currently hiring carers. Apply now.</span>
      </Link>

      <div className="hero__media">
        <OptimizedImage
          src="/images/Ultra-compressed%20Home%20Image_converted.avif"
          alt="A carer supporting an older woman at home"
          className="hero__image"
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero__overlay" />
        <div className="hero__content shell">
          <div className="hero__copy">
            <span className="section-eyebrow">Trusted home care</span>
            <h1>Compassionate support that keeps independence at the centre.</h1>
            <p>
              Libra Care provides flexible, person-centred home care with a
              focus on dignity, consistency, and responsive communication.
            </p>
            <div className="hero__actions">
              <Link to="/inquiry" className="button button--primary">
                Make an inquiry
              </Link>
              <Link to="/contact-us" className="button button--secondary">
                Contact us
              </Link>
            </div>
            <div className="hero__metrics">
              {heroMetrics.map((metric) => (
                <article key={metric.label} className="hero__metric">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </article>
              ))}
            </div>
          </div>

          <aside className="hero__aside">
            <a
              href={reviewLinks.staff}
              target="_blank"
              rel="noreferrer"
              className="hero__rating-card"
            >
              <span className="section-eyebrow">Careers</span>
              <h2>Why people like working with Libra Care</h2>
              <ul>
                {hiringHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </a>

            <a
              href={reviewLinks.cqc}
              target="_blank"
              rel="noreferrer"
              className="hero__trust-badge"
            >
              <OptimizedImage
                src="/images/CQC.png"
                alt="Care Quality Commission rated good"
              />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
