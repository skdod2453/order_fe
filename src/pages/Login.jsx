import React, { useState } from 'react';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';
import { login, join } from '../apis/user';
import Swal from 'sweetalert2';
import { useCookies } from 'react-cookie';

export default function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState("Owner");
  const [isSignup, setIsSignup] = useState(false);
  const [cookies, setCookie] = useCookies(['Authorization']);


  const toggleSwitch = () => {
    setIsSignup(!isSignup);
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!id || !password) {
      Swal.fire({
        icon: 'error',
        title: '모든 필드를 입력해주세요!',
        text: '아이디와 비밀번호를 입력해야 합니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#FF7D29',
        background: '#white',
        color: '#754F23',
        iconColor: '#FFBF78'
      });
      return;
    }

    try {
      const response = await login(id, password);

      // Authorization 헤더에서 토큰 가져오기
      const authHeader = response.headers['Authorization'] || response.headers['authorization'];
      if (authHeader && authHeader.startsWith('Bearer ')) {
        // 'Bearer ' 제거 후 토큰만 추출
        const token = authHeader.split(' ')[1];
        // 쿠키에 저장
        setCookie('Authorization', token, {
          path: '/',
          secure: false, // 실제 환경에서는 true로 설정
          httpOnly: false,
        });
      }
      
      const authHeaderId = response.headers['id'] || response.headers['Id'];
      if (authHeaderId) {
        // 쿠키에 저장
        setCookie('Id', authHeaderId, {
          path: '/',
          secure: false, // 실제 환경에서는 true로 설정
          httpOnly: false,
        });
      }

      
      Swal.fire({
        icon: 'success',
        title: '로그인 성공!',
        confirmButtonText: '확인',
        confirmButtonColor: '#FF7D29',
        background: '#white',
        color: '#754F23',
        iconColor: '#B6FFA1'
      }).then(() => {
        setId('');
        setPassword('');
        navigate("/introduce");
      });
    } catch (error) {
      console.error("로그인 실패:", error);
      Swal.fire({
        icon: 'error',
        title: '로그인 실패!',
        text: '아이디 또는 비밀번호가 잘못되었습니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#FF7D29',
        background: '#white',
        color: '#754F23',
        iconColor: '#FFBF78'
      });
    }
  };

  const joinHandler = async (e) => {
    e.preventDefault();

    // 필드 유효성 검사
    if (!id || !password || !passwordCheck || !name || !phone || !email) {
      Swal.fire({
        icon: 'error',
        title: '모든 필드를 입력해주세요!',
        text: '모든 항목을 입력해야 합니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#FF7D29',
        background: '#white',
        color: '#754F23',
        iconColor: '#FFBF78'
      });
      return;
    }

    if (password !== passwordCheck) {
      Swal.fire({
        icon: 'error',
        title: '비밀번호 불일치!',
        text: '비밀번호와 확인 비밀번호가 일치하지 않습니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#FF7D29',
        background: '#white',
        color: '#754F23',
        iconColor: '#FFBF78'
      });
      return;
    }

    try {
      const response = await join(id, password, name, phone, email, type);
      Swal.fire({
        icon: 'success',
        title: '회원가입 성공!',
        confirmButtonText: '확인',
        confirmButtonColor: '#FF7D29',
        background: '#white',
        color: '#754F23',
        iconColor: '#B6FFA1'
      }).then(() => {
        setId('');
        setPassword('');
        setPasswordCheck('');
        setName('');
        setPhone('');
        setEmail('');
        setIsSignup(false);
        navigate("/login");
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '회원가입 실패!',
        text: '다시 시도해주세요.',
        confirmButtonText: '확인',
        confirmButtonColor: '#FF7D29',
        background: '#white',
        color: '#754F23',
        iconColor: '#FFBF78'
      });
    }
  };

  return (
    <div className="login_container">
      <div className="section">
        <h3 className="switch_text">
          <span>LOGIN</span>
          <span>JOIN</span>
        </h3>
        <input className="checkbox" type="checkbox" id="reg-log" checked={isSignup} onChange={toggleSwitch} />
        <label htmlFor="reg-log"></label>
        <div className="card-wrap">
          <div className={`card-wrapper ${isSignup ? 'rotate' : ''}`}>
            {/* 로그인 카드 */}
            <div className="card-login">
              <div className="center-wrap">
                <h2 className="log_text">LOGIN</h2>
                <input type="text" name="logId" className="form-style" placeholder="ID" autoComplete="off" value={id} onChange={(e) => setId(e.target.value)} />
                <input type="password" name="logPassword" className="form-style" placeholder="Password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn_sub" onClick={loginHandler}>LOGIN</button>
              </div>
            </div>

            {/* 회원가입 카드 */}
            <div className="card-signup">
              <div className="center-wrap">
                <h2 className="log_text">JOIN</h2>
                <input type="text" name="id" className="form-style" placeholder="ID" autoComplete="off" value={id} onChange={(e) => setId(e.target.value)} />
                <input type="password" name="password" className="form-style" placeholder="Password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" name="passwordCheck" className="form-style" placeholder="Password Check" autoComplete="off" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} />
                <input type="text" name="name" className="form-style" placeholder="Name" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" name="phone" className="form-style" placeholder="010-XXXX-XXXX" autoComplete="off" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type="email" name="email" className="form-style" placeholder="Email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />

                <div className="form-checks">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value="Owner"
                      checked={type === 'Owner'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      Owner
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      value="Customer"
                      checked={type === 'Customer'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                      Customer
                    </label>
                  </div>
                </div>

                <button className="btn_sub" onClick={joinHandler}>JOIN</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
