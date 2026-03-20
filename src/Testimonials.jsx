import ReviewCarousel from "./components/ReviewCarousel";
import { reviewLinks } from "./siteData";

export default function Testimonials() {
  return (
    <div className="shell section">
      <div className="section-copy section-copy--center">
        <span className="section-eyebrow">Testimonials</span>
        <h1>Feedback from customers and staff</h1>
        <p>
          Libra Care is proud of the reviews shared by customers, families, and
          staff across independent platforms.
        </p>
      </div>

      <div className="split-section">
        <ReviewCarousel />
        <div className="content-card">
          <h2>Read more</h2>
          <p>
            Staff reviews are available on{" "}
            <a href={reviewLinks.staff} target="_blank" rel="noreferrer">
              Indeed
            </a>
            .
          </p>
          <p>
            Customer reviews are available on{" "}
            <a href={reviewLinks.customers} target="_blank" rel="noreferrer">
              Best Care Compare
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
