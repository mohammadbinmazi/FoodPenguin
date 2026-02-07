import { ShoppingBag } from "lucide-react";

const Header = ({ cartCount, onCartClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center ">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl  ">
            <img
              src="/logo2.png"
              alt="Food Penguin logo"
              className="h-12 w-12 object-contain"
            />
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            FoodPenguin
          </span>
        </div>

        {/* Cart Button */}
        <button
          onClick={onCartClick}
          className="relative flex items-center justify-center rounded-full p-3 transition-all duration-300 hover:bg-gray-100"
        >
          <ShoppingBag className="h-6 w-6 text-gray-900" />

          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-xs font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
