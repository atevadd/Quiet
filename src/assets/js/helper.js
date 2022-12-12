import axios from "axios";

export const verifyUser = async (username) => {
  try {
    const response = await axios.get(`/${username}`);

    if (response.data.status === "false") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
