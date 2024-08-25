import React, { forwardRef } from 'react';
import "./nav.scss";
import { Link } from "react-router-dom";

const Nav = forwardRef((props, ref) => {

    return (
        <nav id="nav" ref={ref} >
            <div id='wrap-close-nav' className="item">
                <i className="bi bi-x-lg bg-white pointer" onClick={()=> ref.current.classList.remove('open')}></i>
            </div>
            <Link to="/" className="route item">Accueil</Link>
            <Link to="/videos" className="route item">Vidéos</Link>
            <Link to="/photos" className="route item">Photos</Link>
            <Link className="route item">Actrices</Link>
        </nav>
    )
})
export default Nav;