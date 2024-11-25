import api from './api';

//채팅 가져오기
export const getChat = (chatId, token) => api.get(`/chat/${chatId}`, {
  headers: {
    Authorization: `Bearer ${token}`, 
  },
});

//채팅 시작
  export const startChat = (restaurantId, token) => api.post(`/chat/start/${restaurantId}`, 
    {}, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
//채팅 보내기
  export const sendChat = (chatId, content, token) => {
    return api.post(`/chat/${chatId}`, 
      { content }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };
