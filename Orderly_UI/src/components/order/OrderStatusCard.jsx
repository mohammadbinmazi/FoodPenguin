import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import GetOrderById from "../../service/GetOrderById";

/* ✅ MUST MATCH BACKEND ENUM EXACTLY */
const STATUS_STEP_MAP = {
  ORDER_RECEIVED: 0,
  PREPARING: 1,
  OUT_FOR_DELIVERY: 2,
  DELIVERED: 3,
};

const STATUS_LABEL_MAP = {
  ORDER_RECEIVED: "Order placed",
  PREPARING: "Preparing your order",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
};

const STEPS = ["Order Placed", "Preparing", "Out for Delivery", "Delivered"];

const OrderStatusCard = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔁 Fetch order
  const fetchOrder = async () => {
    try {
      const data = await GetOrderById(orderId);
      setOrder(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch order", err);
      setError("Unable to fetch order status.");
    } finally {
      setLoading(false);
    }
  };

  // ⏱️ Initial fetch + polling every 30s
  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 30000);
    return () => clearInterval(interval);
  }, [orderId]);

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-500">
        Fetching your order status…
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="py-24 text-center text-red-500">
        Failed to load order details.
      </div>
    );
  }

  const currentStep = STATUS_STEP_MAP[order.status] ?? 0;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Status Icon */}
      <div className="mb-8 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50">
          <svg
            className="h-10 w-10 text-orange-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <Card className="rounded-2xl border border-gray-100 bg-white p-8 shadow-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Order Confirmed
          </h1>
          <p className="text-gray-600">{STATUS_LABEL_MAP[order.status]}</p>
        </div>

        {/* Order Info */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500 mb-1">Order ID</p>
            <p className="font-mono text-base font-semibold text-gray-900">
              #{order.orderId}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Order Total</p>
            <p className="text-xl font-bold text-gray-900">
              ₹{order.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Items in your order
          </h3>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.menuItemId}
                className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>

                <p className="font-semibold text-gray-900">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="relative flex items-center justify-between">
            <div className="absolute left-4 right-4 top-5 h-0.5 bg-gray-200" />

            {STEPS.map((step, index) => {
              const isActive = index <= currentStep;

              return (
                <div
                  key={step}
                  className="relative z-10 flex flex-col items-center"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium ${
                      isActive ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-center">
          <Button
            onClick={() => navigate("/")}
            className="py-3 w-full max-w-md text-base font-semibold"
          >
            Browse Menu
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OrderStatusCard;
