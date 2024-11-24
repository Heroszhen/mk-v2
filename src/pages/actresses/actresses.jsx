import React, { useState, useEffect } from 'react';
import './actresses.scss';
import useActressesStore, {getActresses} from '../../store/actressesStore';
import parse from 'html-react-parser';

const Actresses = (props) => {
    const [actressIndex, setActressIndex] = useState(0);
    const {actresses} = useActressesStore();
console.log(actresses)
    useEffect(() => {
        getActresses();
    }, []);

    return (
        <>
            <section id="actresses" data-page="main">
                <section className="title h2 text-center">沉鱼落雁，闭月羞花</section>
                <section className="container mt-4">
                    <div className="row">
                        <section className="col-md-9 scrollbar" id="list-actresses">
                            {
                                actresses.map((actress, key) => {
                                    return (
                                        <article className='actress' key={key} onClick={()=>setActressIndex(key)}>
                                            <div className="wrap-photo">
                                                <img src={actress.photourl} alt="" />
                                            </div>
                                            <div className="wrap-info">
                                                <h4 className="actress-name">{actress.name}</h4>
                                                <div className="description">
                                                    {parse(actress.description)}
                                                </div>
                                                <div className="mt-3 detail">
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
                                <div id="carouselExample" className="carousel slide">
                                <div className="carousel-inner">
                                    {
                                        actresses[actressIndex].mkphotos.map((photo, key) => {
                                            return (
                                            <div className={key===0 ? "carousel-item active" : 'carousel-item'} key={key}>
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
                            }
                        </section>
                    </div>
                </section>
            </section>
        </>
    )
}
export default Actresses;