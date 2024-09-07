import React, {useEffect, useState} from 'react';
import "./player.scss";
import { getRequestHeaders } from '../../services/utils';
import parse from 'html-react-parser';
import moment from "moment";
import { getEnv } from '../../services/utils';

const Player = (props) => {
    const [video, setVideo] = useState(null);

    window.scrollTo(0, 0);

    useEffect(() => {
        let controller = new AbortController();
        (async ()=>{
            const env = await getEnv();
            fetch(`${env.VITE_API_URL}/mk/videos/video/${props.videoId}`, {
                signal: controller.signal,
                headers: getRequestHeaders(env)
            })
            .then(response => {
                if (response.status === 404) {
    
                } else {
                    return response.json()
                }
            })
            .then(response => {setVideo(response.data);});
        })();
        

        return () => {
            controller.abort;
        }
    }, []);

    const checkVideoType2 = (videoUrl) => {
        if (videoUrl.includes('amazon') || videoUrl.includes('aweme'))return 'video';
        if (videoUrl.includes('douyin'))return 'iframe';
        return 'extern';
    }

    const getDouyinVideoUrl = (url) => {
        const regex = /\d*$/;
        const found = url.match(regex);
        if (found !== null) {
            return `https://open.douyin.com/player/video?vid=${found[0]}&autoplay=1`;
        }

        return '';
    }

    const getShortvideoSrc = (url) => {
        let src = url + "?rel=0&autoplay=1&controls=0&loop=1";
        src += "&playlist=" + video.video_id;
        return src;
    }

    return (
        <section id="player-video">
            {video !== null &&
                <section id="container-video">
                    <div className='wrap-video' data-video-type={video.videotype}>
                        {(video.videotype===1 || video.videotype == 4) &&
                            parse(video.videourl)
                        }
                        {video.videotype===2 && checkVideoType2(video.videourl) === 'video' &&
                            <video width="300" height="200" id="video1" controls>
                                <source src={video.videourl} type="video/mp4" />
                                <source src="movie.ogg" type="video/ogg" />
                                <track
                                    src="captions_en.vtt"
                                    kind="captions"
                                    srcLang="en"
                                    label="english_captions"
                                />
                                <track
                                    src="captions_es.vtt"
                                    kind="captions"
                                    srcLang="es"
                                    label="spanish_captions"
                                />
                            </video>
                        }
                        {video.videotype===2 && checkVideoType2(video.videourl) === 'iframe' &&
                            <iframe
                                src={getDouyinVideoUrl(video.videourl)}
                                referrerPolicy="unsafe-url"
                                allowFullScreen
                                title=""
                                id="iframe-open-douyin"
                            ></iframe>
                        }
                        {video.videotype===3 &&
                            <a href={video.siteurl} target="_blank">
                                <img src={video.photourl} alt="" />
                            </a>
                        }
                        {video.videotype===5 &&
                            <iframe
                                width="352"
                                height="626"
                                src={getShortvideoSrc()}
                                title=""
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                autoplay
                                allowFullScreen
                                style="width:352px;height:621px;border-radius:12px;"
                            />
                        }
                    </div>
                    <div className='fst-italic p-2 text-black-50 text-center'>
                        Si la vidéo ne s'affiche pas, aller sur le site d'origine
                    </div>
                    <div className='wrap-icons'>
                        <a href={video.siteurl} target='__blank' className="wrap" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Site d'origine">
                            <i className="bi bi-box-arrow-right"></i>
                        </a>
                        <div className="wrap">
                            <i className="bi bi-link-45deg"></i>
                        </div>
                        <div className="wrap">
                            <i className="bi bi-arrow-counterclockwise"></i>
                        </div>
                    </div>
                    <div className="video-title fw-bold pt-1 ps-3 pe-3 fs-4">
                        {video.name}
                    </div>
                    <div className="video-actress pt-1 ps-3 pe-3">
                        {video.actressname}
                    </div>
                    <div className="video-actress pt-1 ps-3 pe-3 small">
                        {moment(video.created).format('DD/MM/YYYY')}
                    </div>
                    {video.description !==null &&
                        <div className="video-description">
                            {parse(video.description)}
                        </div>
                    }
                </section>
            }
        </section>
    );
}
export default Player;