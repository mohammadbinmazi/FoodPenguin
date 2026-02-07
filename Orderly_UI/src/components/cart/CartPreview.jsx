import Button from "../../ui/Button";
import CartItem from "./CartItem";
import Card from "../../ui/Card";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../components/cart/context/CartContext";

const CartPreview = ({ onClose }) => {
  const navigate = useNavigate();

  // ✅ Cart from context
  const { cartItems, increaseQty, decreaseQty, removeItem } = useCart();

  // ✅ Correct calculations (quantity aware)
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  // ✅ Total items count
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    navigate("/cart");
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Your Cart
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {totalItems} {totalItems === 1 ? "item" : "items"} added
          </p>
        </div>
        <button
          onClick={onClose}
          className="h-10 w-10 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 flex items-center justify-center transition-all duration-200"
        >
          ✕
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500">
              Add delicious items from our menu to get started
            </p>
          </div>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onIncrease={() => increaseQty(item.id)}
              onDecrease={() => decreaseQty(item.id)}
              onRemove={() => removeItem(item.id)}
            />
          ))
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="border-t border-gray-100 bg-gradient-to-b from-white to-gray-50/50 px-6 py-6">
          {/* Summary */}
          <Card className="mb-6 p-5 border-gray-200 bg-white/80">
            <div className="space-y-3">
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery Fee</span>
                <span className="text-gray-700">₹{deliveryFee.toFixed(2)}</span>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Button
            className="w-full py-3.5 text-base font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPreview;
