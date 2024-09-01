import {create} from "zustand";
import { getRequestHeaders } from "../services/utils";

const useVideosStore = create((set, get) => ({
    videos: [],
    page: 1,
    itemsByPage: 0,
    total: 0,
    canSearch: true,
    setPage: (page) => {set((state) => ({page: page}))},
    resetVideos: () => {set((state) => ({videos: []}))},
    searchVideos: (keywords, page) => {
        set((state) => ({canSearch: false, page: page}));

        fetch(`${import.meta.env.VITE_API_URL}/mk/videos/search?key=${keywords}&page=${get().page}`, {
            headers: getRequestHeaders()
        })
        .then(response => {
            set((state) => ({canSearch: true}));
            return response.json();
        })
        .then(response => {
            set((state) => ({
                videos: [...get().videos, ...response.data],
                itemsByPage: response.itemsByPage,
                total: response.total,
            }));
        });
    }
}));
export default useVideosStore;