import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CheckoutForm from "../CheckoutForm";
import { vi } from "vitest";

// mock useNavigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderCheckoutForm = () =>
  render(
    <MemoryRouter>
      <CheckoutForm />
    </MemoryRouter>,
  );

describe("CheckoutForm", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders checkout form fields", () => {
    renderCheckoutForm();

    expect(screen.getByText("Delivery Details")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter your full name"),
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("10-digit mobile number"),
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Email for order updates"),
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("House no, building, street, area"),
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText("City")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("6-digit PIN code")).toBeInTheDocument();
  });

  test("submits form and navigates to order status page", () => {
    renderCheckoutForm();

    fireEvent.change(screen.getByPlaceholderText("Enter your full name"), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByPlaceholderText("10-digit mobile number"), {
      target: { value: "9876543210" },
    });

    fireEvent.change(screen.getByPlaceholderText("Email for order updates"), {
      target: { value: "john@test.com" },
    });

    fireEvent.change(
      screen.getByPlaceholderText("House no, building, street, area"),
      { target: { value: "221B Baker Street" } },
    );

    fireEvent.change(screen.getByPlaceholderText("City"), {
      target: { value: "Delhi" },
    });

    fireEvent.change(screen.getByPlaceholderText("6-digit PIN code"), {
      target: { value: "110001" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /confirm & place order/i }),
    );

    expect(mockNavigate).toHaveBeenCalledWith("/order-status");
  });
});
