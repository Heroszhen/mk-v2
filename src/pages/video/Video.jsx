import React, { useState, useEffect } from 'react';
import Player from '../../components/player/Player';
import { useParams, useNavigate } from 'react-router-dom';
import './video.scss';
import useVideosStore, { getRelatedVideos } from '../../store/videosStore';

const Video = (props) => {
    const { id } = useParams();
    const [related, setRelated] = useState([]);
    const navigate = useNavigate();
    const {relatedVideos} = useVideosStore();

    useEffect(() => {
        getRelatedVideos(id);
    }, [id]);

    return (
        <section id="video" data-page="main">
            <Player videoId={id} />
            <section className="mt-5 ps-2">
            {
                relatedVideos.map((video, key) => {
                    return (
                        <div className="video-related" key={key} onClick={()=>navigate('/video/' + video.id)}>
                            <div>
                                <img src={video.photourl} />
                            </div>
                            <div className="description">
                                <div className="title">{video.name}</div>
                                <div className="actress-name">{video.actressname}</div>
                            </div>
                        </div>
                    )
                })
            }
            </section>
        </section>
    );
}
export default Video;