import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home/Home.jsx';
import Videos from '../pages/videos/Videos.jsx';
import Photos from '../pages/photos/Photos.jsx';
import Video from '../pages/video/Video.jsx';
import NotFound from '../pages/notfound/NotFound.jsx';
import OnePhoto from '../pages/onephoto/OnePhoto.jsx';
import Contact from '../pages/contact/contact.jsx';
import Actresses from '../pages/actresses/actresses.jsx';
import Maintenance from '../pages/maintenance/maintenance.jsx';
import MaintenanceGuard from './MaintenanceGuard.jsx';

const RoutesWrapper = (props) => {
  return (
    <>
      <Routes>
        <Route element={<MaintenanceGuard />}>
            <Route path="/" element={<Home />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/video/:id" element={<Video />} />
            <Route path="/photos" element={<Photos windowWidth={props.windowWidth} />} />
            <Route path="/photo/:id" element={<OnePhoto />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/actrices" element={<Actresses />} />
        </Route>
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default RoutesWrapper;