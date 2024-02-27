// authUtils.js

import axios from 'axios';

export const logout = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/user/logout");

    if (response.data.success) {
      localStorage.removeItem("user");
      return true;
    } else {
      console.error("Logout failed:", response.data.message);
      return false;
    }
  } catch (error) {
    console.error("Error during logout:", error.message, error.response);

    if (error.response) {
      console.error("Error response:", error.response.data);
    }

    if (error.request) {
      console.error("No response received:", error.request);
    }

    return false;
  }
};
