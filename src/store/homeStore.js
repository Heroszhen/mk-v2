import {create} from "zustand";
import { getRequestHeaders } from "../services/utils";
import env from '../assets/env.json';

const useHomeStore = create((set, get) => ({
    photos: [[],[],[]],
    videos: [],
    getPhotos: () => {
        for (let i = 0; i <= 2; i++) {
            if (get().photos[i].length === 0) {
                fetch(`${env.VITE_API_URL}/mk/photos_by_page?page=${i + 1}`, {
                    headers: getRequestHeaders()
                })
                .then(response => response.json())
                .then(response => {
                    let photos = get().photos;
                    photos[i] = response.data;
                    set((state) => ({photos: photos}))
                });
            } 
        }
    },
    getVideos: () => {
        if (get().videos.length === 0) {
            fetch(`${env.VITE_API_URL}/mk/videos/new?result=6`, {
                headers: getRequestHeaders()
            })
            .then(response => response.json())
            .then(response => {
                set((state) => ({videos: response.data}))
            });
        } 
    }
}));
export default useHomeStore;