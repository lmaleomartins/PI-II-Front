import axios from "axios";

// Setup Axios instance
const api = axios.create({
	baseURL: "http://127.0.0.1:8000",
});

// Request interceptor to add the access token to headers
api.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem("accessToken");
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = localStorage.getItem("refreshToken");
				const response = await axios.post(
					"http://127.0.0.1:8000/api/token/refresh/",
					{
						refresh: refreshToken,
					}
				);

				const newAccessToken = response.data.access;

				// Update tokens in local storage
				localStorage.setItem("accessToken", newAccessToken);

				// Update authorization header for the original request
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

				// Retry the original request with the new access token
				return api(originalRequest);
			} catch (refreshError) {
				// Refresh token failed, log out the user
				localStorage.removeItem("access_token");
				localStorage.removeItem("refresh_token");
				//window.location.href = "/login"; // Redirect to login page
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export default api;
