import axios from "axios";

let mainURL = "https://json-api.uz/api/project/my-books";

export const axiosClient = axios.create({
  baseURL: mainURL,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh_token = window.localStorage.getItem("refresh_token");

      try {
        const { data } = await axios.post(`${mainURL}/auth/refresh-token`, {
          refresh_token,
        });

        window.localStorage.setItem("token", data.access_token);
        // Retry the original request with the new token
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${data.access_token}`;
        return axiosClient(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
