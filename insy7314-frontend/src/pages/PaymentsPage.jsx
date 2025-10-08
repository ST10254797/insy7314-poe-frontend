import React from "react";
import PaymentForm from "../components/PaymentForm.jsx"; // move your form to components folder

function PaymentsPage() {
  return (
    <div>
      <h1>Payments</h1>
      <PaymentForm />
    </div>
  );
}

export default PaymentsPage;