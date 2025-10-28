import axios from "axios";
const baseURL = "http://localhost:4000/todos";
export const api = axios.create({
  baseURL: baseURL,
});
