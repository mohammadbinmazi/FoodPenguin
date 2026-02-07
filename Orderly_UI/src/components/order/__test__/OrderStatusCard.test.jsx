import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import OrderStatusCard from "../OrderStatusCard";
import GetOrderById from "../../../service/GetOrderById";

// mock navigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// mock backend service
vi.mock("../../../service/GetOrderById", () => ({
  default: vi.fn(),
}));

const mockOrder = {
  orderId: "ORD-764829",
  status: "PREPARING",
  totalAmount: 849,
  items: [
    {
      menuItemId: 1,
      name: "Pizza",
      quantity: 2,
      price: 200,
    },
    {
      menuItemId: 2,
      name: "Burger",
      quantity: 1,
      price: 449,
    },
  ],
};

const renderOrderStatus = () =>
  render(
    <MemoryRouter initialEntries={["/orders/ORD-764829"]}>
      <Routes>
        <Route path="/orders/:orderId" element={<OrderStatusCard />} />
      </Routes>
    </MemoryRouter>,
  );

describe("OrderStatusCard", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    GetOrderById.mockResolvedValue(mockOrder);
  });

  test("renders order confirmation details", async () => {
    renderOrderStatus();

    expect(await screen.findByText("Order Confirmed")).toBeInTheDocument();

    expect(screen.getByText("#ORD-764829")).toBeInTheDocument();

    expect(screen.getByText("Preparing your order")).toBeInTheDocument();

    expect(screen.getByText("₹849.00")).toBeInTheDocument();
  });

  test("renders all progress steps", async () => {
    renderOrderStatus();

    expect(await screen.findByText("Order Placed")).toBeInTheDocument();
    expect(screen.getByText("Preparing")).toBeInTheDocument();
    expect(screen.getByText("Out for Delivery")).toBeInTheDocument();
    expect(screen.getByText("Delivered")).toBeInTheDocument();
  });

  test("navigates to menu when Browse Menu is clicked", async () => {
    renderOrderStatus();

    const button = await screen.findByText("Browse Menu");
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
