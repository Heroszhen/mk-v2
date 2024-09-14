import {create} from "zustand";

const useEnvStore = create((set, get) => ({
    env: null,
    created: null
}));
export default useEnvStore;

export const getEnvFromStore = async () => {
    if (useEnvStore.getState().env !== null) {
        const now = new Date();
        if (now - useEnvStore.getState().created < 3600000)return useEnvStore.getState().env;
    }
    return await fetchEnv();
}

export const fetchEnv = async () => {
    try {
        let response = await fetch('/env.json');
        response = await response.json();
        useEnvStore.setState((state) => ({env: response, created: new Date()}))
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const setAction = (newStatus) => {
    if (useEnvStore.getState().env === null) return;

    let newEnv = useEnvStore.getState().env;
    newEnv.VITE_ACTION_STATUS = newStatus;
    useEnvStore.setState((state) => ({env: newEnv, created: new Date()}));
}