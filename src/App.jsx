import 'bootstrap-icons/font/bootstrap-icons.css' ;
import './App.scss'
import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import loaderPhoto from './assets/amanda_cerny _dance.gif';
import RoutesWrapper from './routes/RoutesWrapper';

import Nav from './components/nav/Nav.jsx';
import Footer from './components/footer/Footer.jsx';

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
    if ('1' === import.meta.env.VITE_MAINTENANCE
      && !reactLocation.pathname.includes('maintenance')
    ) {
      navigate('/maintenance');
    }
  }, []);

  useEffect(() => {
    if (reactLocation.pathname.includes('/photo/') === true)setDisplay(false);
    else setDisplay(true);
    navRef.current.classList.remove('open');
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
      <RoutesWrapper windowWidth={windowWidth} />
      {display===true &&
        <div id="history-router-back" className='btn-vouge' onClick={()=>navigate(-1)}>
          <i className="bi bi-arrow-left"></i>
        </div>
      }
      {display===true &&
        <Footer />
      }

      <div id="loader" className="d-none">
        <img src={loaderPhoto} alt="" />
      </div>
    </>
  )
}

export default App
