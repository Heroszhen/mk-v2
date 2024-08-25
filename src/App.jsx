import 'bootstrap-icons/font/bootstrap-icons.css' ;
import './App.scss'
import { Routes, Route } from "react-router-dom";
import { useRef } from 'react';

import Home from './pages/home/Home.jsx';
import Videos from './pages/videos/Videos.jsx';
import Photos from './pages/photos/Photos.jsx';
import Nav from './components/nav/Nav.jsx';

function App() {
  const navRef = useRef(null);

  const toogleNav = () => {
    console.log()
  }

  return (
    <>
      <div id="wrap-btn-nav" className='pointer bg-transparent'>
        <i className="bi bi-list bg-transparent" onClick={() => navRef.current.classList.toggle('open')}></i>
      </div>
      <Nav ref={navRef} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/photos" element={<Photos />} />
      </Routes>
    </>
  )
}

export default App
