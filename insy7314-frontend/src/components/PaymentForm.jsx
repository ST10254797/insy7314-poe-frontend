import React, { useState } from "react";
import axios from "axios";
import "./PaymentForm.css";

// Full country, currency, SWIFT mapping
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
  const [formData, setFormData] = useState({
    amount: "",
    country: "",
    currency: "",
    provider: "SWIFT",
    recipientAccount: "",
    swiftCode: ""
  });

  const [message, setMessage] = useState("");

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
      setMessage("❌ You must be logged in to make a payment");
      return;
    }

    // Prepare payload
    const payload = {
      amount: Number(formData.amount).toFixed(2), // convert to string with 2 decimals
      currency: formData.currency.toUpperCase(),
      provider: formData.provider,
      recipientAccount: formData.recipientAccount,
      swiftCode: formData.swiftCode.toUpperCase()
    };

    console.log("Submitting payment payload:", payload);

    try {
      const res = await axios.post(
        "https://localhost:4000/api/payments",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Payment response:", res.data);
      setMessage(`✅ Success! Transaction ID: ${res.data.transaction._id}`);

      // Clear form
      setFormData({
        amount: "",
        country: "",
        currency: "",
        provider: "SWIFT",
        recipientAccount: "",
        swiftCode: ""
      });
    } catch (err) {
      console.error("Payment error:", err.response?.data || err.message);
      setMessage(`❌ Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="payment-container">
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
          <input
            type="text"
            name="currency"
            value={formData.currency}
            readOnly
          />

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
          <input
            type="text"
            name="swiftCode"
            value={formData.swiftCode}
            readOnly
          />

          <button type="submit">Pay Now</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default PaymentForm;
