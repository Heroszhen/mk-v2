import 'bootstrap-icons/font/bootstrap-icons.css' ;
import './App.scss'
import { Routes, Route, useNavigate } from "react-router-dom";
import { useRef } from 'react';

import Home from './pages/home/Home.jsx';
import Videos from './pages/videos/Videos.jsx';
import Photos from './pages/photos/Photos.jsx';
import Nav from './components/nav/Nav.jsx';
import Video from './pages/video/Video.jsx';
import NotFound from './pages/notfound/NotFound.jsx';
import Footer from './components/footer/Footer.jsx';

function App() {
  const navRef = useRef(null);
  const navigate = useNavigate();

  return (
    <>
      <div id="wrap-btn-nav" className='pointer bg-transparent'>
        <i className="bi bi-list bg-transparent" onClick={() => navRef.current.classList.toggle('open')}></i>
      </div>
      <Nav ref={navRef} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/video/:id" element={<Video />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div id="history-router-back" className='btn-vouge' onClick={()=>navigate(-1)}>
        <i className="bi bi-arrow-left"></i>
      </div>
      <Footer />
    </>
  )
}

export default App
