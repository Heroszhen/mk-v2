import React, { useState, useEffect } from 'react';
import usePhotosStore from '../../store/photosStore';
import Search from '../../components/search/Search';

const Photos = (props) => {
    const {photos, itemsByPage, total, page, searchPhotos, keywordsInStore} = usePhotosStore();
    const [keywords, setKeywords] = useState(keywordsInStore);
    const [currentPage, setCurrentPage] = useState(page);
    const [enter, setEnter] = useState(true);

    useEffect(() => {
        if (enter === true) {
            setEnter(false);
            if (photos.length === 0)searchPhotos(keywords, currentPage);
        } else {
            searchPhotos(keywords, currentPage);
        }
    }, [currentPage]);

    const searchDatas = (key) => {
        // searchVideos(key, 1);
    }

    return (
        <section id="photos" data-page="main">
            <Search keywords={keywords} setKeywords={setKeywords} setCurrentPage={setCurrentPage} searchDatas={searchDatas} />
            <div className='container'>
                
            </div>
        </section>
    )
}
export default Photos;