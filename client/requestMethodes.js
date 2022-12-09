import axios from "axios";


export const BASE_URL = "http://10.0.2.2:3003/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
