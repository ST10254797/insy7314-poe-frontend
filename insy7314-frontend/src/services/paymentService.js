import api from "./api";

export const createPayment = async (paymentData) => {
  // auto-format to match backend validation
  const payload = {
    amount: parseFloat(paymentData.amount).toFixed(2), // 2 decimals
    currency: paymentData.currency.toUpperCase(),      // uppercase
    provider: paymentData.provider,
    recipientAccount: paymentData.recipientAccount,
    swiftCode: paymentData.swiftCode.toUpperCase(),    // uppercase
  };

  return api.post("/payments", payload);
};


export const getPayments = async () => {
  return api.get("/payments"); // later if you implement GET endpoint
};
