import { Routes, Route } from "react-router-dom";

import Menu from "../pages/menu/Menu";
import Cart from "../pages/cart/Cart";
import OrderStatus from "../pages/orderStatus/OrderStatus";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order-status/:orderId" element={<OrderStatus />} />
    </Routes>
  );
}
