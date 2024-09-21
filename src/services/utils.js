import { getEnvFromStore } from "../store/envStore";

const STORAGE_NAME = "mk";

export const getEnv = async () => {
    return await getEnvFromStore();
}

export const getRequestHeaders = (options) => {
    return {
        'X-Requested-With': 'XMLHttpRequest',
        'X-Action-Status': options.VITE_ACTION_STATUS
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

export async function copyToClipboard(value) {
    let input = document.createElement("input");
    document.body.appendChild(input);
    input.value = value;
    input.focus();
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);
    alert("Copié");

    //new API
    // try {
    //     await navigator.clipboard.writeText(text);
    //     console.log('Content copied to clipboard');
    // } catch (err) {
    //     console.error('Failed to copy: ', err);
    // }
}

export const toggleLoader = (open = true) => {
    const loader = document.getElementById('loader');
    if (open) {
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
}

// export const setStorage = (key, value) => {
//     let ob = localStorage.getItem(STORAGE_NAME) ?? {};
//     ob = JSON.parse(ob);
//     ob[key] = value;
//     localStorage.setItem(STORAGE_NAME, JSON.stringify(ob));
// }

// export const getStorage = (key) => {
//     let ob = localStorage.getItem(STORAGE_NAME);
//     if (ob === undefined)return null;

//     ob = JSON.parse(ob);
//     ob[key] = value;
//     localStorage.setItem(STORAGE_NAME, JSON.stringify(ob));
// }