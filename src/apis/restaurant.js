import api from './api';

export const getAll = () => api.get(`/restaurant`)

export const getId = (restaurantId, token) => api.get(`/restaurant/${restaurantId}`,{
  headers: {
    Authorization: `Bearer ${token}`,
  }
})

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