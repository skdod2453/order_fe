import React, { useState } from 'react';
import '../css/Owner_MyStore.css';
import { useNavigate } from 'react-router-dom';
import { IoHeartCircleOutline } from "react-icons/io5";
import { RiMenuSearchLine } from "react-icons/ri";
import { FcMoneyTransfer } from "react-icons/fc";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { FcAlarmClock } from "react-icons/fc";

export default function Owner_MyStore() {
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);


  const orders = [
    {
      storeName: '가게 이름1',
      customerName: '홍길동',
      menuList: ['메뉴1', '메뉴2', '메뉴1'],
      totalPrice: '30,000원',
      orderDate: '2024-11-22',
      chatLink: '#',
    },
    {
      storeName: '가게 이름2',
      customerName: '김철수',
      menuList: ['메뉴A', '메뉴B', '메뉴B'],
      totalPrice: '15,000원',
      orderDate: '2024-11-21',
      chatLink: '#',
    },
    {
      storeName: '가게 이름3',
      customerName: '박영희',
      menuList: ['메뉴X', '메뉴Y', '메뉴Z', '메뉴X'],
      totalPrice: '45,000원',
      orderDate: '2024-11-20',
      chatLink: '#',
    },
    {
      storeName: '가게 이름3',
      customerName: '박영희',
      menuList: ['메뉴X', '메뉴Y', '메뉴Z', '메뉴X'],
      totalPrice: '45,000원',
      orderDate: '2024-11-20',
      chatLink: '#',
    },
    {
      storeName: '가게 이름3',
      customerName: '박영희',
      menuList: ['메뉴X', '메뉴Y', '메뉴Z', '메뉴X'],
      totalPrice: '45,000원',
      orderDate: '2024-11-20',
      chatLink: '#',
    },
    {
      storeName: '가게 이름3',
      customerName: '박영희',
      menuList: ['메뉴X', '메뉴Y', '메뉴Z', '메뉴X'],
      totalPrice: '45,000원',
      orderDate: '2024-11-20',
      chatLink: '#',
    },
    {
      storeName: '가게 이름3',
      customerName: '박영희',
      menuList: ['메뉴X', '메뉴Y', '메뉴Z', '메뉴X', '메뉴A', '메뉴B', '메뉴c'],
      totalPrice: '45,000원',
      orderDate: '2024-11-20',
      chatLink: '#',
    }
  ];

  // 메뉴를 그룹화하는 함수
  const groupMenus = (menuList) => {
    const menuCount = {};
    menuList.forEach(menu => {
      menuCount[menu] = (menuCount[menu] || 0) + 1;
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

  return (
    <div className='owner-mystore-container'>
      <div className='owner-mystore-header'>주문 내역 <RiMenuSearchLine style={{ fontSize: '35px' }}/></div>
      <div className='owner-mystore-content'>
        {orders.map((order, index) => (
          <div className='owner-mystore-item' key={index}>
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#FF7D29' }}>{order.storeName}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>고객명: {order.customerName}</div>
            <div>
              {groupMenus(order.menuList).map((menu, idx) => (
                <div key={idx}><IoHeartCircleOutline /> {menu}</div>
              ))}
            </div>
            <div style={{ fontWeight: 'bold' }}><FcMoneyTransfer /> 총 가격 : {order.totalPrice}</div>
            <div><HiMiniCalendarDays /> 주문 날짜 : {order.orderDate}</div>
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
              <h3><FcAlarmClock /> 예상 조리 시간을 선택하세요 <FcAlarmClock /></h3>
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