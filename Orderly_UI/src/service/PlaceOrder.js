import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PlaceOrder = async (orderData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/orders`, orderData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

export default PlaceOrder;
