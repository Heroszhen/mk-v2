import 'bootstrap-icons/font/bootstrap-icons.css' ;
import './App.scss'
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';

import Home from './pages/home/Home.jsx';
import Videos from './pages/videos/Videos.jsx';
import Photos from './pages/photos/Photos.jsx';
import Nav from './components/nav/Nav.jsx';
import Video from './pages/video/Video.jsx';
import NotFound from './pages/notfound/NotFound.jsx';
import Footer from './components/footer/Footer.jsx';
import OnePhoto from './pages/onephoto/OnePhoto.jsx';

function App() {
  const navRef = useRef(null);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const reactLocation = useLocation();
  const [display, setDisplay] = useState(true)

  window.addEventListener("resize", (e)=>{
    setWindowWidth(window.innerWidth);
  });

  useEffect(() => {
    if (reactLocation.pathname.includes('/photo/') === true)setDisplay(false);
    else setDisplay(true);
 }, [reactLocation]);

  return (
    <>
      {display===true &&
        <div id="wrap-btn-nav" className='pointer bg-transparent'>
          <i className="bi bi-list bg-transparent" onClick={() => navRef.current.classList.toggle('open')}></i>
        </div>
      }
      {display===true &&
        <Nav ref={navRef} />
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/video/:id" element={<Video />} />
        <Route path="/photos" element={<Photos windowWidth={windowWidth} />} />
        <Route path="/photo/:id" element={<OnePhoto />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {display===true &&
        <div id="history-router-back" className='btn-vouge' onClick={()=>navigate(-1)}>
          <i className="bi bi-arrow-left"></i>
        </div>
      }
      {display===true &&
        <Footer />
      }
    </>
  )
}

export default App
