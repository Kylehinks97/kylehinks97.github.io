import "./styles/HomeImage/HomeImage.css";
import "./styles/HomeImage/hiring-banner.css";
import "./styles/HomeImage/title.css";
import "./styles/HomeImage/inquiry-button.css";
import "./styles/HomeImage/indeed-logo.css";
import "./styles/HomeImage/slogan.css";
import { Link } from "react-router-dom";
import CareerCarousel from "./CareerCarousel";

export default function HomeImage() {
  return (
    <>
      <Link to="/inquiry" style={{textDecoration: "none"}}>
        <div id="hiring-banner-wrapper" style={{ maxWidth: "100%" }}>
          <h6
            style={{
              background: "#C8FFC8",
              padding: "1px",
              display: "flex",
              justifyContent: "center",
              fontSize: "2em",
              margin: 0,
              borderBottom: "3px solid #C8FFC8",
              color: "green",
              letterSpacing: "-0.03em",
              whiteSpace: "nowrap",
              width: "100%",
              cursor: "pointer",
            }}
            id="hiring-banner"
          >
            🚀&nbsp;<span >We are currently hiring carers! Apply Now</span>
            &nbsp;💼
          </h6>
        </div>
      </Link>
      <div style={{ position: "relative", width: "100%" }}>
        <img
          src="/images/Compressed%20Home%20Image.webp"
          width="100%"
          alt="Elderly lady enjoying the company of her female carer"
          id="background-img"
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.16)",
          }}
        >
          <a
            href="https://uk.indeed.com/cmp/Libra-Care-Ltd/reviews"
            target="_blank"
            rel="noreferrer"
          >
            <CareerCarousel />
          </a>
        </div>
        <h1
          style={{
            position: "absolute",
            fontWeight: "900",
            zIndex: 3,
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            top: "30%",
            whiteSpace: "nowrap",
          }}
          id="title"
        >
          Libra Care
        </h1>
        <h6
          style={{
            position: "absolute",
            zIndex: 3,
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            top: "53%",
            whiteSpace: "nowrap",
          }}
          id="slogan"
        >
          &quot;Balancing care with your independence&quot;
        </h6>
        <a href="/inquiry">
          <button
            style={{
              position: "absolute",
              zIndex: 3,
              top: "67%",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              fontWeight: "bold",
              textShadow: "2px 2px 4px black",
              whiteSpace: "nowrap",
              padding: "1.8%",
              borderRadius: "0.5em",
              border: "none",
              background: "#FF6B3D",
              boxShadow: "1px 1px 6px black",
              width: "fit-content",
            }}
            id="inquiry-button"
          >
            Make an Inquiry
          </button>
        </a>
        <a href="https://www.cqc.org.uk/location/1-2564241746" target="_blank">
          <img
            id="CQC-logo"
            src="/images/CQC.png"
            alt="Care Quality Commission - Rated Good"
            style={{
              display: "flex",
              position: "absolute",
              top: "8.3%",
              right: "0.5%",
            }}
          />
        </a>
      </div>
    </>
  );
}