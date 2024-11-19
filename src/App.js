import { Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/Login.jsx'
import Join from './pages/Join.jsx'
import Home from './pages/Home.jsx'
import Header from './components/Header/Header.jsx'
import Detail from './pages/Detail.jsx'
import Map from './pages/Map.jsx';
import Pay from './pages/Pay.jsx';
import MyPage from './pages/Mypage_Order.jsx'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path = '/' element = { <Login /> } />
        <Route path = '/login' element = { <Login /> } />
        <Route path = '/join' element = { <Join />} />
        <Route path = '/home' element = { <Home />} />
        <Route path = '/map' element = { <Map /> } />
        <Route path = '/pay' element = { <Pay /> } />
        <Route path = '/detail/:restaurantId' element = { <Detail />} />
        <Route path = '/mypage' element = { <MyPage />} />
      </Routes>
    </>
  );
}

export default App;
