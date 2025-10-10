import { render, screen, fireEvent } from "@testing-library/react";
import PaymentForm from "./PaymentForm";

test("renders payment form and allows input", () => {
  render(<PaymentForm />);

  // Check for elements
  expect(screen.getByText(/International Payment/i)).toBeInTheDocument();
  const amountInput = screen.getByPlaceholderText(/Amount/i);
  expect(amountInput).toBeInTheDocument();

  // Simulate typing
  fireEvent.change(amountInput, { target: { value: "100" } });
  expect(amountInput.value).toBe("100");

  // Check country select
  const countrySelect = screen.getByRole("combobox");
  fireEvent.change(countrySelect, { target: { value: "USA" } });
  expect(countrySelect.value).toBe("USA");

  // You can add more tests for button click etc.
});
