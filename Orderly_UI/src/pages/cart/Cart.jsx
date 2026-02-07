import CartItem from "../../components/cart/CartItem";
import OrderSummary from "../../components/cart/OrderSummary";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import { useCart } from "../../components/cart/context/CartContext";

const Cart = () => {
  // ✅ Cart comes from context
  const { cartItems, increaseQty, decreaseQty, removeItem } = useCart();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-4 mb-8">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onIncrease={() => increaseQty(item.id)}
                onDecrease={() => decreaseQty(item.id)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </div>

          {/* Summary + Checkout */}
          <div className="grid gap-6 md:grid-cols-2">
            <OrderSummary items={cartItems} />
            <CheckoutForm />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
