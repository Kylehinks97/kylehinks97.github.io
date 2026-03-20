import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

const Home = lazy(() => import("./Home"));
const Values = lazy(() => import("./Values"));
const DataProtection = lazy(() => import("./DataProtection"));
const Inquiry = lazy(() => import("./Inquiry"));
const Services = lazy(() => import("./Services"));
const OurTeam = lazy(() => import("./OurTeam"));
const ContactUs = lazy(() => import("./ContactUs"));
const Testimonials = lazy(() => import("./Testimonials"));
const PrivacyPolicy = lazy(() => import("./PrivacyPolicy"));
const Blog = lazy(() => import("./Blog"));

function App() {
  return (
    <BrowserRouter>
      <div className="site-shell">
        <SiteHeader />
        <main className="site-main">
          <Suspense
            fallback={
              <div className="shell section">
                <div className="content-card">Loading...</div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/values" element={<Values />} />
              <Route path="/data-protection" element={<DataProtection />} />
              <Route path="/inquiry" element={<Inquiry />} />
              <Route path="/services" element={<Services />} />
              <Route path="/our-team" element={<OurTeam />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
          </Suspense>
        </main>
        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
