import React, {useEffect, useState, useRef} from 'react';
import "./player.scss";
import { getRequestHeaders } from '../../services/utils';
import parse from 'html-react-parser';
import moment from "moment";
import { getEnv, copyToClipboard } from '../../services/utils';
import { Tooltip } from 'react-tooltip'
import { useLocation } from 'react-router-dom';

const Player = (props) => {
    const [video, setVideo] = useState(null);
    const location = useLocation();
    const wrapVideoRef = useRef();
    window.scrollTo(0, 0);

    useEffect(() => {
        let controller = new AbortController();
        (async ()=>{
            const env = await getEnv();
            fetch(`${env.VITE_API_URL}/videos/video/${props.videoId}`, {
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

    const rotateVideo = () => {
        const wrap = wrapVideoRef.current;
        const wrapRect = wrap.getBoundingClientRect();
        const video = wrap.querySelector('video') || wrap.querySelector('iframe');
        let videoRect = video.getBoundingClientRect();
        if (video.dataset.width === undefined) {
            video.dataset.width = parseInt(videoRect.width);
            video.dataset.height = parseInt(videoRect.height);
        }

        console.log(wrapRect, videoRect)
        let angle = video.dataset.angle === undefined ? 0 : parseInt(video.dataset.angle);
        angle = angle === 360 ? 90 : angle + 90;
        video.style.transform = "rotate(" + angle + "deg)";
        video.dataset.angle = angle;
        if ([90, 270].includes(angle)) {
            video.style.width = wrapRect.height + "px";
            video.style.height = wrapRect.width + "px";
        } else {
            video.style.width = video.dataset.width + "px";
            video.style.height = video.dataset.height + "px";
        }
        videoRect = video.getBoundingClientRect();console.log(videoRect)
        if (videoRect.top > 0) {
            video.style.marginTop = `-${videoRect.top}px`;
        } else {
            video.style.marginTop = `0px`;
        }
    }

    return (
        <section id="player-video">
            {video !== null &&
                <section id="container-video">
                    <div className='wrap-video' data-video-type={video.videotype} ref={wrapVideoRef}>
                        {(video.videotype===1 || video.videotype == 4) &&
                            parse(video.videourl)
                        }
                        {video.videotype===2 && checkVideoType2(video.videourl) === 'video' &&
                            <video width="300" height="200" id="video" controls>
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
                        <a href={video.siteurl} target='__blank' className="wrap" data-tooltip-id="siteurl-tooltip" data-tooltip-content="site d'origine" data-tooltip-place="bottom">
                            <i className="bi bi-box-arrow-right"></i>
                        </a>
                        <Tooltip id="siteurl-tooltip" />

                        <div 
                            className="wrap" 
                            data-tooltip-id="lien-tooltip" data-tooltip-content="Lien" 
                            data-tooltip-place="bottom" 
                            onClick={()=>copyToClipboard(`${window.location.protocol}//${window.location.hostname}${window.location.port === '' ? '/' : ':' + window.location.port}${location.pathname}`)}
                        >
                            <i className="bi bi-link-45deg"></i>
                        </div>
                        <Tooltip id="lien-tooltip" />

                        <div 
                            className={[1, 5].includes(video.videotype) ? 'wrap' : 'd-none'}
                            data-tooltip-id="rotate-tooltip" data-tooltip-content="Rotation" 
                            data-tooltip-place="bottom"
                            onClick={()=>rotateVideo()}
                        >
                            <i className="bi bi-arrow-counterclockwise"></i>
                        </div>
                        <Tooltip id="rotate-tooltip" />
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