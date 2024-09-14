import React, { forwardRef, useEffect, useState } from 'react';
import "./nav.scss";
import { Link } from "react-router-dom";

const Nav = forwardRef((props, ref) => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        // Listen for the 'beforeinstallprompt' event
        const handleBeforeInstallPrompt = (e) => {
          e.preventDefault();
          // Store the event so it can be triggered later
          setDeferredPrompt(e);
          setIsInstallable(true); // Show the install button
        };
    
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
        // Clean up the event listener
        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      }, []);
    
      const handleInstallClick = () => {
        if (deferredPrompt) {
          // Show the install prompt
          deferredPrompt.prompt();
    
          // Wait for the user to respond to the prompt
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the install prompt');
            } else {
              console.log('User dismissed the install prompt');
            }
            // Clear the saved prompt
            setDeferredPrompt(null);
          });
        }
      };

    return (
        <nav id="nav" ref={ref} >
            <div id='wrap-close-nav' className="item">
                <i className="bi bi-x-lg bg-white pointer" onClick={()=> ref.current.classList.remove('open')}></i>
            </div>
            <Link to="/" className="route item">Accueil</Link>
            <Link to="/videos" className="route item">Vidéos</Link>
            <Link to="/photos" className="route item">Photos</Link>
            <Link className="route item">Actrices</Link>
            {/* {isInstallable && ( */}
                <div onClick={handleInstallClick} className="route item">Installer</div>
            {/* )} */}
        </nav>
    )
})
export default Nav;