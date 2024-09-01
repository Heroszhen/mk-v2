import React, { useState, useEffect } from 'react';
import "./videos.scss";
import Search from '../../components/search/Search';
import useVideosStore from '../../store/videosStore';

const Videos = (props) => {
    const {videos, itemsByPage, total, page, canSearch, searchVideos} = useVideosStore();
    const [keywords, setKeywords] = useState('');
    console.log(videos, itemsByPage, total, page, canSearch)
    const searchDatas = (terms) => {

    }

    useEffect(() => {
        searchVideos(keywords, 1);
    }, []);
    
    return (
        <section id="videos" data-page="main">
            <Search setKeywords={setKeywords} searchDatas={searchDatas} />
            <section className='wrap-videos'>

            </section>
        </section>
    )
}
export default Videos;