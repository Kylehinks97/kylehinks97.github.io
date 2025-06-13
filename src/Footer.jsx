
import "./styles/Footer.css";

export default function Footer() {

function openEmailWindow() {
  return window.open("mailto:libracare@outlook.com")
}

  return (
    <>
      <div style={{ backgroundColor: "#FF6B3D", margin: 0, width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(300px, 1fr)",
            gap: "10px",
            padding: "5%",
            color: "white",
            textShadow: "2px 2px 4px black",
          }}
        >
          <h3 style={{ margin: 0 }} className="footer-text">
            Office 9, Euro House
            <br />
            Birch Lane Business Park
            <br />
            Birch Lane
            <br />
            WS9 0NF
          </h3>
          <h3 style={{ margin: 0 }}  className="footer-text">
            <a
              href="tel:01922234453"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              01922 234 453
            </a>
          </h3>
          <h3 style={{ margin: 0 }}  className="footer-text">
            <a
              href="tel:07974733121"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              07974 733 121
            </a>
          </h3>
          <h3
            style={{ margin: 0, cursor: "pointer" }}
            className="footer-text"
            id="email-link"
            onClick={openEmailWindow}
          >
            libracare@outlook.com
          </h3>
        </div>
      </div>
    </>
  );
}