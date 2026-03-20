import { valueStatements } from "./siteData";

export default function Values() {
  return (
    <div className="shell section">
      <div className="section-copy section-copy--center">
        <span className="section-eyebrow">Our values</span>
        <h1>The principles that shape our care</h1>
      </div>
      <div className="content-card">
        <ul className="content-list">
          {valueStatements.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
