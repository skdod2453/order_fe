import api from './api';

export const login = (id, password) => api.post('/login', {
  params: {
    username: id,
    password: password
  }
});

export const join = (id, password, name, phone, email, type) => {
  const formData = new FormData(); // FormData 객체 생성

  // 데이터 추가
  formData.append('data', new Blob([JSON.stringify({
      userId: id,
      userPassword: password,
      userName: name,
      userPhone: phone,
      userEmail: email,
      userType: type
  })], { type: 'application/json' })); // JSON 객체를 Blob으로 변환하여 추가

  return api.post('/join', formData); // Content-Type 설정 없음
};
