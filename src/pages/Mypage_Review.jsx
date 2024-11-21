import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/MyPage.css';
import Swal from 'sweetalert2';
import { FaRegHandPointRight, FaRegHandPointLeft } from "react-icons/fa";
import { MdOutlineWavingHand } from "react-icons/md";
import { PiPenBold } from "react-icons/pi";
import { TiStarOutline } from "react-icons/ti";
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
    const [orderDate, setOrderDate] = useState('');
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

    return (
        <div className="mypage-order-container">
            <Sidebar />
            <div className="mypage-order-content-area">
                <div className="mypage-order-rectangle">
                    <div className="mypage-order-circle"><MdOutlineWavingHand size={38} color='#333' /></div>
                    <span className="mypage-order-text">{nickname} 님 안녕하세요!</span>
                </div>
                <div className="mypage-order-title">
                    <span><FaRegHandPointRight />    ------------------    내가 쓴 리뷰    ------------------    <FaRegHandPointLeft /></span>
                </div>
            </div>
        </div>
    );
}

export default OrderContainer;