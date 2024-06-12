import config from '../lib/config.js';
export const checkAvatarUrl = (url) => {

    if (!url) return null;
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `${config.domain}/${url}`;
};
