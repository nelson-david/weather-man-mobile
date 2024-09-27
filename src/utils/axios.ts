import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1";
export const serverAxios = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});
