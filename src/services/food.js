import api from "./api";

export const menuItems = () => api.get('menu-items/');

export const foodItems = () => api.get('food-items/');

export const foodbycategory = (id) => api.get(`category/${id}/`)