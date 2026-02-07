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
  test("renders subtotal, tax and total correctly (delivery charged)", () => {
    render(<OrderSummary items={mockItemsLowTotal} />);

    // Subtotal = 350
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("₹350.00")).toBeInTheDocument();

    // Delivery should be charged
    expect(screen.getByText("Delivery")).toBeInTheDocument();
    expect(screen.getByText("₹49.00")).toBeInTheDocument();

    // Tax (5%)
    expect(screen.getByText("Tax (5%)")).toBeInTheDocument();
    expect(screen.getByText("₹17.50")).toBeInTheDocument();

    expect(screen.getByText("₹416.50")).toBeInTheDocument();
  });

  test("shows FREE delivery when subtotal is above 500", () => {
    render(<OrderSummary items={mockItemsHighTotal} />);

    expect(screen.getByText("₹550.00")).toBeInTheDocument();

    expect(screen.getByText("FREE")).toBeInTheDocument();
    expect(screen.getByText(/you saved ₹49/i)).toBeInTheDocument();

    expect(screen.getByText("₹27.50")).toBeInTheDocument();

    expect(screen.getByText("₹577.50")).toBeInTheDocument();
  });
});
