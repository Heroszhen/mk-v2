import React from 'react';
import './notfound.scss';7
import photo from '../../assets/notfound.gif';

const NotFound = (props) => {
    return (
        <section id="not-found" data-page="main">
            <div className='container'>
                <div className="row justify-content-center">
                    <div className="col-12 text-center fs-1 mb-5">
                        Egaré?
                    </div>
                    <div className="col-12 col-md-8 col-lg-4">
                        <img src={photo} alt='' />
                    </div>
                </div>
            </div>
        </section>
    );
}
export default NotFound;