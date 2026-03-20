import { dataProtectionPrinciples } from "./siteData";

export default function DataProtection() {
  return (
    <div className="shell section">
      <div className="section-copy section-copy--center">
        <span className="section-eyebrow">Data protection</span>
        <h1>Keeping personal information secure and proportionate</h1>
      </div>
      <div className="content-card">
        <p>
          Libra Care Limited is committed to keeping shared information secure
          and processed in line with legislation. Some of the information used
          to tailor services is personal and sensitive, so these principles are
          embedded in our practice.
        </p>
        <ol className="content-list content-list--ordered">
          {dataProtectionPrinciples.map((principle) => (
            <li key={principle.title}>
              <strong>{principle.title}</strong>
              <p>{principle.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
