import React, { useState, useEffect } from 'react';
import "./videos.scss";
import Search from '../../components/search/Search';
import useVideosStore from '../../store/videosStore';
import { Link } from 'react-router-dom';
import moment from "moment";
import Paginator from 'react-hooks-paginator';

const Videos = (props) => {
    const {videos, itemsByPage, total, page, canSearch, searchVideos} = useVideosStore();
    const [keywords, setKeywords] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(page);
    const [enter, setEnter] = useState(false);
    
    const searchDatas = (terms) => {

    }

    useEffect(() => {
        if (videos.length === 0) {
            searchVideos(keywords, currentPage);
            setEnter(true);
        }
    }, []);

    useEffect(() => {
        if (enter === true)searchVideos(keywords, currentPage);
    }, [currentPage]);
    
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
                                            <div>{moment(video.created).format('DD/MM/YYYY')}</div>
                                        </Link>
                                    </article>
                                );
                            })
                        }
                    </div>
                </div>
                <div className='wrap-paginator'>
                    <Paginator
                        totalRecords={Math.ceil(total / itemsByPage)}
                        pageLimit={4}
                        pageNeighbours={1}
                        setOffset={setOffset}
                        currentPage={page}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </section>
        </section>
    )
}
export default Videos;