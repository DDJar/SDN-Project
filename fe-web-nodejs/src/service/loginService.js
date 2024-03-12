import axios from "./axiosConfig";
export const setAuthToken = ({ token, username }) => {
  window.localStorage.setItem("accessToken", token);
  window.localStorage.setItem("username", username);
};
export const logout = async () => {
  axios.get("/users/logout");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("username");
  delete axios.defaults.headers.common["Authorization"];
  window.location.href = `/`;
};

export const postLogin = async (LoginDTO) => {
  try {
    console.log(LoginDTO);
    const response = await axios.post("/users/login", LoginDTO);

    const { token, username } = response.data;
    setAuthToken({ token, username });
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

    const { token, username } = response.data;
    setAuthToken({ token, username });
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return username;
  } catch (error) {
    console.error("Axios Error:", error);
    console.log("Error Response:", error.response?.data);
    throw error;
  }
};
export const initiateGoogleLogin = () => {
  window.location.href = "http://localhost:5000/auth/google";
};
