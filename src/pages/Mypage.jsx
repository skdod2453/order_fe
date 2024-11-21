import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/MyPage.css';
import Swal from 'sweetalert2';
import { FaRegHandPointRight, FaRegHandPointLeft } from "react-icons/fa";
import { MdOutlineWavingHand } from "react-icons/md";
import { PiPenBold } from "react-icons/pi";
import { TiStarOutline } from "react-icons/ti";
import { HiOutlineMailOpen } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";

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
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user`, {
                headers: {
                    Authorization: `${accessToken}`
                }
            })
            .then(response => {
                if (response.data && response.data.body) {
                    setNickname(response.data.body.nickname);
                }
            })
            .catch(error => {
                console.log("닉네임을 가져오는 중 오류가 발생했습니다.", error);
            });
        }
    }, []);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleEmailSubmit = (e) => {
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
    
        // 이메일 변경 로직 추가
        console.log("새 이메일:", email);
        Swal.fire({
            icon: 'success',
            title: '이메일 변경 성공',
            text: '새 이메일로 변경되었습니다.',
        });
    };
    

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        // 비밀번호 변경 로직 추가
        console.log("새 비밀번호:", password);
        Swal.fire({
            icon: 'success',
            title: '비밀번호 변경 성공',
            text: '비밀번호가 성공적으로 변경되었습니다.',
        });
    };

    return (
        <div className="mypage-order-container">
            <Sidebar />
            <div className="mypage-order-content-area">
                <div className="mypage-order-rectangle">
                    <div className="mypage-order-circle"><MdOutlineWavingHand size={38} color='#333' /></div>
                    <span className="mypage-order-text">{nickname} 님 안녕하세요!</span>
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
