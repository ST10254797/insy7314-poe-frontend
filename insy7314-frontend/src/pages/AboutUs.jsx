import NavBar from "../components/NavBar";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <>
      <NavBar />
      <div className="about-container">
        <h1>About Electro Bank</h1>
        <p>Electro Bank is committed to providing secure, fast, and reliable banking solutions. We empower our customers to manage money globally with ease and confidence.</p>
        <p>Our mission is to innovate in financial technology while maintaining trust, security, and transparency for all users.</p>
      </div>
    </>
  );
};

export default AboutUs;
