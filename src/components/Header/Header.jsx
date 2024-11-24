import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../../image/logo.png';

export default function NavBar() {
  const [cookies, , removeCookie] = useCookies(['Authorization', 'Id', 'Type']);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: '로그아웃 하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '예',
      cancelButtonText: '아니오',
      confirmButtonColor: '#FF4545',
      cancelButtonColor: '#9BEC00',
      background: '#fff',
      color: '#754F23'
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie('Authorization', { path: '/' });
        removeCookie('Id', { path: '/' });
        Swal.fire({
          icon: 'success',
          title: '로그아웃 완료!',
          confirmButtonText: '확인',
          confirmButtonColor: '#FF7D29',
          background: '#fff',
          color: '#754F23'
        }).then(() => {
          navigate('/introduce');
        });
      }
    });
  };

  const isLoggedIn = cookies.Authorization && cookies.Id; // 로그인 여부 확인
  const userType = cookies.Type;

  return (
    
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#FEFFD2' }}>
      <Container fluid>
        <Navbar.Brand>
          <img src={logo} width={50} alt='logo' 
          style={{ cursor: 'pointer' }} 
          onClick={() => navigate('/introduce')} 
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Store</Nav.Link>
            <Nav.Link href="/map">Map</Nav.Link>
            {isLoggedIn && userType === 'Customer' && (
              <Nav.Link href="/userorderlist">Order list</Nav.Link>
            )}
            {isLoggedIn && userType === 'Owner' && (
              <Nav.Link href="/ownermystore">MyStore</Nav.Link>
            )}
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                {userType === 'Owner' ? (
                  <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
                ) : (
                  <>
                  <Nav.Link href="/mypage">MYPAGE</Nav.Link>
                  <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
                </>
              )}
            </>
            ) : (
              <Nav.Link href="/login">LOGIN/JOIN</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
