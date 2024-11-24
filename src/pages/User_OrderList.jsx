import React, { useEffect, useState } from 'react';
import '../css/User_OrderList.css';
import { getOrderCustomer }  from '../apis/restaurant';
import { useNavigate } from 'react-router-dom';
import { IoHeartCircleOutline } from "react-icons/io5";
import { RiMenuSearchLine } from "react-icons/ri";
import { FcMoneyTransfer } from "react-icons/fc";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { useCookies } from 'react-cookie';
import { toZonedTime, format } from 'date-fns-tz';

export default function User_OrderList() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [cookies] = useCookies(['Authorization']);
  const token = cookies.Authorization;

  // 메뉴를 그룹화하는 함수
  const groupMenus = (menuList) => {
    return menuList.map((menu) => 
      menu.count > 1 ? `${menu.menu} x ${menu.count}` : menu.menu
    );
  };

  useEffect(() => {
    const getCustomerOrderList = async () => {
      try {
        const response = await getOrderCustomer(token);
        setOrders(response.data);
        console.log(response.data);
      } catch(error) {
        console.log(error);
      }
    }
    getCustomerOrderList();
  }, [token]);

  const formatData = (dataString) => {
    const data = new Date(dataString.replace('KST', 'UTC'));
    if (isNaN(data)) {
      return '날짜 형식 오류';
    }
    data.setHours(data.getHours() - 9); // 한국 표준시(KST)로 변환
  
    const dateFormatted = data.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  
    const timeFormatted = data.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  
    return `${dateFormatted} ${timeFormatted}`;
  };
  
  return (
    <div className='user-orderlist-container'>
      <div className='user-orderlist-header'>주문 내역 <RiMenuSearchLine style={{ fontSize: '35px' }}/></div>
      <div className='user-orderlist-content'>
        {orders.map((order, index) => (
          <div className='user-orderlist-item' key={index}>
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#FF7D29' }}>{order.restaurant}</div>
            <div>
              {groupMenus(order.menuList).map((menu, idx) => (
                <div key={idx}><IoHeartCircleOutline /> {menu}</div>
              ))}
            </div>
            <div style={{ fontWeight: 'bold' }}>
              <FcMoneyTransfer /> 총 가격 : {parseInt(order.amount, 10).toLocaleString()}원
            </div>
            <div>
              <HiMiniCalendarDays /> 주문 날짜 : {formatData(order.timeStamp)}
            </div>
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
