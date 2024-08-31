import React, {useEffect, useState} from 'react';
import './photo.scss';
import { getPhotoDimensions } from '../../services/utils';
import Magnifier from 'react18-image-magnifier';

const Photo = (props) => {
    const [width, setWidth] = useState('auto');
    const [height, setHeight] = useState('100%');

    useEffect(() => {
        (async () => {
            let result = await getPhotoDimensions(props.photoUrl);
        })();
    }, []);

    return (
        <section id="big-photo">
            <Magnifier src={props.photoUrl} width={width} height={height} onDoubleClick={() => props.setPhotoUrl(null)} />;
        </section>
    );
}

export default Photo;