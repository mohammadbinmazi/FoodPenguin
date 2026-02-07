import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainMenu from "../MainMenu";

// Helper render
const renderMainMenu = () =>
  render(
    <MemoryRouter>
      <MainMenu />
    </MemoryRouter>,
  );

describe("MainMenu", () => {
  test("renders menu items", () => {
    renderMainMenu();

    expect(screen.getByText("Margherita Pizza")).toBeInTheDocument();
    expect(screen.getByText("Veg Burger")).toBeInTheDocument();
  });

  test("filters items by category", () => {
    renderMainMenu();

    fireEvent.click(screen.getByText("Specials"));

    expect(screen.getByText("Pasta Alfredo")).toBeInTheDocument();
    expect(screen.getByText("Caesar Salad")).toBeInTheDocument();
    expect(screen.queryByText("Margherita Pizza")).not.toBeInTheDocument();
  });

  test("adds item to cart and updates cart UI", () => {
    renderMainMenu();

    const addButtons = screen.getAllByText(/add to cart/i);
    fireEvent.click(addButtons[0]);

    // Floating cart button should appear
    expect(screen.getByText("View Cart")).toBeInTheDocument();

    // Cart count should be visible somewhere (badge / button)
    const cartCounts = screen.getAllByText("1");
    expect(cartCounts.length).toBeGreaterThan(0);
  });

  test("opens cart preview when cart button is clicked", () => {
    renderMainMenu();

    fireEvent.click(screen.getAllByText(/add to cart/i)[0]);
    fireEvent.click(screen.getByText("View Cart"));

    expect(screen.getByText("Your Cart")).toBeInTheDocument();
  });
});
