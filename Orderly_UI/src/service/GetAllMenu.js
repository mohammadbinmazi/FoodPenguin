import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const GetAllMenus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/menu`);
    return response.data;
  } catch (error) {
    console.error("Error fetching menus:", error);
    throw error;
  }
};

export default GetAllMenus;
