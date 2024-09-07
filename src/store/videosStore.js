import {create} from "zustand";
import { getRequestHeaders } from "../services/utils";
import { getEnv } from "../services/utils";

const useVideosStore = create((set, get) => ({
    videos: [],
    page: 1,
    itemsByPage: 6,
    total: 0,
    canSearch: true,
    abortController: null,
    setPage: (page) => {set((state) => ({page: page}))},
    resetVideos: () => {set((state) => ({videos: []}))},
    searchVideos: async (keywords, page) => {console.log(keywords, page)
        if (get().abortController !== null)get().abortController.abort;

        set((state) => ({canSearch: false, page: page, abortController: new AbortController()}));

        const env = await getEnv();
        fetch(`${env.VITE_API_URL}/mk/videos/search?key=${keywords}&page=${get().page}`, {
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
        });
    }
}));
export default useVideosStore;