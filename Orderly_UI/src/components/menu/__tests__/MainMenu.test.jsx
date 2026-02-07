import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import MainMenu from "../MainMenu";
import GetAllMenus from "../../../service/GetAllMenu";

vi.mock("../../../service/GetAllMenu", () => ({
  default: vi.fn(),
}));

vi.mock("../../cart/context/CartContext", () => ({
  useCart: () => ({
    cartItems: [],
    addToCart: vi.fn(),
  }),
}));

vi.mock("../../menu/MenuList", () => ({
  default: ({ items, onAdd }) => (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => onAdd(item)}>Add to Cart</button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../../cart/CartPreview", () => ({
  default: () => <div>Your Cart</div>,
}));

vi.mock("../../ui/Drawer", () => ({
  default: ({ isOpen, children }) => (isOpen ? <div>{children}</div> : null),
}));

vi.mock("../../layout/Header", () => ({
  default: ({ cartCount, onCartClick }) => (
    <button onClick={onCartClick}>Cart ({cartCount})</button>
  ),
}));

const mockMenus = [
  { id: 1, name: "Margherita Pizza", category: "pizza" },
  { id: 2, name: "Veg Burger", category: "burger" },
  { id: 3, name: "Pasta Alfredo", category: "specials" },
  { id: 4, name: "Caesar Salad", category: "specials" },
];

const renderMainMenu = () =>
  render(
    <MemoryRouter>
      <MainMenu />
    </MemoryRouter>,
  );

describe("MainMenu", () => {
  beforeEach(() => {
    GetAllMenus.mockResolvedValue(mockMenus);
  });

  test("renders menu items", async () => {
    renderMainMenu();

    expect(await screen.findByText("Margherita Pizza")).toBeInTheDocument();

    expect(screen.getByText("Veg Burger")).toBeInTheDocument();
  });

  test("filters items by category", async () => {
    renderMainMenu();

    await screen.findByText("Margherita Pizza");

    fireEvent.click(screen.getByText("Specials"));

    expect(screen.getByText("Pasta Alfredo")).toBeInTheDocument();
    expect(screen.getByText("Caesar Salad")).toBeInTheDocument();
    expect(screen.queryByText("Margherita Pizza")).not.toBeInTheDocument();
  });

  test("adds item to cart and opens cart drawer", async () => {
    renderMainMenu();

    const addButtons = await screen.findAllByText(/add to cart/i);
    fireEvent.click(addButtons[0]);

    expect(screen.getByText("Your Cart")).toBeInTheDocument();
  });

  test("opens cart preview when cart button is clicked", async () => {
    renderMainMenu();

    await screen.findByText("Margherita Pizza");

    fireEvent.click(screen.getByRole("button", { name: /^cart/i }));

    expect(screen.getByText("Your Cart")).toBeInTheDocument();
  });
});
