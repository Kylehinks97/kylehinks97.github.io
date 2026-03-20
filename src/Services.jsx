import { servicePrinciples, servicesBody, servicesList } from "./siteData";

export default function Services() {
  return (
    <div className="shell section">
      <div className="section-copy section-copy--center">
        <span className="section-eyebrow">Services</span>
        <h1>Home care designed around the individual</h1>
      </div>

      <div className="content-card">
        <p>
          Libra Care offers personal care support to individuals living with
          disability, recovering from illness, or needing practical help to
          remain safely at home.
        </p>
        <ul className="content-list">
          {servicesList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {servicesBody.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <h2>What guides our service</h2>
        <ul className="content-list">
          {servicePrinciples.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
