import HeroBanner from "./components/HeroBanner";
import InquiryForm from "./components/InquiryForm";
import LogoGrid from "./components/LogoGrid";
import ReviewCarousel from "./components/ReviewCarousel";
import ServiceAreaMap from "./components/ServiceAreaMap";
import { reviewLinks, serviceHighlights } from "./siteData";

export default function Home() {
  return (
    <>
      <HeroBanner />

      <section className="shell section">
        <div className="section-copy section-copy--center">
          <span className="section-eyebrow">Why families choose us</span>
          <h2>Support that feels personal, practical, and dependable.</h2>
        </div>
        <div className="feature-grid">
          {serviceHighlights.map((highlight) => (
            <article key={highlight.title} className="feature-card">
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--muted">
        <div className="shell split-section">
          <div className="section-copy">
            <span className="section-eyebrow">Testimonials</span>
            <h2>What people say about Libra Care</h2>
            <p>
              We are proud of the feedback shared by customers and staff across
              trusted review platforms.
            </p>
            <div className="inline-actions">
              <a
                href={reviewLinks.customers}
                target="_blank"
                rel="noreferrer"
                className="button button--secondary"
              >
                Customer reviews
              </a>
              <a
                href={reviewLinks.staff}
                target="_blank"
                rel="noreferrer"
                className="button button--ghost"
              >
                Staff reviews
              </a>
            </div>
          </div>
          <ReviewCarousel />
        </div>
      </section>

      <section className="shell section">
        <ServiceAreaMap />
      </section>

      <section className="shell section">
        <InquiryForm />
      </section>

      <section className="shell section">
        <div className="section-copy section-copy--center">
          <span className="section-eyebrow">Accreditations and partners</span>
          <h2>Connected to the wider care community</h2>
        </div>
        <LogoGrid />
      </section>
    </>
  );
}
