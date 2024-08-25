import {create} from "zustand";

const useHomeStore = create((set, get) => ({
    photos: [[],[],[]],
    getPhotos: () => {
        for (let i = 0; i <= 2; i++) {
            if (get().photos[i].length === 0) {
                fetch(`${import.meta.env.VITE_API_URL}/mk/photos_by_page?page=${i + 1}`, {
                    headers: {'X-Requested-With': 'XMLHttpRequest'}
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
}));
export default useHomeStore;