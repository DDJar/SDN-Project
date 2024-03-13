import axios from "./axiosConfig";
import Cookies from "js-cookie";
export const setAuthToken = ({ token,info, username }) => {
  Cookies.set("token", token)
  Cookies.set("username", JSON.stringify(username))
  Cookies.set("info", JSON.stringify(info))
};
export const logout = async () => {
  axios.get("/users/logout");
  Cookies.remove("token")
  Cookies.remove("username")
  Cookies.remove("info")
  delete axios.defaults.headers.common["Authorization"];
  window.location.href = `/`;
};

export const postLogin = async (LoginDTO) => {
  try {
    console.log(LoginDTO);
    const response = await axios.post("/users/login", LoginDTO);

    const { token,info ,username } = response.data;
    setAuthToken({ token,info, username });
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return username;
  } catch (error) {
    console.error("Axios Error:", error);
    throw error;
  }
};

export const postRegist = async (RegistDTO) => {
  try {
    const response = await axios.post("/users/signup", RegistDTO);
    console.log("Response:", response.data);

    const { token,info ,username } = response.data;
    setAuthToken({ token,info, username });
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  } catch (error) {
    console.error("Axios Error:", error);
    console.log("Error Response:", error.response?.data);
    throw error;
  }
};
export const initiateGoogleLogin = () => {
  window.location.href = "http://localhost:5000/auth/google";
};
export const initiateFacebookLogin = () => {
  window.location.href = "http://localhost:5000/auth/facebook";
};
