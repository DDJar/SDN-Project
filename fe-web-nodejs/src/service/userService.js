import axios from "./axiosConfig";

const User_Service_BASE_REST_API_URL = "/users/";

class UserService {
  getUserData(username) {
    return axios.get(User_Service_BASE_REST_API_URL + "profile",username);
  }
  updateUserData(userData) {
    return axios.put(User_Service_BASE_REST_API_URL + "profile", userData);
  }
}

//notthing

export default new UserService();