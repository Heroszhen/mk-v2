import React, {useEffect, useState} from 'react';
import "./video.scss";

const Video = (props) => {
    const [video, setVideo] = useState(null);

    useEffect(() => {
        let controller = new AbortController();

        return () => {
            controller.abort();
        }
    }, []);

    return (
        <section id="player-video">

        </section>
    );
}
export default Video;