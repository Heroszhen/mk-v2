import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './onephoto.scss';
import Photo from '../../components/photo/Photo';
import { getEnv, getRequestHeaders } from '../../services/utils';

const OnePhoto = (props) => {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        (async ()=>{
            const env = await getEnv();
            const controller = new AbortController();
            fetch(`${env.VITE_API_URL}/photos/photo/${id}`, {
                signal: controller.signal,
                headers: getRequestHeaders(env)
            })
            .then(response => {
                if (response.status === 404) {
    
                } else {
                    return response.json()
                }
            })
            .then(response => {setPhoto(response.data);});
        })();
    }, []);

    return (
        <section id="one-photo">
            {photo !== null && <Photo photoUrl={photo.photourl} />}
        </section>
    );
}
export default OnePhoto;