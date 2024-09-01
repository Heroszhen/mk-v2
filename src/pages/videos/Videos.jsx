import React, { useState, useEffect } from 'react';
import "./videos.scss";
import Search from '../../components/search/Search';
import useVideosStore from '../../store/videosStore';
import { Link } from 'react-router-dom';
import moment from "moment";

const Videos = (props) => {
    const {videos, itemsByPage, total, page, canSearch, searchVideos} = useVideosStore();
    const [keywords, setKeywords] = useState('');
    
    const searchDatas = (terms) => {

    }

    useEffect(() => {
        searchVideos(keywords, 1);
    }, []);
    
    return (
        <section id="videos" data-page="main">
            <Search setKeywords={setKeywords} searchDatas={searchDatas} />
            <section className='wrap-videos pt-5'>
                <div className="container-fluid">
                    <div className="row">
                        {
                            videos.map((video, key) => {
                                return (
                                    <article className='col-6 col-md-4 text-center' key={key}>
                                        <Link to={'/video/' + video.id}  className="wrap text-start">
                                            <img src={video.photourl} />
                                            <div className='fw-bold mt-2'>{video.name}</div>
                                            <div>{video.actressname}</div>
                                            <div>{moment().format('DD/MM/YYYY')}</div>
                                        </Link>
                                    </article>
                                );
                            })
                        }
                    </div>
                </div>
            </section>
        </section>
    )
}
export default Videos;