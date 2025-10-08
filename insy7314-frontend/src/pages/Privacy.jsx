import NavBar from "../components/NavBar";
import "./Privacy.css";

const Privacy = () => {
  return (
    <>
      <NavBar />
      <div className="privacy-container">
        <h1>Privacy & Policies</h1>
        <p>Your privacy is important to us. We ensure all transactions are encrypted and user data is securely stored.</p>
        <p>We do not share your personal information with third parties without consent, and our security measures meet banking industry standards.</p>
      </div>
    </>
  );
};

export default Privacy;
