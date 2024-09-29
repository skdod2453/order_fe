import { Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/Login.jsx'
import Join from './pages/Join.jsx'
import Home from './pages/Home.jsx'
import Header from './components/Header/Header.jsx'
import Detail from './pages/Detail.jsx'
import Map from './pages/Map.jsx';

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
        <Route path = '/detail/:restaurantId' element = { <Detail />} />
      </Routes>
    </>
  );
}

export default App;
