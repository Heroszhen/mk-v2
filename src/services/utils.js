import env from '../assets/env.json';
const STORAGE_NAME = "mk";

export const getRequestHeaders = () => {
    return {
        'X-Requested-With': 'XMLHttpRequest',
        'X-Action-Status': env.VITE_ACTION_STATUS
    };
}

export const getPhotoDimensions = (url) => {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = url;
        img.onload = () => {
            resolve({width: img.width, height: img.height});
        };        
    });
}


export const setStorage = (key, value) => {
    let ob = localStorage.getItem(STORAGE_NAME) ?? {};
    ob = JSON.parse(ob);
    ob[key] = value;
    localStorage.setItem(STORAGE_NAME, JSON.stringify(ob));
}

export const getStorage = (key) => {
    let ob = localStorage.getItem(STORAGE_NAME);
    if (ob === undefined)return null;

    ob = JSON.parse(ob);
    ob[key] = value;
    localStorage.setItem(STORAGE_NAME, JSON.stringify(ob));
}