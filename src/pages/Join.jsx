import React, { useState } from 'react'
import logo from '../image/logo.png'
import { useNavigate } from 'react-router-dom';

export default function Join() {
  const [selectedOption, setSelectedOption] = useState('1');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const clickJoin = e => {
    e.preventDefault();
    if (selectedOption === '1') {
      navigate('/');
    } else {
      navigate();
    }
  }
  return (
    <div className="container mt-3 mb-5">
      <div className='text-center'>
        <img src={logo} style={{height: '15rem'}} alt='logo' />
      </div>
    <div className='d-flex justify-content-center'>
      <form>
        <div className="card h-100" style={{ width: '40rem'}}>
          <div class="card-header bg-warning-subtle text-warning-emphasis text-center">
            Join
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">ID</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            </li>
            <li class="list-group-item">
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" />
            </div>
            </li>
            <li class="list-group-item">
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password Check</label>
              <input type="password" class="form-control" id="exampleInputPassword1" />
            </div>
            </li>
            <li class="list-group-item">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Name</label>
              <input type="name" class="form-control" id="exampleFormControlInput1" />
            </div>
            </li>
            <li class="list-group-item">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Email Address</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            </li>
            <li class="list-group-item">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Phone Number</label>
              <input type="phone" class="form-control" id="exampleFormControlInput1" placeholder="010-1234-5678" />
            </div>
            </li>
            <li class="list-group-item">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                value='1' checked={selectedOption === '1'} onChange={handleChange} />
                <label class="form-check-label" for="flexRadioDefault2">
                  Customer
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" 
                value='2' checked={selectedOption === '2'} onChange={handleChange} />
                <label class="form-check-label" for="flexRadioDefault1">
                  Seller
                </label>
            </div>
            </li>
            <li class="list-group-item text-center">
              <button type="submit" class="btn bg-warning-subtle text-warning-emphasis" onClick={clickJoin}>Join</button>
            </li>
          </ul>
        </div>
      </form>
    </div>
  </div>
  )
}
