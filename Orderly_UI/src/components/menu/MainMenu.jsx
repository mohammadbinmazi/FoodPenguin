import { useEffect, useMemo, useState } from "react";
import MenuList from "../../components/menu/MenuList";
import Drawer from "../../ui/Drawer";
import CartPreview from "../../components/cart/CartPreview";
import Header from "../../components/layout/Header";
import GetAllMenus from "../../service/GetAllMenu";
import { useCart } from "../../components/cart/context/CartContext";

const MainMenu = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true);
        const data = await GetAllMenus();
        const items = data?.data || data;
        setMenus(items);
      } catch (err) {
        setError("Failed to load menu. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  // ✅ Categories derived from backend
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(menus.map((item) => item.category).filter(Boolean)),
    );

    return [
      { key: "all", label: "All" },
      ...uniqueCategories.map((cat) => ({
        key: cat,
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
      })),
    ];
  }, [menus]);

  const handleAddToCart = (item) => {
    addToCart(item);
    setIsCartOpen(true);
  };

  const filteredItems =
    activeCategory === "all"
      ? menus
      : menus.filter((item) => item.category === activeCategory);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-bold text-gray-900">
            Our Delicious Menu
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Handcrafted with the finest ingredients
          </p>
        </div>

        {/* ✅ Category Filter (Backend Driven) */}
        <div className="mb-12 flex justify-center">
          <div className="flex gap-1 rounded-full bg-gray-100 p-1 shadow-inner">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;

              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`
                    rounded-full px-6 py-2.5 text-sm font-semibold
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                        : "text-gray-600 hover:text-gray-900"
                    }
                  `}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {loading && (
          <p className="text-center text-gray-500">Loading menu...</p>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <MenuList items={filteredItems} onAdd={handleAddToCart} />
        )}
      </div>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-gradient-to-r from-gray-900 to-black px-6 py-4 text-white shadow-xl transition hover:scale-105"
        >
          <span className="text-lg font-semibold">View Cart</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
            {cartCount}
          </span>
        </button>
      )}

      <Drawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}>
        <CartPreview onClose={() => setIsCartOpen(false)} />
      </Drawer>
    </>
  );
};

export default MainMenu;
