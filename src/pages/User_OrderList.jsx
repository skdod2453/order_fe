import React from 'react';
import '../css/User_OrderList.css';
import { useNavigate } from 'react-router-dom';
import { IoHeartCircleOutline } from "react-icons/io5";
import { RiMenuSearchLine } from "react-icons/ri";
import { FcMoneyTransfer } from "react-icons/fc";
import { HiMiniCalendarDays } from "react-icons/hi2";

export default function User_OrderList() {
  const navigate = useNavigate();

  const orders = [
    {
      storeName: '가게 이름1',
      menuList: ['메뉴1', '메뉴2', '메뉴1'],
      totalPrice: '30,000원',
      orderDate: '2024-11-22',
      chatLink: '#',
    },
    {
      storeName: '가게 이름2',
      menuList: ['메뉴A', '메뉴B', '메뉴B'],
      totalPrice: '15,000원',
      orderDate: '2024-11-21',
      chatLink: '#',
    },
    {
      storeName: '가게 이름3',
      menuList: ['메뉴X', '메뉴Y', '메뉴Z', '메뉴X'],
      totalPrice: '45,000원',
      orderDate: '2024-11-20',
      chatLink: '#',
    },
    {
      storeName: '가게 이름3',
      menuList: ['메뉴X', '메뉴Y', '메뉴Z', '메뉴X'],
      totalPrice: '45,000원',
      orderDate: '2024-11-20',
      chatLink: '#',
    },
    {
      storeName: '가게 이름3',
      menuList: ['메뉴X', '메뉴Y', '메뉴Z', '메뉴X'],
      totalPrice: '45,000원',
      orderDate: '2024-11-20',
      chatLink: '#',
    },
    {
      storeName: '가게 이름3',
      menuList: ['메뉴X', '메뉴Y', '메뉴Z', '메뉴X'],
      totalPrice: '45,000원',
      orderDate: '2024-11-20',
      chatLink: '#',
    },
    {
      storeName: '가게 이름3',
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

  return (
    <div className='user-orderlist-container'>
      <div className='user-orderlist-header'>주문 내역 <RiMenuSearchLine style={{ fontSize: '35px' }}/></div>
      <div className='user-orderlist-content'>
        {orders.map((order, index) => (
          <div className='user-orderlist-item' key={index}>
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#FF7D29' }}>{order.storeName}</div>
            <div>
              {groupMenus(order.menuList).map((menu, idx) => (
                <div key={idx}><IoHeartCircleOutline /> {menu}</div>
              ))}
            </div>
            <div style={{ fontWeight: 'bold' }}><FcMoneyTransfer /> 총 가격 : {order.totalPrice}</div>
            <div><HiMiniCalendarDays /> 주문 날짜 : {order.orderDate}</div>
            <button
              className='order-chat-btn'
              onClick={() => navigate('/chat')}
            >
              채팅방
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
