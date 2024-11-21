import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/MyPage.css';
import '../css/MyPage_Review.css';
import Swal from 'sweetalert2';
import { FaRegHandPointRight, FaRegHandPointLeft } from "react-icons/fa";
import { MdOutlineWavingHand } from "react-icons/md";
import { PiPenBold } from "react-icons/pi";
import { TiStarOutline } from "react-icons/ti";
import { BiStore } from "react-icons/bi";
import axios from "axios";

function Sidebar() {
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
    const [nickname, setNickname] = useState('자나요');
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const mockReviews = [
            { storeName: "맛있는 식당", rating: 5, content: "정말 맛있었어요! 강추합니다." },
            { storeName: "친절한 카페", rating: 4, content: "직원이 친절하고 분위기가 좋아요." },
            { storeName: "감성 빵집", rating: 3, content: "빵은 맛있는데 가격이 조금 비쌌어요." },
        ];
        setReviews(mockReviews);
    }, []);

    return (
        <div className="mypage-order-container">
            <Sidebar />
            <div className="mypage-order-content-area">
                <div className="mypage-order-rectangle">
                    <div className="mypage-order-circle">
                        <MdOutlineWavingHand size={38} color="#333" />
                    </div>
                    <span className="mypage-order-text">{nickname} 님 안녕하세요!</span>
                </div>
                <div className="mypage-order-title">
                    <span>
                        <FaRegHandPointRight /> 
                        ------------------ 내가 쓴 리뷰 ------------------ 
                        <FaRegHandPointLeft />
                    </span>
                </div>
                <div className="mypage-review-box">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="review-item">
                                <h3 className="review-store-name"><BiStore style={{ marginTop: '-3px' }}/> {review.storeName} </h3>
                                <p className="review-rating"> ⭐     
                                    <span className="rating-number">  {review.rating}</span> / 5
                                </p>
                                <p className="review-content">{review.content}</p>
                            </div>
                        ))
                    ) : (
                        <p>작성한 리뷰가 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}


export default OrderContainer;

