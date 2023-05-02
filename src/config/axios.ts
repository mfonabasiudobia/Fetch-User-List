import axios from "axios";

const BASE_URL = "https://randomuser.me/api";


export default axios.create({
	baseURL: BASE_URL
});