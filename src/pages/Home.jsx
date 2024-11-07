import React, { useEffect, useState } from 'react';
import * as restaurant from '../apis/restaurant';
import '../css/Home.css';

export default function Home() {
  const [data, setData] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [searchType, setSearchType] = useState('name'); // 'name' 또는 'category'

  const search = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (searchType === 'name') {
        response = nameSearch === '' ? await restaurant.getAll() : await restaurant.getName(nameSearch);
      } else {
        response = categorySearch === '' ? await restaurant.getAll() : await restaurant.getCategory(categorySearch);
      }
      setData(response.data);
    } catch (error) {
      console.error(`error: ${error}`);
    }
    setNameSearch('');
    setCategorySearch('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search(e);
    }
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
      <div className='search'>
        <select onChange={e => setSearchType(e.target.value)} value={searchType}>
          <option value="name">이름</option>
          <option value="category">카테고리</option>
        </select>
        <input 
          type="text" 
          onChange={e => searchType === 'name' ? setNameSearch(e.target.value) : setCategorySearch(e.target.value)} 
          value={searchType === 'name' ? nameSearch : categorySearch} 
          placeholder="검색어를 입력하세요" 
          onKeyDown={handleKeyDown}
        />
        <button type="button" onClick={e => search(e)}>검색</button>
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
                  <a href={`/detail/${restaurant.restaurantId}`} className="btn" style={{ backgroundColor: '#FEFFD2', color: '#FF7D29', border: '1px solid #FFBF78',borderRadius: '5px'}}>주문</a>
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
