import { useState } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Card from "../../ui/Card";
import { useNavigate } from "react-router-dom";
import PlaceOrder from "../../service/PlaceOrder";
import { useCart } from "../../components/cart/context/CartContext";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cartItems, removeItem } = useCart();

  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    deliveryAddress: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const payload = {
      customerName: formData.customerName,
      phoneNumber: formData.phoneNumber,
      deliveryAddress: formData.deliveryAddress,
      items: cartItems.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      setLoading(true);
      const response = await PlaceOrder(payload);

      const orderId = response.orderId;

      if (!orderId) {
        throw new Error("Order ID missing in response");
      }

      cartItems.forEach((item) => removeItem(item.id));
      navigate(`/order-status/${orderId}`);
    } catch (err) {
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">
          Delivery Details
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Enter where we should deliver your order
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full Name"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
        />

        <Input
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />

        <Input
          label="Delivery Address"
          name="deliveryAddress"
          value={formData.deliveryAddress}
          onChange={handleChange}
          required
        />

        <div className="pt-4 border-t border-gray-200">
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 text-base font-semibold"
          >
            {loading ? "Placing Order..." : "Confirm & Place Order"}
          </Button>

          <p className="mt-3 text-center text-xs text-gray-500">
            By placing this order, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </form>
    </Card>
  );
};

export default CheckoutForm;
