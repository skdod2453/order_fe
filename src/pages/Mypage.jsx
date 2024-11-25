import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/MyPage.css';
import Swal from 'sweetalert2';
import { useCookies } from 'react-cookie'; 
import { FaRegHandPointRight, FaRegHandPointLeft } from "react-icons/fa";
import { MdOutlineWavingHand } from "react-icons/md";
import { PiPenBold } from "react-icons/pi";
import { TiStarOutline } from "react-icons/ti";
import { HiOutlineMailOpen } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";
import { updateUser, getName } from '../apis/user';

function Sidebar({ handleDeleteAccount, handleLogout }) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="mypage-order_sidebar">
            <ul>
                <li
                    className={location.pathname === '/mypage' ? 'active' : ''}
                    onClick={() => navigate('/mypage')}
                >
                    정보수정 <PiPenBold />
                </li>
                <li
                    className={location.pathname === '/mypage/review' ? 'active' : ''}
                    onClick={() => navigate('/mypage/review')}
                >
                    내가 쓴 리뷰 <TiStarOutline />
                </li>
            </ul>
        </div>
    );
}

function OrderContainer() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies] = useCookies(['Authorization']);
    const token = cookies.Authorization;
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            getName(token)
                .then((response) => {
                    console.log('API 응답:', response); // 응답 확인
                    if (response.data) {
                        setName(response.data); 
                    } else {
                        console.error('응답 데이터에 name 필드가 없습니다.');
                    }
                })
                .catch((error) => {
                    console.error('이름을 가져오는 중 오류가 발생했습니다.', error);
                });
        }
    }, [token]);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
    
        // 이메일이 비어있는지 체크
        if (!email) {
            Swal.fire({
                icon: 'error',
                title: '이메일을 입력해주세요',
                text: '이메일을 입력해야 합니다.',
            });
            return;
        }
    
        // 이메일 형식 검증
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            Swal.fire({
                icon: 'error',
                title: '잘못된 이메일 주소',
                text: '유효한 이메일 주소를 입력해주세요.',
            });
            return;
        }
    
        try {
            await updateUser(null, email, token); // 비밀번호는 null로 전달
            Swal.fire({
                icon: 'success',
                title: '이메일 변경 성공',
                text: '새 이메일로 변경되었습니다.',
            });
            setEmail(''); // 입력 필드 초기화
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '변경 실패',
                text: '이메일 변경 중 문제가 발생했습니다.',
            });
            console.log(error.response?.data || error.message);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (!password || password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: '비밀번호가 너무 짧습니다.',
                text: '비밀번호는 최소 6자 이상이어야 합니다.',
            });
            return;
        }

        try {
            await updateUser(password, null, token); // 이메일은 null로 전달
            Swal.fire({
                icon: 'success',
                title: '비밀번호 변경 성공',
                text: '비밀번호가 성공적으로 변경되었습니다.',
            });
            setPassword(''); // 입력 필드 초기화
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '변경 실패',
                text: '비밀번호 변경 중 문제가 발생했습니다.',
            });
            console.log(error.response?.data || error.message);
        }
    };

    return (
        <div className="mypage-order-container">
            <Sidebar />
            <div className="mypage-order-content-area">
                <div className="mypage-order-rectangle">
                    <div className="mypage-order-circle"><MdOutlineWavingHand size={38} color='#333' /></div>
                    <span className="mypage-order-text">{name} 님 안녕하세요!</span>
                </div>
                <div className="mypage-order-title">
                    <span><FaRegHandPointRight />    ------------------    정보 수정    ------------------    <FaRegHandPointLeft /></span>
                </div>
                <div className="mypage-order-rectangle-two">
                    <form onSubmit={handleEmailSubmit} className="mypage-order-form">
                        <div className="mypage-order-input-group">
                            <label htmlFor="email">이메일 <HiOutlineMailOpen /></label>
                            <div className="mypage-order-input-wrapper">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="변경할 이메일을 입력하세요"
                                />
                                <button type="submit" className="mypage-order-submit-btn">이메일 변경</button>
                            </div>
                        </div>
                    </form>

                    <form onSubmit={handlePasswordSubmit} className="mypage-order-form">
                        <div className="mypage-order-input-group">
                            <label htmlFor="password">비밀번호 <RiLockPasswordLine /></label>
                            <div className="mypage-order-input-wrapper">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="새 비밀번호를 입력하세요"
                                    required
                                />
                                <button type="submit" className="mypage-order-submit-btn">비밀번호 변경</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default OrderContainer;
