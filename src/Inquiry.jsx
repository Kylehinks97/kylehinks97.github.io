import InquiryForm from "./components/InquiryForm";

export default function Inquiry() {
  return (
    <div className="shell section">
      <div className="section-copy section-copy--center">
        <span className="section-eyebrow">Inquiry</span>
        <h1>Tell us how we can help</h1>
        <p>
          Use this form for care requests or career applications. We will review
          your inquiry and respond as soon as we can.
        </p>
      </div>
      <InquiryForm />
    </div>
  );
}
