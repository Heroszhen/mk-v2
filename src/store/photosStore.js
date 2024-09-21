import {create} from "zustand";
import { getRequestHeaders, getEnv, toggleLoader } from "../services/utils";

const usePhotosStore = create((set, get) => ({
    photos: [],
    keywordsInStore: '',
    page: 1,
    itemsByPage: 20,
    total: 0,
    abortController: null,
    searchPhotos: async (keywords, page) => {
        toggleLoader();

        if (get().abortController !== null)get().abortController.abort;

        set((state) => ({
            canSearch: false, 
            page: page, 
            abortController: new AbortController(),
            keywordsInStore: keywords
        }));

        const env = await getEnv();
        fetch(`${env.VITE_API_URL}/photos/search?key=${keywords}&page=${get().page}`, {
            signal: get().abortController.signal,
            headers: getRequestHeaders(env)
        })
        .then(response => {
            set((state) => ({canSearch: true}));
            return response.json();
        })
        .then(response => {
            set((state) => ({
                photos: response.data,
                itemsByPage: response.itemsByPage,
                total: response.total,
            }));

            toggleLoader(false)
        }).catch(e => toggleLoader(false));
    }
}));
export default usePhotosStore;