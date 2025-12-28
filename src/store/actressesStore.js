import {create} from "zustand";
import { getRequestHeaders, getEnv } from "../services/utils";

const useActressesStore = create((set, get) => ({
    actresses: [],
    abortController: null,
}));
export default useActressesStore;

export const getActresses = async () => {
    if (useActressesStore.getState().abortController !== null)useActressesStore.getState().abortController.abort;
    useActressesStore.setState((state) => ({
        actresses: [],
        abortController: new AbortController(),
    }));

    const env = await getEnv();
    fetch(`${env.VITE_API_URL}/actresses`, {
        signal: useActressesStore.getState().abortController.signal,
        headers: getRequestHeaders(env)
    })
    .then(response => {
        if (response.status !== 404) {
            return response.json()
        }
    })
    .then(response => {
        useActressesStore.setState((state) => ({actresses: response.allactresses}));
    });
};