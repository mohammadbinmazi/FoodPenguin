import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import CheckoutForm from "../CheckoutForm";
import PlaceOrder from "../../../service/PlaceOrder";

// --------------------
// mocks
// --------------------
const mockNavigate = vi.fn();
const mockRemoveItem = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../../service/PlaceOrder", () => ({
  default: vi.fn(),
}));

vi.mock("../../cart/context/CartContext", () => ({
  useCart: () => ({
    cartItems: [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
    ],
    removeItem: mockRemoveItem,
  }),
}));

// --------------------
// helpers
// --------------------
const renderCheckoutForm = () =>
  render(
    <MemoryRouter>
      <CheckoutForm />
    </MemoryRouter>,
  );

describe("CheckoutForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders checkout form fields", () => {
    renderCheckoutForm();

    expect(
      screen.getByRole("heading", { name: /delivery details/i }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/delivery address/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /confirm & place order/i }),
    ).toBeInTheDocument();
  });

  test("submits form and navigates to order status page", async () => {
    PlaceOrder.mockResolvedValue({ orderId: "ORD-123" });

    renderCheckoutForm();

    fireEvent.change(screen.getByRole("textbox", { name: /full name/i }), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByRole("textbox", { name: /phone number/i }), {
      target: { value: "9876543210" },
    });

    fireEvent.change(
      screen.getByRole("textbox", { name: /delivery address/i }),
      { target: { value: "221B Baker Street" } },
    );

    fireEvent.click(
      screen.getByRole("button", { name: /confirm & place order/i }),
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/order-status/ORD-123");
    });

    expect(PlaceOrder).toHaveBeenCalledTimes(1);
    expect(mockRemoveItem).toHaveBeenCalled();
  });
});
