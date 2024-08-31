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
        <section id="big-photo" onDoubleClick={() => props.setPhotoUrl(null)}>
            <Magnifier src={props.photoUrl} width={width} height={height} />;
        </section>
    );
}
export default Photo;