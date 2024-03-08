import axios from "./axiosConfig";
export const setAuthToken = ({ token, username }) => {
    window.localStorage.setItem('accessToken', token);
    window.localStorage.setItem('username', username);
};
export const logout = async () => {
    axios.get("/users/logout");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    delete axios.defaults.headers.common['Authorization'];
    window.location.href = `/`;
};

export const postLogin = async (LoginDTO) => {
    try {
        const response = await axios.post("/users/login", LoginDTO);
        const { token, username } = response.data;
        setAuthToken({ token, username });
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log(response.data);
        return username;
    } catch (error) {
        console.error("Axios Error:", error);
        throw error; 
    }
};