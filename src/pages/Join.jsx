import React from 'react'
import logo from '../image/logo.png'

export default function Join() {
  return (
    <div className="container text-center mt-3">
    <img src={logo} style={{height: '15rem'}} alt='logo' />
    <div className='d-flex justify-content-center'>
      <form>
        <div className="card h-100" style={{ width: '40rem'}}>
          <div class="card-header bg-warning-subtle text-warning-emphasis">
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
              <label for="exampleFormControlInput1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            </li>
            <li class="list-group-item">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Name</label>
              <input type="name" class="form-control" id="exampleFormControlInput1" />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Phone Number</label>
              <input type="name" class="form-control" id="exampleFormControlInput1" placeholder="010-1234-5678" />
            </div>
            </li>
            <li class="list-group-item">
              <button type="submit" class="btn bg-warning-subtle text-warning-emphasis">Join</button>
            </li>
          </ul>
        </div>
      </form>
    </div>
  </div>
  )
}
