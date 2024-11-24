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

export const createReview = (reviewContents, rating, restaurantId, token) => {
  const formData = new FormData(); // FormData 객체 생성

  // 데이터 추가
  formData.append('data', new Blob([JSON.stringify({
      reviewContents,
      rating
  })], { type: 'application/json' })); // JSON 객체를 Blob으로 변환하여 추가

  // API 호출 시 Authorization 헤더를 추가합니다.
  return api.post(`/review/${restaurantId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};


export const getAllByRestaurant = (restaurantId, token) => api.get(`/review/${restaurantId}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  }
});

export const postByCart = (menuDtoList, total, restaurantId, token) => {
  const formData = new FormData(); 

  formData.append('data', new Blob([JSON.stringify({
      menuDtoList,
      total,
      restaurantId
  })], { type: 'application/json' })); 


  return api.post('/cart/re', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};

//레스토랑 주문 조회
export const getOrderOwner = (token) => api.get(`/order/owner` , {
  headers: {
      Authorization: `Bearer ${token}`,
    }
}) 

//주문 목록 조회
export const getOrderCustomer = (token) => api.get(`/order/customer` , {
  headers: {
      Authorization: `Bearer ${token}`,
    }
}) 