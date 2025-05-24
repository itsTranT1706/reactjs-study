// src/api/orderApi.js
import axios from 'axios';

const API_URL = 'https://6831d7b76205ab0d6c3dd639.mockapi.io/orders';

export const getAllOrders = () => axios.get(API_URL);
export const getOrderById = (id) => axios.get(`${API_URL}/${id}`);
export const createOrder = (data) => axios.post(API_URL, data);
export const updateOrder = (id, data) => axios.put(`${API_URL}/${id}`, data);


// Vì MockAPI không hỗ trợ PATCH, ta dùng PUT để update trạng thái
export const cancelOrder = (id) => updateOrder(id, { status: 'Cancelled' });
export const completeOrder = (id) => updateOrder(id, { status: 'Completed' });
