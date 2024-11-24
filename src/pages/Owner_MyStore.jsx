import React, { useEffect, useState } from 'react';
import '../css/Owner_MyStore.css';
import { getOrderOwner } from '../apis/restaurant';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { IoHeartCircleOutline } from "react-icons/io5";
import { RiMenuSearchLine } from "react-icons/ri";
import { FcMoneyTransfer } from "react-icons/fc";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { FcAlarmClock } from "react-icons/fc";

export default function Owner_MyStore() {
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [cookies] = useCookies(['Authorization']);
  const token = cookies.Authorization;

  const groupMenus = (menuList) => {
    if (!menuList || menuList.length === 0) {
      return [];
    }

    const menuCount = {};
    menuList.forEach(menu => {
      const name = menu.menu; 
      menuCount[name] = (menuCount[name] || 0) + 1;
    });

    return Object.entries(menuCount).map(([name, count]) =>
      count > 1 ? `${name} x ${count}` : name
    );
  };

  const handleTimeSelect = (time) => {
    setPopupOpen(false);
    const message = `주문 조리 완료 시간은 약 ${time}분이 걸립니다.`;
    navigate('/chat', { state: { autoMessage: message } }); // 메시지를 전달
  };

  useEffect(() => {
    const getOwnerOrderList = async () => {
      try {
        const response = await getOrderOwner(token);
        console.log(response.data); 
        const processedOrders = response.data.map(order => {
          return {
            ...order,
            groupedMenus: groupMenus(order.menuList || []),
            amount: order.amount,
            chat: order.chat,
            restaurant: order.restaurant,
            timeStamp: order.timeStamp,
            user: order.user,
          };
        });
        setOrders(processedOrders); // 각 주문을 배열로 저장
        console.log(processedOrders);
      } catch (error) {
        console.log(error);
      }
    };

    // 1초마다 getOwnerOrderList를 호출
    const interval = setInterval(getOwnerOrderList, 1000);

    // 컴포넌트가 언마운트될 때 interval을 정리
    return () => clearInterval(interval);

  }, [token]);

  return (
    <div className='owner-mystore-container'>
      <div className='owner-mystore-header'>
        주문 내역 <RiMenuSearchLine style={{ fontSize: '35px' }} />
      </div>
      <div className='owner-mystore-content'>
      {orders.filter(order => order.timeStamp !== null).map((order, index) => (
          <div className='owner-mystore-item' key={index}>
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#FF7D29' }}>
              {order.restaurant} {/* 레스토랑 이름 */}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>고객명: {order.user}</div>
            <div>
              {order.groupedMenus.map((menu, idx) => (
                <div key={idx}>
                  <IoHeartCircleOutline /> {menu} {/* 메뉴 아이콘과 메뉴 이름 */}
                </div>
              ))}
            </div>
            <div style={{ fontWeight: 'bold' }}>
              <FcMoneyTransfer /> 총 가격 : {order.amount} {/* 가격 */}
            </div>
            <div><HiMiniCalendarDays /> 주문 날짜 : {order.timeStamp}</div> {/* 주문 날짜 */}
            <div className='owner-buttons-container'>
              <button
                className='owner-chat-btn'
                onClick={() => navigate('/chat')}
              >
                채팅방
              </button>
              <button
                className='owner-time-btn'
                onClick={() => setPopupOpen(true)}
              >
                시간 선택
              </button>
            </div>
          </div>
        ))}
        {popupOpen && (
          <div className='popup'>
            <div className='popup-content'>
              <h3>
                <FcAlarmClock /> 예상 조리 시간을 선택하세요 <FcAlarmClock />
              </h3>
              <p>시간을 선택하시면 자동으로 채팅을 전송합니다</p>
              <div className='popup-buttons'>
                {[10, 20, 30, 50].map((time) => (
                  <button key={time} onClick={() => handleTimeSelect(time)}>
                    {time}분
                  </button>
                ))}
              </div>
              <button className='popup-close' onClick={() => setPopupOpen(false)}>
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
