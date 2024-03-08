import axios from "./axiosConfig";
// const getAuthToken = () => {
//   return window.localStorage.getItem('accessToken');
// };

// // axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;

const ClassList_Service_BASE_REST_API_URL = "/class/";


class ClassListService {
  getAllClassList() {
    return axios.get(ClassList_Service_BASE_REST_API_URL)
}
//   createApartment(apartment) {
//     return axios.post(ClassList_Service_BASE_REST_API_URL, apartment)
//   }
//   getApartmentByID(apartment_id) {
//     return axios.get(ClassList_Service_BASE_REST_API_URL + "/" + apartment_id);
//   }
//   updateApartmentByID(apartment_id, apartment) {
//     return axios.put(ClassList_Service_BASE_REST_API_URL + "/" + apartment_id, apartment);
//   }
}

export default new ClassListService();