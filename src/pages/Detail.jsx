import React, { useEffect, useState } from 'react';
import * as restaurant from '../apis/restaurant';
import { useParams } from 'react-router-dom';

export default function Detail() {
  const [data, setData] = useState(null);
  const { restaurantId } = useParams();

  useEffect(() => {
    const getId = async () => {
      try {
        const response = await restaurant.getId(restaurantId);
        setData(response.data);
        console.log(`data: ${response.data}`);
      } catch (error) {
        console.error(`error: ${error}`);
      }
    };

    getId();
  }, [restaurantId]);

  if (!data || !data.restaurantResponseDto) {
    return <div className='container fs-4 fw-bold text-center'>가져오는 중입니다.....</div>
  }

  const { restaurantResponseDto, menuResponseDtoList } = data;

  return (
    <>
      <div className="container text-center mt-3 d-flex justify-content-center">
        <div className="card h-100" style={{ width: '40rem' }}>
          <img
            src={
                restaurantResponseDto.storedFilePath
                  ? restaurantResponseDto.storedFilePath.startsWith('http')
                    ? restaurantResponseDto.storedFilePath
                    : `${process.env.PUBLIC_URL}${restaurantResponseDto.storedFilePath.replace('/Users/sungjae/order/order_fe/public', '')}`
                  : ""
              }
            className="card-img-top"
            alt="Stored File"
            style={{ height: '30rem' }}
          />
          <div className="card-body">
            <h5 className="card-title">{restaurantResponseDto.restaurantName}</h5>
            <p className="card-text">{restaurantResponseDto.restaurantCategory}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {restaurantResponseDto.restaurantPhone !== "" ? restaurantResponseDto.restaurantPhone : '전화 번호 없음'}
            </li>
            <li className="list-group-item" style={{ height: '4rem' }}>
              {restaurantResponseDto.restaurantAddress}
            </li>
          </ul>
        </div>
        </div>

        <ol className="container list-group list-group-numbered mt-4 d-flex justify-content-center" style={{width: '60rem'}}>
            {menuResponseDtoList && menuResponseDtoList.length > 0 ? (
            menuResponseDtoList.map((menu, id) => (
                <li key={id} className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{menu.menuName}</div>
                    {menu.menuPrice}
                </div>
                <button type="button" class="btn bg-warning-subtle text-warning-emphasis" >장바구니 담기</button>
                </li>
            ))
            ) : (
                <div className='container fs-4 fw-bold text-center'>메뉴가 없습니다.</div>
            )}
        </ol>

    </>
  );
}