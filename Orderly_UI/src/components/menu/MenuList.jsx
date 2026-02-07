import FoodItem from "./FoodItem";

const MenuList = ({ items = [], onAdd }) => {
  if (!Array.isArray(items)) {
    console.error("MenuList expected array but got:", items);
    return null;
  }

  if (items.length === 0) {
    return (
      <p className="col-span-full text-center text-gray-500">No items found.</p>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <FoodItem key={item.id ?? item._id} item={item} onAdd={onAdd} />
      ))}
    </div>
  );
};

export default MenuList;
