import React, { useState, useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/Chat.css';
import Swal from 'sweetalert2';
import { useCookies } from 'react-cookie';
import { getChat, sendChat } from '../apis/chat'; 

export default function Chat() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(['Authorization']);
  const token = cookies.Authorization;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleExitClick = () => {
    Swal.fire({
      title: '정말로 나가시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '예',
      cancelButtonText: '아니오',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/introduce'); 
      }
    });
  };

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await getChat(chatId, token);
        console.log(response.data);
        if (response.data) {
          setMessages(response.data);
        } else {
          console.error('채팅 메시지가 없습니다.');
        }
      } catch (error) {
        console.error('채팅 데이터 가져오기 실패', error);
      }
    };
    const intervalId = setInterval(fetchChat, 1000);

     return () => clearInterval(intervalId);
  }, [chatId, token]);

  const handleSend = async () => {
    if (input.trim()) {

      const newMessage = { 
        sender: 'user', 
        content: input, 
        date: new Date().toISOString(),
        isUser: true 
      };
    
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput(''); 
    
      try {
        const response = await sendChat(chatId, input, token);
        console.log('서버 응답:', response); 
    
        if (response.data) {
          const sentMessage = response.data;
          sentMessage.date = new Date(sentMessage.date).toISOString();
          setMessages((prevMessages) => [...prevMessages, sentMessage]);
        }
      } catch (error) {
        console.error('메시지 전송 실패', error);
      }
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp || isNaN(new Date(timestamp).getTime())) {
      console.error('Invalid timestamp:', timestamp);
      return 'Invalid time'; 
    }
    
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  return (
    <div className='chat-outer-container'>
      <div className='chat-card'>
        <div className='chat-header'>
          <IoArrowBack className='chat-exit-icon' onClick={handleExitClick} />
          <span className='chat-store-name'>가게 이름</span>
        </div>

        <div className='chat-messages'>
        {messages.length > 0 ? ( 
          messages.map((message, index) => (
            <div
              key={message.id || `message-${index}`}
              className={`chat-message ${message.isUser ? 'user-message' : 'store-message'}`}
            >
              <div className='message-text'>{message.content}</div>
              <div className='message-time'>
                {formatTime(message.date || new Date().toISOString())}
              </div>
            </div>
          ))
        ) : (
          <div className='no-messages'>메시지가 없습니다.</div>
        )}

        </div>

        <div className='chat-input-container'>
          <input
            type='text'
            className='chat-input'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='메시지를 입력하세요...'
          />
          <button className='chat-send-btn' onClick={handleSend}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
