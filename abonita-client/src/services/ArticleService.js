import axios from "axios";
import constants from "../constants";

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

export const fetchArticles = () => API.get("/");

export const createArticle = (article) => API.post("/", article);

export const updateArticle = (id, article) => API.put(`/${id}`, article);
