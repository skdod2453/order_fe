import React from 'react'
import '../css/Introduce.css'
import logo from '../image/logo.png';
import food from '../image/food.png';
import food2 from '../image/food2.png';
import { BsEmojiSmile } from "react-icons/bs";

export default function Introduce() {
  return (
    <div className="introduce-container">
      <div className="introduce-rectangle">
        <p className="introduce-text">주변 맛집 탐색 및 주문! <br /><br />
        이제 MunchMate와 함께 해요 <BsEmojiSmile /> </p>
        <img src={logo} alt="logo" className="introduce-logo" />
      </div>
      <div className="introduce-image-container">
        <img src={food} alt="MunchMate food" className="introduce-food-image" />
        <img src={food2} alt="MunchMate food2" className="introduce-food2-image" />
      </div>
    </div>
  )
}
