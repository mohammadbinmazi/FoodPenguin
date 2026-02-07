import Card from "../../ui/Card";

const OrderSummary = ({ items }) => {
  // ✅ FIX: quantity-aware subtotal
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryFee = subtotal > 500 ? 0 : 49;

  const total = subtotal + deliveryFee;

  return (
    <Card className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
      {/* Header */}
      <div className="mb-5 border-b border-gray-100 pb-4">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">
          Order Summary
        </h3>
        <p className="mt-1 text-sm text-gray-500">Price details & charges</p>
      </div>

      {/* Breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-gray-900">
            ₹{subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Delivery</span>
          <span
            className={`font-medium ${
              deliveryFee === 0 ? "text-orange-600" : "text-gray-700"
            }`}
          >
            {deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-gray-200" />

      {/* Total */}
      <div className="flex items-start justify-between">
        <span className="text-base font-semibold text-gray-900">
          Total Amount
        </span>

        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">
            ₹{total.toFixed(2)}
          </p>
          <p className="mt-0.5 text-xs text-gray-500">
            Inclusive of all charges
          </p>
        </div>
      </div>

      {/* Savings */}
      {deliveryFee === 0 && (
        <div className="mt-5 rounded-xl bg-orange-50 px-4 py-3 text-sm font-medium text-orange-700">
          🎉 You saved ₹49 on delivery
        </div>
      )}
    </Card>
  );
};

export default OrderSummary;
