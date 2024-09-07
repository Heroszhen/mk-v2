import React, { useState, useEffect, useRef } from 'react';
import './home.scss';
import useHomeStore from '../../store/homeStore';
import Photo from '../../components/photo/Photo';
import { Link } from "react-router-dom";

const Home = (props) => {
    const {getPhotos, photos, getVideos, videos} = useHomeStore();
    const listRef = useRef([]);
    const [photoUrl, setPhotoUrl] = useState(null);

    useEffect(() => {
        getPhotos();
        getVideos();
        let localTimer2 = null;
        let localTimer = window.setInterval(() => {
            if (photos[0].length > 0 && photos[1].length > 0 && photos[2].length > 0) {
                clearInterval(localTimer);
                localTimer2 = scrollListPhotos();
            }
        }, 500)

        return () => {
            clearInterval(localTimer);
            clearInterval(localTimer2);
        };
    }, []);

    const scrollListPhotos = () => {
        return window.setInterval(() => {
            listRef.current.forEach((list, key) => {
                if (list !== null) {
                    if (key === 1 ){
                        if (list.scrollTop <= 0) {
                            list.scrollTop = list.scrollHeight - list.clientHeight;
                        }
                        list.scrollTop -= 2;
                    } else {
                        list.scrollTop += 2; 
                        if(list.scrollTop >= list.scrollHeight - list.clientHeight - 10)list.scrollTop = 0;
                    } 
                }
            });
        }, 30);
    }
    
    return (
        <>
            <section id="home" data-page="main">
                <section id="part1">
                    {
                        [0, 1, 2].map((n, key) => {
                            return (
                                <section className="list-photos" key={key} ref={(el) => (listRef.current[key] = el)} >
                                    {
                                        photos[n].reverse().map((photo, key2) => {
                                            return (
                                                <div key={key2} className="wrap-photo" onClick={() => setPhotoUrl(photo['photourl'])}>
                                                    <img src={photo['photourl']} alt="" />
                                                    <div className='actress-name'>
                                                        {photo.name !== null
                                                            ? photo.name
                                                            : photo.actress.name
                                                        }
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </section>
                            )
                        })
                    }
                </section>
                <section id="part2">
                    <div className='container'>
                        <div className='row'>
                            {
                                videos.map((video, key) => {
                                    return (
                                        <div className='col-6 col-md-4 mb-5 pointer' key={key}>
                                            <Link to={'/video/' + video.id}  className="wrap-video">
                                                <div>
                                                    <img src={video.photourl} alt="" />
                                                </div>
                                                <div className='fw-bold'>{video.name}</div>
                                                <div className='small'>{video.actressname}</div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
            </section>
            {photoUrl !== null &&
                <section className="wrap-component">
                    <Photo photoUrl={photoUrl} setPhotoUrl={setPhotoUrl} />
                </section> 
            }
        </>
    )
}
export default Home;