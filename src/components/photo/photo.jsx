import React, {useEffect} from 'react';
import './photo.scss';
import { getPhotoDimensions } from '../../services/utils';

const Photo = (props) => {
    useEffect(() => {
        (async () => {
            let a = await getPhotoDimensions(props.photoUrl);
            console.log(a)
        })();
    }, []);

    return (
        <section id="big-photo">
            <img src={props.photoUrl} alt="" onDoubleClick={() => props.setPhotoUrl(null)}/>
        </section>
    );
}

export default Photo;