import OptimizedImage from "./OptimizedImage";
import { partnerLogos } from "../siteData";

export default function LogoGrid() {
  return (
    <div className="logo-grid">
      {partnerLogos.map((logo) => (
        <a
          key={logo.name}
          href={logo.href}
          target="_blank"
          rel="noreferrer"
          className="logo-grid__item"
          aria-label={logo.name}
        >
          <OptimizedImage src={logo.src} alt={logo.alt} className="logo-grid__image" />
        </a>
      ))}
    </div>
  );
}
