import {create} from "zustand";
import { getRequestHeaders } from "../services/utils";
import { getEnv } from "../services/utils";

const useVideosStore = create((set, get) => ({
    videos: [],
    page: 1,
    itemsByPage: 6,
    total: 0,
    canSearch: true,
    setPage: (page) => {set((state) => ({page: page}))},
    resetVideos: () => {set((state) => ({videos: []}))},
    searchVideos: async (keywords, page) => {
        set((state) => ({canSearch: false, page: page}));

        const env = await getEnv();
        fetch(`${env.VITE_API_URL}/mk/videos/search?key=${keywords}&page=${get().page}`, {
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