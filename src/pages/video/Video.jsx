import React from 'react';
import Player from '../../components/player/Player';
import { useParams } from 'react-router-dom';

const Video = (props) => {
    const { id } = useParams();

    return (
        <section id="video" data-page="main">
            <Player videoId={id} />
        </section>
    );
}
export default Video;