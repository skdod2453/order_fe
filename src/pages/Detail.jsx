import React, { useEffect, useState } from 'react';
import * as restaurant from '../apis/restaurant';
import { startChat } from '../apis/chat';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';
import StarRatings from 'react-star-ratings';
import { PiBowlFoodDuotone } from "react-icons/pi";
import { AiTwotoneStar } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import '../css/Detail.css';
import axios from 'axios';

function Sidebar({ cartItems, addToCart, removeFromCart, restaurantId }) {
  const navigate = useNavigate();
  const [cookies] = useCookies(['Authorization']);
  const token = cookies.Authorization;
  const [data, setData] = useState(null);
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.menuPrice.replace(/[^0-9.-]+/g, ""));
      return total + (price * item.quantity);
    }, 0);
  };

  const formatPrice = (price) => {
    return price.toLocaleString();
  };

  const handlePayClick = async () => {
    const updatedItems = cartItems.map(item => ({
      menu: item.menuName,
      price: parseInt(item.menuPrice.replace(/[^0-9.-]+/g, ""), 10), // 문자열을 long 타입으로 변환
      count: item.quantity
    }));
  
    try {
      const response = await restaurant.postByCart(updatedItems, getTotalPrice(), restaurantId, token);
      setData(response.data);
      console.log(response.data);
  
      const { IMP } = window;
      IMP.init('imp34231871'); // 가맹점 식별 코드
  
      IMP.request_pay({
        pg: 'kakaopay.TC0ONETIME',
        pay_method: 'card',
        merchant_uid: `order_${new Date().getTime()}`, // 주문 고유 번호
        name: response.data.name,
        amount: response.data.amount,
        buyer_email: response.data.buyer_email,
        buyer_name: response.data.buyer_name,
        buyer_tel: response.data.buyer_tel,
      }, async (rsp) => {
        if (rsp.success) {
          try {
            const { payData } = await axios.post(
              `http://43.202.86.72:8080/pay/verify/${rsp.imp_uid}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${cookies.Authorization}`, // JWT 토큰 추가
                }
              }
            );
  
            if (rsp.paid_amount === response.data.amount) {
              try {
                const chatResponse = await startChat(restaurantId, token);
                console.log("chatId: " + chatResponse.data)

              Swal.fire({
                title: "결제 성공",
                text: "예상 소용시간은 채팅방을 확인하세요",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "채팅방 가기",
                cancelButtonText: "홈으로 가기",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate(`/chat/${chatResponse.data}`);
                } else {
                  navigate('/introduce');
                }
              });
            } catch (error) {
              console.log(error);
            }
            } else {
              Swal.fire({
                icon: 'error',
                title: '결제 실패',
                text: '결제 금액이 일치하지 않습니다.',
              });
            }
          } catch (error) {
            console.error('결제 검증 중 오류 발생:', error);
            Swal.fire({
              icon: 'error',
              title: '결제 검증 중 오류 발생',
              text: `${error.message}`,
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: '결제 실패',
            text: `${rsp.error_msg}`,
          });
        }
      });
    } catch (error) {
      console.error('결제 요청 중 오류 발생:', error);
    }
  };
  

  return (
    <div className="sidebar">
      <div className="logo">
        <h2><BsCart4 style={{color: '#FF7D29'}} />    장바구니    <BsCart4 style={{color: '#FF7D29'}} /></h2>
      </div>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => {
          const price = parseFloat(item.menuPrice.replace(/[^0-9.-]+/g, ""));
          const totalPrice = price * item.quantity;
          return (
            <div key={index} className="cart-item">
              <span>{index + 1}. </span>
              <span>{item.menuName}</span>
              <span style={{ marginLeft: '10px' }}>{formatPrice(totalPrice)} 원</span>
              <div className='sidebar-buttonitem'>
                <button
                  type="button"
                  className="btn"
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  className="btn"
                  onClick={() => removeFromCart(item)}
                >
                  -
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>장바구니가 비어 있습니다.</p>
      )}
      <div className="total-price">
        <strong>총 가격: {formatPrice(getTotalPrice())} 원</strong>
      </div>
      <button className="pay-btn" onClick={handlePayClick}>
        결 제 
      </button>
    </div>
  );
}

