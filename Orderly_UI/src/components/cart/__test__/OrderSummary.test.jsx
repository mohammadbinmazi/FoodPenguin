import { render, screen } from "@testing-library/react";
import OrderSummary from "../OrderSummary";

const mockItemsLowTotal = [
  { id: 1, name: "Burger", price: 200 },
  { id: 2, name: "Fries", price: 150 },
];

const mockItemsHighTotal = [
  { id: 1, name: "Pizza", price: 300 },
  { id: 2, name: "Pasta", price: 250 },
];

describe("OrderSummary", () => {
  test("renders subtotal and delivery charge when subtotal is below 500", () => {
    render(<OrderSummary items={mockItemsLowTotal} />);

    // Subtotal = 350
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("₹350.00")).toBeInTheDocument();

    // Delivery charged
    expect(screen.getByText("Delivery")).toBeInTheDocument();
    expect(screen.getByText("₹49.00")).toBeInTheDocument();

    // Total = 350 + 49 = 399
    expect(screen.getByText("₹399.00")).toBeInTheDocument();
  });

  test("shows FREE delivery and savings when subtotal is above 500", () => {
    render(<OrderSummary items={mockItemsHighTotal} />);

    // Subtotal = 550 (appears twice: subtotal + total)
    expect(screen.getAllByText("₹550.00").length).toBeGreaterThan(0);

    // FREE delivery
    expect(screen.getByText("FREE")).toBeInTheDocument();

    // Savings message
    expect(screen.getByText(/you saved ₹49/i)).toBeInTheDocument();
  });
});
