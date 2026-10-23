import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});


// Auto-add JWT token to EVERY request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auto-refresh token on 401 response
api.interceptors.response.use((response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            const refresh = localStorage.getItem('refresh_token');
            if (refresh) {
                try {
                    const { data } = await axios.post('http://127.0.0.1:8000/api/refresh/', {refresh});
                    localStorage.setItem('token', data.access);

                    // Retry original request
                    error.config.headers.Authorization = `Bearer ${data.access}`;
                    return api(error.config);
                } catch (refreshError) {
                    localStorage.removeItem('token');
                }
            }
        }

        return Promise.reject(error);
    });

    export default api;