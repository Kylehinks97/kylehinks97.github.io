import OptimizedImage from "./components/OptimizedImage";
import { teamMembers } from "./siteData";

export default function OurTeam() {
  return (
    <div className="shell section">
      <div className="section-copy section-copy--center">
        <span className="section-eyebrow">Our team</span>
        <h1>Meet the people behind Libra Care</h1>
      </div>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <article key={member.name} className="team-card">
            <OptimizedImage
              src={member.image}
              alt={member.alt}
              className="team-card__image"
            />
            <h2>{member.name}</h2>
            <p className="team-card__role">{member.role}</p>
            {member.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        ))}
      </div>
    </div>
  );
}
