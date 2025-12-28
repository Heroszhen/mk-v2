import React, { useState, useEffect } from 'react';
import "./videos.scss";
import Search from '../../components/search/Search';
import useVideosStore from '../../store/videosStore';
import { Link } from 'react-router-dom';
import moment from "moment";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const Videos = (props) => {
    const {videos, itemsByPage, total, page, searchVideos, keywordsInStore} = useVideosStore();
    const [keywords, setKeywords] = useState(keywordsInStore);
    const [currentPage, setCurrentPage] = useState(page);
    const [enter, setEnter] = useState(true);
    
    const searchDatas = (key) => {
        searchVideos(key, 1);
    }

    useEffect(() => {
        if (enter === true) {
            setEnter(false);
            if (videos.length === 0)searchVideos(keywords, currentPage);
        } else {
            searchVideos(keywords, currentPage);
        }
    }, [currentPage]);
    
    return (
        <section id="videos" data-page="main">
            <Search keywords={keywords} setKeywords={setKeywords} setCurrentPage={setCurrentPage} searchDatas={searchDatas} />
            <section className='wrap-videos pt-4'>
                <div className="container">
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
                    <ResponsivePagination
                        current={currentPage}
                        total={Math.ceil(total / itemsByPage)}
                        onPageChange={setCurrentPage}
                        maxWidth={400}
                    />
                </div>
            </section>
        </section>
    )
}
export default Videos;