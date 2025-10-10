import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PaymentForm.css";

const countryData = {
  USA: { currency: "USD", swift: "CHASUS33XXX" },
  UK: { currency: "GBP", swift: "BARCGB22XXX" },
  Germany: { currency: "EUR", swift: "DEUTDEFFXXX" },
  France: { currency: "EUR", swift: "BNPAFRPPXXX" },
  Canada: { currency: "CAD", swift: "ROYCCAT2XXX" },
  Australia: { currency: "AUD", swift: "NATAAU33XXX" },
  Japan: { currency: "JPY", swift: "BOTKJPJTXXX" },
  China: { currency: "CNY", swift: "ICBKCNBJBJM" },
  India: { currency: "INR", swift: "HDFCINBBXXX" },
  Switzerland: { currency: "CHF", swift: "UBSWCHZH80A" },
  Singapore: { currency: "SGD", swift: "DBSSSGSGXXX" },
  UAE: { currency: "AED", swift: "EBILAEADXXX" },
  Brazil: { currency: "BRL", swift: "ITAUBRSPXXX" },
  Mexico: { currency: "MXN", swift: "CITIUS33XXX" },
  SouthAfrica: { currency: "ZAR", swift: "SBZAZAJJXXX" },
  NewZealand: { currency: "NZD", swift: "ANZBNZ22XXX" },
};

const PaymentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: "",
    country: "",
    currency: "",
    provider: "SWIFT",
    recipientAccount: "",
    swiftCode: ""
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [showToast, setShowToast] = useState(false);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData({
      ...formData,
      country: selectedCountry,
      currency: countryData[selectedCountry]?.currency || "",
      swiftCode: countryData[selectedCountry]?.swift || ""
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessageType("error");
      setMessage("❌ You must be logged in to make a payment");
      setShowToast(true);
      return;
    }

    const payload = {
      amount: Number(formData.amount).toFixed(2),
      currency: formData.currency.toUpperCase(),
      provider: formData.provider,
      recipientAccount: formData.recipientAccount,
      swiftCode: formData.swiftCode.toUpperCase()
    };

    try {
      const res = await axios.post(
        "https://localhost:4000/api/payments",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessageType("success");
      setMessage(`✅ Success! Transaction ID: ${res.data.transaction._id}`);
      setShowToast(true);

      setFormData({
        amount: "",
        country: "",
        currency: "",
        provider: "SWIFT",
        recipientAccount: "",
        swiftCode: ""
      });
    } catch (err) {
      setMessageType("error");
      setMessage(`❌ Error: ${err.response?.data?.message || err.message}`);
      setShowToast(true);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="payment-container">
      {/* Floating Back Button */}
      <button
        className="floating-back-button"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>

      <div className="card">
        <h2>💳 International Payment</h2>
        <form onSubmit={handleSubmit} className="payment-form">
          <label>Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            required
          >
            <option value="">Select Country</option>
            {Object.keys(countryData).map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

          <label>Amount</label>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <label>Currency</label>
          <input type="text" name="currency" value={formData.currency} readOnly />

          <label>Recipient Account</label>
          <input
            type="text"
            name="recipientAccount"
            placeholder="Recipient Account Number"
            value={formData.recipientAccount}
            onChange={handleChange}
            required
          />

          <label>SWIFT Code</label>
          <input type="text" name="swiftCode" value={formData.swiftCode} readOnly />

          <button type="submit">Pay Now</button>
        </form>
      </div>

      {/* Toast message */}
      {showToast && (
        <div className={`toast ${messageType}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
