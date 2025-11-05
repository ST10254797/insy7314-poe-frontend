import NavBar from "../components/NavBar";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <>
      <NavBar />
      <div className="about-container">
        <h1>About Electro Bank</h1>
        <p>
          Electro Bank is committed to providing secure, fast, and reliable banking solutions. 
          We empower our customers to manage money globally with ease and confidence.
        </p>
        <p>
          Our mission is to innovate in financial technology while maintaining trust, security, 
          and transparency for all users.
        </p>

        {/* Vision Section */}
        <h2>Our Vision</h2>
        <p>
          To be the leading digital-first bank that transforms the way people interact with money, 
          delivering innovative financial solutions accessible to everyone.
        </p>

        {/* Core Values Section */}
        <h2>Core Values</h2>
        <ul className="core-values">
          <li><strong>Security:</strong> Protecting our customers’ data and finances above all.</li>
          <li><strong>Innovation:</strong> Continuously improving our products and services.</li>
          <li><strong>Transparency:</strong> Clear, honest, and trustworthy operations.</li>
          <li><strong>Customer-Centric:</strong> Putting our customers’ needs first in everything we do.</li>
        </ul>

        {/* Features Section */}
        <h2>Why Choose Electro Bank?</h2>
        <div className="about-features">
          <div className="feature">
            <h3>Fast Transactions</h3>
            <p>Send and receive money instantly, with minimal fees and maximum reliability.</p>
          </div>
          <div className="feature">
            <h3>24/7 Support</h3>
            <p>Our dedicated support team is available around the clock for any assistance.</p>
          </div>
          <div className="feature">
            <h3>Secure Banking</h3>
            <p>Advanced encryption and authentication methods ensure your accounts are safe.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
