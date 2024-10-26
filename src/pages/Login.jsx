import React, { useState } from 'react';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';
import { login, join } from '../apis/user';
import Swal from 'sweetalert2';

export default function Login() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('1');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState(''); // 수정
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState("1");

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
      
    try {
      const response = await login(id, password);
      console.log("로그인 성공:", response.data);
      Swal.fire({
        icon: 'success',
        title: '로그인 성공!',
        showConfirmButton: true,
        confirmButtonText: '확인',
        confirmButtonColor: '#754F23', 
        background: '#F0EADC', 
        color: '#754F23',  
        iconColor: '#DBC797'
      }).then(() => {
        navigate("/");
      });

    } catch (error) {
      console.error(`error: ${error}`);
      console.error("로그인 실패:", error);
      if (error.response && error.response.status === 401) {
          Swal.fire({
              icon: 'error',
              title: '아이디 또는 비밀번호가 잘못되었습니다.',
              text: '다시 시도해주세요.',
              showConfirmButton: true,
              confirmButtonText: '확인',
              confirmButtonColor: '#754F23',
              background: '#F0EADC',
              color: '#754F23',
              iconColor: '#DBC797'
          });
      } else {
          Swal.fire({
              icon: 'error',
              title: '로그인 실패!',
              text: '다시 시도해주세요.',
              showConfirmButton: true,
              confirmButtonText: '확인',
              confirmButtonColor: '#754F23',
              background: '#F0EADC',
              color: '#754F23',
              iconColor: '#DBC797'
          });
      }
    }
  };

  const joinHandler = async (e) => {
    e.preventDefault();

    if (password !== passwordCheck) {
      Swal.fire({
        icon: 'error',
        title: '비밀번호 불일치!',
        text: '비밀번호와 확인 비밀번호가 일치하지 않습니다.',
        showConfirmButton: true,
        confirmButtonText: '확인',
        confirmButtonColor: '#754F23',
        background: '#F0EADC',
        color: '#754F23',
        iconColor: '#DBC797'
      });
      return;
    }

    try {
      const response = await join(id, password, passwordCheck, name, phone, email, type);
      console.log("회원가입 성공:", response.data);
      Swal.fire({
        icon: 'success',
        title: '회원가입 성공!',
        showConfirmButton: true,
        confirmButtonText: '확인',
        confirmButtonColor: '#754F23',
        background: '#F0EADC',
        color: '#754F23',
        iconColor: '#DBC797'
      }).then(() => {
        navigate("/login"); // 회원가입 후 이동할 페이지
      });
    } catch (error) {
      console.error(`error: ${error}`);
      Swal.fire({
        icon: 'error',
        title: '회원가입 실패!',
        text: '다시 시도해주세요.',
        showConfirmButton: true,
        confirmButtonText: '확인',
        confirmButtonColor: '#754F23',
        background: '#F0EADC',
        color: '#754F23',
        iconColor: '#DBC797'
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
        <input className="checkbox" type="checkbox" id="reg-log" />
        <label htmlFor="reg-log"></label>
        <div className="card-wrap">
          <div className="card-wrapper">
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
                <input type="password" name="passwordCheck" className="form-style" placeholder="Password Check" autoComplete="off" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} /> {/* 수정 */}
                <input type="text" name="name" className="form-style" placeholder="Name" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" name="phone" className="form-style" placeholder="010-XXXX-XXXX" autoComplete="off" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type="text" name="email" className="form-style" placeholder="Email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />

                <div className="form-checks">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                      value='1' checked={selectedOption === '1'} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      Owner
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" 
                      value='2' checked={selectedOption === '2'} onChange={handleChange} />
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
