import {create} from "zustand";
import { getRequestHeaders, getEnv, toggleLoader } from "../services/utils";

const useVideosStore = create((set, get) => ({
    videos: [],
    keywordsInStore: '',
    page: 1,
    itemsByPage: 6,
    total: 0,
    canSearch: true,
    abortController: null,
    relatedVideos: [],
    setPage: (page) => {set((state) => ({page: page}))},
    resetVideos: () => {set((state) => ({videos: []}))},
    searchVideos: async (keywords, page) => {
        toggleLoader();

        if (get().abortController !== null)get().abortController.abort;

        set((state) => ({
            canSearch: false, 
            page: page, 
            abortController: new AbortController(),
            keywordsInStore: keywords
        }));

        const env = await getEnv();
        fetch(`${env.VITE_API_URL}/videos/search?key=${keywords}&page=${get().page}`, {
            signal: get().abortController.signal,
            headers: getRequestHeaders(env)
        })
        .then(response => {
            set((state) => ({canSearch: true}));
            return response.json();
        })
        .then(response => {
            set((state) => ({
                videos: response.data,
                itemsByPage: response.itemsByPage,
                total: response.total,
            }));
            toggleLoader(false);
        }).catch(e => toggleLoader(false));
    }
}));
export default useVideosStore;

export const getRelatedVideos = async (videoId) => {
    if (useVideosStore.getState().abortController !== null)useVideosStore.getState().abortController.abort;
    useVideosStore.setState((state) => ({
        relatedVideos: [],
        abortController: new AbortController(),
    }));

    const env = await getEnv();
    fetch(`${env.VITE_API_URL}/videos/video/${videoId}/related`, {
        signal: useVideosStore.getState().abortController.signal,
        headers: getRequestHeaders(env)
    })
    .then(response => {
        if (response.status !== 404) {
            return response.json()
        }
    })
    .then(response => {useVideosStore.setState((state) => ({relatedVideos: response.data}));});
}