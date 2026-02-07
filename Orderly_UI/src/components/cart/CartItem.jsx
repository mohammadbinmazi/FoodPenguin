import Card from "../../ui/Card";
import Button from "../../ui/Button";

const CartItem = ({
  name,
  price,
  quantity = 1,
  onIncrease,
  onDecrease,
  onRemove,
  compact = false,
}) => {
  return (
    <Card className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1 min-w-0">
        <h3 className="truncate text-base font-semibold text-gray-900">
          {name}
        </h3>

        <div className="mt-2 flex items-center gap-4">
          <span className="text-lg font-bold text-gray-900">₹{price}</span>

          {!compact && (
            <span className="text-sm font-medium text-gray-500">
              × {quantity}
            </span>
          )}
        </div>

        {!compact && (
          <p className="mt-1 text-sm text-gray-600">
            Total:{" "}
            <span className="font-semibold text-gray-900">
              ₹{(price * quantity).toFixed(2)}
            </span>
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
        {!compact && (
          <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-2 py-2">
            <button
              onClick={onDecrease}
              disabled={quantity <= 1}
              className="h-8 w-8 rounded-lg bg-white text-gray-700 shadow-sm
                         hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              −
            </button>

            <span className="min-w-[24px] text-center text-sm font-semibold text-gray-900">
              {quantity}
            </span>

            <button
              onClick={onIncrease}
              className="h-8 w-8 rounded-lg bg-white text-gray-700 shadow-sm hover:bg-gray-100"
            >
              +
            </button>
          </div>
        )}

        <Button
          onClick={onRemove}
          className="px-3 py-2 text-sm font-medium bg-transparent text-gray-400 hover:bg-red-50 shadow-none"
        >
          Remove
        </Button>
      </div>
    </Card>
  );
};

export default CartItem;
