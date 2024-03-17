import axios from "./axiosConfig";

const ClassList_Service_BASE_REST_API_URL = "/class/";


class ClassListService {
  getAllClassList() {
    return axios.get(ClassList_Service_BASE_REST_API_URL)
  }
  createClass(Class) {
    return axios.post(ClassList_Service_BASE_REST_API_URL,Class)
  }

}

export default new ClassListService();