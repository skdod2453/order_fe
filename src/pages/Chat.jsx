import React, { useState, useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5'; // 나가기 이모티콘
import { useLocation } from 'react-router-dom';
import '../css/Chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: 'user', text: '안녕하세요!', timestamp: new Date() },
    { sender: 'store', text: '안녕하세요, 무엇을 도와드릴까요?', timestamp: new Date() },
    { sender: 'user', text: 'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd!', timestamp: new Date() },
    { sender: 'store', text: '안녕하세요, 무엇을 도와드릴까요dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd?', timestamp: new Date() },
  ]); // 임의로 메시지 초기화
  const [input, setInput] = useState(''); // 입력 필드 상태

  const currentLocation = useLocation();
  useEffect(() => {
    if (currentLocation.state?.autoMessage) {
      const autoMessage = currentLocation.state.autoMessage;
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'store', text: autoMessage, timestamp: new Date() },
      ]);
    }
  }, [currentLocation.state]);


  // 메시지 전송 핸들러
  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { sender: 'user', text: input, timestamp: new Date() }, // 시간과 함께 메시지 추가
      ]);
      setInput(''); // 입력 초기화
    }
  };

  // 시간을 'HH:MM' 형식으로 변환하는 함수
  const formatTime = (timestamp) => {
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  return (
    <div className='chat-outer-container'>
      <div className='chat-card'>
        {/* 상단 헤더 */}
        <div className='chat-header'>
          <IoArrowBack className='chat-exit-icon' onClick={() => alert('채팅방 나가기')} />
          <span className='chat-store-name'>가게 이름</span>
        </div>

        {/* 대화 내용 */}
        <div className='chat-messages'>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.sender === 'user' ? 'user-message' : 'store-message'}`}
            >
              <div className='message-text'>{message.text}</div>
              <div className='message-time'>{formatTime(message.timestamp)}</div>
            </div>
          ))}
        </div>

        {/* 입력 영역 */}
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
