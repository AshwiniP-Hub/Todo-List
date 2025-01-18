import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5000/todos",
  baseURL: "https://todo-list-mfz7.onrender.com/todos",
});

export default instance;
