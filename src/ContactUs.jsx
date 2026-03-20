import InquiryForm from "./components/InquiryForm";
import { brand } from "./siteData";

export default function ContactUs() {
  return (
    <div className="shell section">
      <div className="section-copy section-copy--center">
        <span className="section-eyebrow">Contact us</span>
        <h1>Speak with Libra Care</h1>
        <p>
          If you would like to discuss care, careers, or a new inquiry, you can
          contact us directly or use the form below.
        </p>
      </div>

      <div className="contact-grid">
        <article className="feature-card">
          <h3>Email</h3>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
        </article>
        <article className="feature-card">
          <h3>Telephone</h3>
          <a href={`tel:${brand.phoneHref}`}>{brand.phone}</a>
        </article>
        <article className="feature-card">
          <h3>Mobile</h3>
          <a href={`tel:${brand.mobileHref}`}>{brand.mobile}</a>
        </article>
        <article className="feature-card">
          <h3>Address</h3>
          <p>{brand.address.join(", ")}</p>
        </article>
      </div>

      <InquiryForm
        title="Secure contact form"
        subtitle="Get in touch with us directly or use the form below."
      />
    </div>
  );
}
