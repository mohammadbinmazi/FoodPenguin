import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OrderStatusCard from "../OrderStatusCard";
import { vi } from "vitest";

// mock navigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderOrderStatus = () =>
  render(
    <MemoryRouter>
      <OrderStatusCard />
    </MemoryRouter>,
  );

describe("OrderStatusCard", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders order confirmation details", () => {
    renderOrderStatus();

    expect(screen.getByText("Order Confirmed")).toBeInTheDocument();
    expect(screen.getByText("ORD-764829")).toBeInTheDocument();
    expect(screen.getByText("Preparing your order")).toBeInTheDocument();
    expect(screen.getByText("₹849.00")).toBeInTheDocument();
  });

  test("renders all progress steps", () => {
    renderOrderStatus();

    expect(screen.getByText("Order Placed")).toBeInTheDocument();
    expect(screen.getByText("Preparing")).toBeInTheDocument();
    expect(screen.getByText("On the Way")).toBeInTheDocument();
    expect(screen.getByText("Delivered")).toBeInTheDocument();
  });

  test("navigates to menu when Browse Menu is clicked", () => {
    renderOrderStatus();

    fireEvent.click(screen.getByText("Browse Menu"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("navigates to orders page when View Order History is clicked", () => {
    renderOrderStatus();

    fireEvent.click(screen.getByText("View Order History"));
    expect(mockNavigate).toHaveBeenCalledWith("/orders");
  });
});
