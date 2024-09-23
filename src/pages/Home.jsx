import React, { useEffect, useState } from 'react';
import * as restaurant from '../apis/restaurant';

export default function Home() {
  const [data, setData] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  
  const searchName = async (e) => {
    e.preventDefault();
  
    try {
      let response;
      if (nameSearch=== 0) {
        // 전체 데이터를 가져오는 비동기 호출
        response = await restaurant.getAll();
      } else {
        // 특정 이름의 데이터를 가져오는 비동기 호출
        response = await restaurant.getName(nameSearch);
      }
      setData(response.data);
      console.log(`data: ${response.data}`);
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
        // 전체 데이터를 가져오는 비동기 호출
        response = await restaurant.getAll();
      } else {
        // 특정 이름의 데이터를 가져오는 비동기 호출
        response = await restaurant.getCategory(categorySearch);
      }
      setData(response.data);
      console.log(`data: ${response.data}`);
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
        console.log(`data: ${response.data}`);
      } catch (error) {
        console.error(`error: ${error}`);
      }
    };

    getAll();
  }, []);

  return (
    <>
      <div className="container text-center ">
      <div className='d-flex justify-content-center'>
        <div className="input-group mt-3 w-50 m-2">
          <span className="input-group-text" id="inputGroup-sizing-default">이름</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" 
          onChange={e => setNameSearch(e.target.value)} value={nameSearch}/>
          <button type="button" class="btn bg-warning-subtle text-warning-emphasis" onClick={e => searchName(e)}>검색</button>
        </div>
        <div className="input-group mt-3 w-50 m-2">
          <span className="input-group-text" id="inputGroup-sizing-default">카테고리</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" 
          onChange={e => setCategorySearch(e.target.value)} value={categorySearch}/>
          <button type="button" class="btn bg-warning-subtle text-warning-emphasis" onClick={e => searchCategory(e)}>검색</button>
        </div>
        </div>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 mt-1 mb-5">
      {data.length > 0 ? (
        data.map((restaurant, id) => (
          <div class="col">
            <div className="card h-100" style={{ width: '20rem' }} key={id}>
              <img
                  src={
                    restaurant.storedFilePath
                      ? restaurant.storedFilePath.startsWith('http')
                        ? restaurant.storedFilePath
                        : `${process.env.PUBLIC_URL}${restaurant.storedFilePath.replace('/Users/sungjae/order/order_fe/public', '')}`
                      : ""
                  }
                className="card-img-top "
                alt="storedFilePath"
                style={{height: '13rem'}}
              />
              <div className="card-body">
                <h5 className="card-title">{restaurant.restaurantName}</h5>
                <p className="card-text">{restaurant.restaurantCategory}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{restaurant.restaurantPhone !== "" ? restaurant.restaurantPhone : '전화 번호 없음'}</li>
                <li className="list-group-item" style={{height: '4rem'}}>{restaurant.restaurantAddress}</li>
              </ul>
              <div className="card-body">
              <a href={`/detail/${restaurant.restaurantId}`} class="btn bg-warning-subtle text-warning-emphasis" tabindex="-1" role="button" aria-disabled="true">주문</a>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='container fs-4 fw-bold text-center'>가져오는 중입니다.....</div>
      )}
      </div>
      </div>
    </>
  );
}