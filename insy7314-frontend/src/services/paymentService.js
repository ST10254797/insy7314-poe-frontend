import api from "./api";

export const createPayment = async (paymentData) => {
  return api.post("/payments", paymentData);
};

export const getPayments = async () => {
  return api.get("/payments"); // later if you implement GET endpoint
};
