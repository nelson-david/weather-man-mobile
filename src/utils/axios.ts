import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";
export const serverAxios = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});
