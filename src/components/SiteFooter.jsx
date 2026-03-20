import { NavLink } from "react-router-dom";
import { brand } from "../siteData";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__band">
        <div>
          <span className="site-footer__label">Office</span>
          <p>{brand.footerAddress.join(", ")}</p>
        </div>
        <div>
          <span className="site-footer__label">Telephone</span>
          <a href={`tel:${brand.phoneHref}`}>{brand.phone}</a>
        </div>
        <div>
          <span className="site-footer__label">Mobile</span>
          <a href={`tel:${brand.mobileHref}`}>{brand.mobile}</a>
        </div>
        <div>
          <span className="site-footer__label">Email</span>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
        </div>
      </div>
      <div className="site-footer__legal">
        <NavLink to="/privacy-policy">Privacy Policy</NavLink>
        <NavLink to="/data-protection">Data Protection</NavLink>
        <NavLink to="/contact-us">Contact Us</NavLink>
      </div>
    </footer>
  );
}
