export const getRequestHeaders = () => {
    return {
        'X-Requested-With': 'XMLHttpRequest',
        'X-Action-Status': import.meta.env.VITE_ACTION_STATUS
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