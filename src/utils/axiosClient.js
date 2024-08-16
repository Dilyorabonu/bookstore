import axios from "axios";

let mainUrl = "https://json-api.uz/api/project/my-books";

export const axiosClient = axios.create({
  baseURL: mainUrl,
});
