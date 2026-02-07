import Card from "../../ui/Card";
import Button from "../../ui/Button";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const FoodItem = ({ item, onAdd }) => {
  const imageSrc = item.imageUrl
    ? `${API_BASE_URL}${item.imageUrl}`
    : "/placeholder-food.png"; // optional fallback

  return (
    <Card className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageSrc}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Price badge */}
        <div className="absolute top-4 right-4 rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-gray-900 shadow">
          ₹{item.price}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col p-5">
        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {item.description}
        </p>

        <Button
          onClick={() => onAdd(item)}
          className="mt-5 w-full rounded-xl py-3 text-sm font-semibold"
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default FoodItem;
