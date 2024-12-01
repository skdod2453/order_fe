import axios from "axios";

const api = axios.create({
    baseURL: `http://43.202.86.72:8080`,
});

export default api;