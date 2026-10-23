import api from "./api";

export const login = (email, password) => api.post('login/', {email, password});

export const register = (name, email, password) => api.post('register/', {name, email, password});