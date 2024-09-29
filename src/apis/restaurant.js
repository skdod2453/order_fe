import api from './api';

export const getAll = () => api.get(`/restaurant`)

export const getId = (restaurantId) => api.get(`/restaurant/${restaurantId}`)

export const getName = (restaurantName) => api.get(`/restaurant`, {
    params: {
      name: restaurantName
    }
  });

export const getCategory = (restaurantCategory) => api.get(`/restaurant`, {
    params: {
      category: restaurantCategory
    }
  });

export const getAllAddress = () => api.get(`/address`)