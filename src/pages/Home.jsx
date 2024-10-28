import React, { useEffect, useState } from 'react';
import * as restaurant from '../apis/restaurant';
import '../css/Home.css';

export default function Home() {
  const [data, setData] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  
  const searchName = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (nameSearch === 0) {
        response = await restaurant.getAll();
      } else {
        response = await restaurant.getName(nameSearch);
      }
      setData(response.data);
    } catch (error) {
      console.error(`error: ${error}`);
    }
    setNameSearch('');
  };

  const searchCategory = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (categorySearch === 0) {
        response = await restaurant.getAll();
      } else {
        response = await restaurant.getCategory(categorySearch);
      }
      setData(response.data);
    } catch (error) {
      console.error(`error: ${error}`);
    }
    setCategorySearch('');
  };

  useEffect(() => {
    const getAll = async () => {
      try {
        const response = await restaurant.getAll();
        setData(response.data);
      } catch (error) {
        console.error(`error: ${error}`);
      }
    };
    getAll();
  }, []);

  return (
    <div className="order-container text-center">
      <div className='d-flex justify-content-center'>
        <div className="input-group mt-3 w-50 m-2">
          <span className="input-group-text" id="inputGroup-sizing-default">이름</span>
          <input type="text" className="form-control" onChange={e => setNameSearch(e.target.value)} value={nameSearch}/>
          <button type="button" className="btn bg-warning-subtle text-warning-emphasis" onClick={e => searchName(e)}>검색</button>
        </div>
        <div className="input-group mt-3 w-50 m-2">
          <span className="input-group-text" id="inputGroup-sizing-default">카테고리</span>
          <input type="text" className="form-control" onChange={e => setCategorySearch(e.target.value)} value={categorySearch}/>
          <button type="button" className="btn bg-warning-subtle text-warning-emphasis" onClick={e => searchCategory(e)}>검색</button>
        </div>
      </div>
      <div className="product-list">
        {data.length > 0 ? (
          data.map((restaurant, id) => (
            <div className="col" key={id}>
              <div className="order-card card h-100" style={{ width: '20rem' }}>
                <img
                  src={
                    restaurant.storedFilePath
                      ? restaurant.storedFilePath.startsWith('http')
                        ? restaurant.storedFilePath
                        : `${process.env.PUBLIC_URL}${restaurant.storedFilePath.replace('/Users/sungjae/order/order_fe/public', '')}`
                      : ""
                  }
                  className="card-img-top order-card-img-top"
                  alt="storedFilePath"
                  style={{ height: '13rem' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{restaurant.restaurantName}</h5>
                  <p className="card-text">{restaurant.restaurantCategory}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">{restaurant.restaurantPhone !== "" ? restaurant.restaurantPhone : '전화 번호 없음'}</li>
                  <li className="list-group-item" style={{ height: '4rem' }}>{restaurant.restaurantAddress}</li>
                </ul>
                <div className="card-body">
                  <a href={`/detail/${restaurant.restaurantId}`} className="btn bg-warning-subtle text-warning-emphasis">주문</a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='container fs-4 fw-bold text-center'>가져오는 중입니다.....</div>
        )}
      </div>
    </div>
  );
}
