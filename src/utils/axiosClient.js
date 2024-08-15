import axios from "axios";

let mainUrl = "https://json-api.uz/api/project/book";

export const axiosClient = axios.create({
  baseURL: mainUrl,
});
