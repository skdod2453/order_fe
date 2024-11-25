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
import { useCookies } from 'react-cookie';
import { getAllByUser } from '../apis/restaurant';
import { getName } from '../apis/user';

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
    const [name, setName] = useState('');
    const [reviews, setReviews] = useState([]);
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

    useEffect(() => {
        if (token) {
            getAllByUser(token)
                .then((response) => {
                    setReviews(response.data);
                })
                .catch((error) => {
                    console.error('리뷰를 가져오는 중 오류 발생:', error);
                    if (error.response && error.response.status === 404) {
                        Swal.fire({
                            icon: 'info',
                            title: '작성한 리뷰가 없습니다.',
                            text: '리뷰가 아직 없습니다.',
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: '리뷰 조회 실패',
                            text: '리뷰를 가져오는 데 실패했습니다.',
                        });
                    }
                });
        } else {
            Swal.fire({
                icon: 'error',
                title: '로그인 필요',
                text: '리뷰를 조회하려면 로그인해야 합니다.',
            });
            navigate('/login');
        }
    }, [token, navigate]);

    return (
        <div className="mypage-order-container">
            <Sidebar />
            <div className="mypage-order-content-area">
                <div className="mypage-order-rectangle">
                    <div className="mypage-order-circle">
                        <MdOutlineWavingHand size={38} color="#333" />
                    </div>
                    <span className="mypage-order-text">{name} 님 안녕하세요!</span>
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
                            <div key={index} className="myreview-item">
                                <h3 className="myreview-store-name"><BiStore style={{ marginTop: '-3px' }}/> {review.restaurantName} </h3>
                                <p className="myreview-rating"> ⭐     
                                    <span className="rating-number">  {review.rating}</span> / 5
                                </p>
                                <p className="myreview-content">{review.reviewContents}</p>
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

