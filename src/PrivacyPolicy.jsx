import { privacySections } from "./siteData";

export default function PrivacyPolicy() {
  return (
    <div className="shell section">
      <div className="section-copy section-copy--center">
        <span className="section-eyebrow">Privacy policy</span>
        <h1>How we handle website and inquiry data</h1>
      </div>
      <div className="content-card">
        {privacySections.map((section) => (
          <section key={section.title} className="policy-section">
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
