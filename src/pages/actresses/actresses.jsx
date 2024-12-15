import React, { useState, useEffect, useRef } from 'react';
import './actresses.scss';
import useActressesStore, {getActresses} from '../../store/actressesStore';
import parse from 'html-react-parser';
import moment from "moment";
import { isMobile } from '../../services/utils';

const Actresses = (props) => {
    const [actressIndex, setActressIndex] = useState(0);
    const {actresses} = useActressesStore();
    const listRef = useRef([]);
    const [sectionDetail, setSectionDetail] = useState(false);
    const [detailPhotoIndex, setDetailPhotoIndex] = useState(null);
    const maskRef = useRef(null);
    const imageRef= useRef(null);
    const wrapBigImageRef = useRef(null);
    const bigImageRef = useRef(null);

    useEffect(() => {
        getActresses();
    }, []);

    useEffect(() => {
        listRef.current.forEach(item => item?.classList.remove('active'));
        listRef.current[0]?.classList.add('active');
    }, [actressIndex]);

    const changeActress = (index) => {
        listRef.current = [];
        setActressIndex(index)
    }

    const switchMask = (action) => {
        if (isMobile() == true) {
            return;
        }
        if (action == 1) {
            //hover
            maskRef.current.classList.remove('d-none');
            wrapBigImageRef.current.classList.remove('d-none');
        } else {
            //leave
            maskRef.current.classList.add('d-none');
            wrapBigImageRef.current.classList.add('d-none');
        }
    }

    const moveMouse = (e) => {
        if (isMobile() === true) return;
        let clientRect = imageRef.current.getBoundingClientRect();
        let top = Math.ceil(clientRect.top); //y->vertical
        let left = Math.ceil(clientRect.left); //x -> horizontal
        let width_image = imageRef.current.clientWidth;
        let height_image = imageRef.current.clientHeight;
        if (
            e.clientY < top ||
            e.clientY > top + height_image ||
            e.clientX < left ||
            e.clientX > left + width_image
        ) {
            return;
        }

        let top2 = e.clientY - top - 50;
        if (top2 < 0) top2 = 0;
        if (e.clientY + 50 > top + height_image) top2 = height_image - 100;
        let left2 = e.clientX - left - 50;
        if (left2 < 0) left2 = 0;
        if (e.clientX + 50 > left + width_image) left2 = width_image - 100;
        maskRef.current.style.top = top2 + "px";
        maskRef.current.style.left = left2 + "px";
        let per_width = (e.clientX - left) / width_image;
        let per_height = (e.clientY - top) / height_image;

        //big image
        let half_wrap_width = wrapBigImageRef.current.clientWidth / 2;
        let half_wrap_height = wrapBigImageRef.current.clientHeight / 2;
        let bigwidth = per_width * bigImageRef.current.clientWidth;
        let bigheight = per_height * bigImageRef.current.clientHeight;
        bigImageRef.current.style.marginLeft = half_wrap_width - bigwidth + "px";
        bigImageRef.current.style.marginTop = half_wrap_height - bigheight + "px";
    }

    return (
        <>
            <section id="actresses" data-page="main">
                <section className="title text-30 text-center">沉鱼落雁，闭月羞花</section>

                <section className="container mt-4">
                    <div className="row">
                        <section className="col-md-9 scrollbar" id="list-actresses">
                            {
                                actresses.map((actress, key) => {
                                    return (
                                        <article className='actress' key={key} onClick={()=>changeActress(key)}>
                                            <div className="wrap-photo">
                                                <img src={actress.photourl} alt="" />
                                            </div>
                                            <div className="wrap-info">
                                                <h4 className="actress-name">{actress.name}</h4>
                                                <div className="description">
                                                    {parse(actress.description)}
                                                </div>
                                                <div className="mt-3 detail" onClick={()=>setSectionDetail(true)}>
                                                    <i className="bi bi-chevron-double-right"></i>
                                                    <i className="bi bi-chevron-double-right"></i>
                                                    <i className="bi bi-chevron-double-right me-2"></i>
                                                    Détails
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })
                            }
                        </section>
                        <section className="col-md-3">
                            {actresses.length > 0 &&
                            <div>
                                <h5 className="text-center mb-2">{actresses[actressIndex].name}</h5>
                                <div id="carouselExample" className="carousel slide">
                                    <div className="carousel-inner">
                                        {
                                            actresses[actressIndex].mkphotos.map((photo, key) => {
                                                return (
                                                    <div 
                                                        className={key===0 ? "carousel-item active" : 'carousel-item'} 
                                                        key={key}
                                                        ref={(el) => (listRef.current[key] = el)}
                                                    >
                                                        <img src={photo.photourl} className="d-block w-100" alt="..." />
                                                    </div>
                                                );
                                            })

                                        }
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                            }
                        </section>
                    </div>
                </section>

                {sectionDetail === true &&
                    <section className="position-fixed vh-100 vw-100 top-0 left-0 zindex-9999 bg-body-secondary flex-center-center p-2">
                        <div className='container position-relative z-w-98 z-h-95 overflow-y-auto scrollbar bg-white rounded-4 pb-2'>
                            <div className='row'>
                                <div className="col-12 text-end">
                                    <i className="bi bi-x pointer text-30 hover:color-red" onClick={()=>{setSectionDetail(false), setDetailPhotoIndex(null)}}></i>
                                </div>
                                <div className='col-md-9 mb-2'>
                                    <h3 className='text-center'>{actresses[actressIndex].name}</h3>
                                    <div className='d-flex justify-content-start w-100 overflow-x-auto scrollbar mb-3 p-1'>
                                        {
                                            actresses[actressIndex].mkphotos.map((photo, key) => {
                                                return (
                                                    <img 
                                                        className='height-80 w-auto me-2 pointer' 
                                                        key={key}
                                                        src={photo.photourl}
                                                        onClick={() => setDetailPhotoIndex(key)}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='container'>
                                        <div className='row justify-content-start'>
                                            <div className='col-md-10 col-lg-8'>
                                                <div 
                                                    className="wrap-photo position-relative"
                                                    onMouseEnter={() => switchMask(1)}
                                                    onMouseLeave={() => switchMask(2)}
                                                    onMouseMove={(e) => moveMouse(e)}
                                                >
                                                    {detailPhotoIndex !== null &&
                                                        <img 
                                                            src={actresses[actressIndex].mkphotos[detailPhotoIndex].photourl} 
                                                            alt="" 
                                                            ref={imageRef}
                                                        />
                                                    }
                                                    <div 
                                                        id="mask" 
                                                        ref={maskRef}
                                                        className="position-absolute zindex-100 width-100 height-100 opacity-6 bg-color-yellow cursor-move d-none"
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-3'>
                                    <img src={actresses[actressIndex].photourl}/>
                                    <div className='mt-2'>
                                        <span className='fw-bold me-2'>Née :</span>
                                        {moment(actresses[actressIndex].birthday).format('DD/MM/YYYY')}
                                    </div>
                                    <div className='mt-2 mb-4'>
                                        <span className='fw-bold me-2'>Pays :</span>
                                        {actresses[actressIndex].country}
                                    </div>
                                    {parse(actresses[actressIndex].description)}
                                </div>
                            </div>
                        </div>
                        <div 
                            id="wrap-big-image" 
                            ref={wrapBigImageRef}
                            className="position-fixed zindex-100 zp-top-80 zp-right-10 w-50 h-75 overflow-hidden bg-white d-none"
                        >
                            {detailPhotoIndex !== null &&
                                <img 
                                    src={actresses[actressIndex].mkphotos[detailPhotoIndex].photourl} 
                                    alt="" 
                                    ref={bigImageRef}
                                    className="vw-100"
                                />
                            }
                        </div>
                    </section>
                } 
            </section>
        </>
    )
}
export default Actresses;