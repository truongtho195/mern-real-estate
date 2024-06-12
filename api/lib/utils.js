export const checkAvatarUrl = (url,domain)=>{
    if(!url) return url;
    if(url.startsWith('http://') || url.startsWith('https://'))
    {
        return url;
    }
    return `${domain}/${url}`;
}