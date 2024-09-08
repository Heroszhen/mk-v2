import React, { useState, useEffect } from 'react';
import usePhotosStore from '../../store/photosStore';
import Search from '../../components/search/Search';
import Masonry from "react-responsive-masonry";
import './photos.scss';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const Photos = (props) => {
    const {photos, itemsByPage, total, page, searchPhotos, keywordsInStore} = usePhotosStore();
    const [keywords, setKeywords] = useState(keywordsInStore);
    const [currentPage, setCurrentPage] = useState(page);
    const [enter, setEnter] = useState(true);
    const [columnsCount, setColumnsCount] = useState(props.windowWidth > 767 ? 5 : 2);

    useEffect(() => {
        if (props.windowWidth > 992) {
            setColumnsCount(5);
        } else if (props.windowWidth > 767) {
            setColumnsCount(3);
        } else {
            setColumnsCount(2);
        }
    }, [props.windowWidth]);

    useEffect(() => {
        if (enter === true) {
            setEnter(false);
            if (photos.length === 0)searchPhotos(keywords, currentPage);
        } else {
            searchPhotos(keywords, currentPage);
        }
    }, [currentPage]);

    const searchDatas = (key) => {
        searchPhotos(key, 1);
    }

    return (
        <section id="photos" data-page="main">
            <Search keywords={keywords} setKeywords={setKeywords} setCurrentPage={setCurrentPage} searchDatas={searchDatas} />
            <div className='container pt-4'>
                <Masonry columnsCount={columnsCount} gutter="20px">
                    {
                        photos.map((photo, i) => (
                            <a className='wrap' key={i} href={'/photo/' + photo.id} target='__blank'>
                                <img src={photo.photourl} />
                                <div className='wrap-name'>
                                    {photo.name !== null
                                        ? photo.name
                                        : photo.actress.name
                                    }
                                </div>
                            </a>
                        ))
                    }
                </Masonry>

                <div className='wrap-paginator mt-5'>
                    <ResponsivePagination
                        current={currentPage}
                        total={Math.ceil(total / itemsByPage)}
                        onPageChange={setCurrentPage}
                        maxWidth={400}
                    />
                </div>
            </div>
        </section>
    )
}
export default Photos;