export default function Detail() {
  const [cookies] = useCookies(['Authorization']);
  const token = cookies.Authorization;
  const [data, setData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState('menu');
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [reviews, setReviews] = useState([]);
  const nickname = '작성자ID'; // 작성자 ID, 실제로는 백엔드에서 가져와야 함

  useEffect(() => {
    const getId = async () => {
      try {
        const response = await restaurant.getId(restaurantId, token);
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        if (error.response && error.response.status === 403) {
          navigate('/login');
          Swal.fire({
            icon: 'error',
            title: '로그인 후 이용 가능합니다!',
            text: '아이디와 비밀번호를 입력해야 합니다.',
            confirmButtonText: '확인',
            confirmButtonColor: '#FF7D29',
            background: '#white',
            color: '#754F23',
            iconColor: '#DBC797'
          });
        } else {
          console.error(error);
        }
      }
    };
    getId();
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
    document.head.removeChild(jquery);
    document.head.removeChild(iamport);
    }
  }, [restaurantId, reviews]);

  if (!data || !data.restaurantResponseDto) {
    return <div className='container fs-4 fw-bold text-center'>가져오는 중입니다.....</div>;
  }

  const { restaurantResponseDto, menuResponseDtoList, reviewResponseDtoList } = data;
  console.log(reviewResponseDtoList)

  const addToCart = (menu) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.menuName === menu.menuName);
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        console.log(cartItems);
        return updatedItems;
      } else {
        return [...prevItems, { ...menu, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (menuToRemove) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.menuName === menuToRemove.menuName);
      if (existingItemIndex !== -1 && prevItems[existingItemIndex].quantity > 1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity -= 1;
        return updatedItems;
      } else {
        return prevItems.filter((item) => item.menuName !== menuToRemove.menuName);
      }
    });
  };

  const formatPrice = (price) => {
    return price.toLocaleString();
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (rating === 0 || description.trim() === "") {
      Swal.fire({
        icon: 'warning',
        title: '별점 및 리뷰 내용을 작성해주세요!',
        text: '별점과 리뷰 내용을 모두 입력해야 작성할 수 있습니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#FF7D29',
      });
      return;
    }
    try {
      const response = await restaurant.createReview(description, rating, restaurantId, token);
      Swal.fire({
        icon: 'success',
        title: '리뷰 등록 성공',
        confirmButtonText: '확인',
        confirmButtonColor: '#FF7D29',
        background: '#white',
        color: '#754F23',
        iconColor: '#B6FFA1'
      });

      setRating(0);
      setDescription("");
  
      const updatedReviews = await restaurant.getAllByRestaurant(restaurantId, token);
      setReviews(updatedReviews.data);
  
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '리뷰 등록 실패',
        text: '다시 시도해주세요.',
        confirmButtonText: '확인',
        confirmButtonColor: '#FF7D29',
        background: '#white',
        color: '#754F23',
        iconColor: '#FFBF78'
      });
    }
  };

  const calculateAverageRating = () => {
    if (!reviewResponseDtoList || reviewResponseDtoList.length === 0) return 0;
    const totalRating = reviewResponseDtoList.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviewResponseDtoList.length;
  };
  
  const averageRating = calculateAverageRating();

  return (
    <div className='detail-container'>
      <Sidebar cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} restaurantId={restaurantId} />

      <div className="menu-review-section">
        <div className="container text-center mt-3 d-flex justify-content-center">
          <div className="card h-100">
            <img
              src={restaurantResponseDto.storedFilePath ? restaurantResponseDto.storedFilePath : ""}
              className="card-img-top"
              alt="Stored File"
            />
            <div className="card-body">
              <h5 className="card-title">{restaurantResponseDto.restaurantName}</h5>
              <p className="card-text">{restaurantResponseDto.restaurantCategory}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item phone-number">
                {restaurantResponseDto.restaurantPhone !== "" ? restaurantResponseDto.restaurantPhone : '전화 번호 없음'}
              </li>
              <li className="list-group-item">
                {restaurantResponseDto.restaurantAddress}
              </li>
            </ul>
            <div className="average-rating">
              <StarRatings
                rating={averageRating}  // 평균 별점에 따라 별을 채워줌
                starRatedColor="gold"
                numberOfStars={5}
                name="average-rating"
                starDimension="30px"
                starSpacing="5px"
              />
              <span style={{ marginLeft: '10px', fontSize: '15px', color: '#7A7876' }}>
                평균 별점: {averageRating.toFixed(1)}  {/* 평균 별점 숫자 표시 */}
              </span>
            </div>
          </div>
        </div>
        
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            <PiBowlFoodDuotone />    메뉴    <PiBowlFoodDuotone />
          </button>
          <button
            className={`tab-btn ${activeTab === 'review' ? 'active' : ''}`}
            onClick={() => setActiveTab('review')}
          >
            <AiTwotoneStar />    리뷰    <AiTwotoneStar />
          </button>
        </div>

        {activeTab === 'menu' && (
          <div className="d-flex justify-content-center">
            <ol className="menu-list-container list-group list-group-numbered mt-3" style={{ width: '80%' }}>
              {menuResponseDtoList && menuResponseDtoList.length > 0 ? (
                menuResponseDtoList.map((menu, id) => {
                  const price = parseFloat(menu.menuPrice.replace(/[^0-9.-]+/g, ""));
                  return (
                    <li key={id} className="list-group-item menu-list-item d-flex justify-content-between align-items-center">
                      <div className="ms-2 me-auto d-flex justify-content-between align-items-center" style={{ flexGrow: 1 }}>
                        <div className="fw-bold" style={{ marginRight: '10px' }}>{menu.menuName}</div>
                        <div style={{ marginRight: '10px' }}>{formatPrice(price)} 원</div>
                      </div>
                      <div className="d-flex">
                        <button type="button" className="btn" style={{ marginRight: '10px' }} onClick={() => addToCart(menu)}>+</button>
                        <button type="button" className="btn" onClick={() => removeFromCart(menu)}>-</button>
                      </div>
                    </li>
                  );
                })
              ) : (
                <div className="container fs-4 fw-bold text-center">메뉴가 없습니다.</div>
              )}
            </ol>
          </div>
        )}

        {activeTab === 'review' && (
          <div className="review-section">
            <div className="review-form">
              <div className="rating-input" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <StarRatings
                  rating={rating}
                  starRatedColor="gold"
                  starHoverColor="#FF7D29"
                  changeRating={(newRating) => setRating(newRating)}
                  numberOfStars={5}
                  name="rating"
                  starDimension="30px"
                  starSpacing="5px"
                />
                <button 
              style={{ backgroundColor: '#FEFFD2', color: '#FF7D29', border: '1px solid #FFBF78',borderRadius: '5px'}}
              onClick={handleSubmitReview}>등록</button>
              </div>
              <textarea
                style={{ width: '100%', marginTop: '10px', background: '#F4F1EC'}}
                placeholder="리뷰를 작성하세요"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="reviews-list">
            {reviewResponseDtoList && reviewResponseDtoList.length > 0 ? (
            reviewResponseDtoList
            .map((review,id) => (
                  <div key={id} className="review-item">
                    <div className="review-rating">
                      <StarRatings
                        rating={review.rating}
                        starRatedColor="gold"
                        numberOfStars={5}
                        name="user-rating"
                        starDimension="20px"
                        starSpacing="3px"
                      />
                    </div>
                    <div className="review-content">
                      <span style={{color: '#FF7D29', fontWeight: 'bold'}}>{review.userName}</span>
                      <p style={{ marginTop: '10px' }}>{review.reviewContents}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className='reviewlist-form'> 
                  리뷰가 아직 없습니다. 첫 번째 리뷰를 작성해보세요! 
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
