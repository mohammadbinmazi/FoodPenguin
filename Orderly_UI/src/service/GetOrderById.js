import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const GetOrderById = async (orderId) => {
  const response = await axios.get(`${BASE_URL}/api/orders/${orderId}`);
  return response.data;
};

export default GetOrderById;
