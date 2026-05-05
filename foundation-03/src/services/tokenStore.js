const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';
const USER_KEY = 'user';

export const tokenstore = {
    getAccess: () => localStorage.getItem(ACCESS_KEY),
    getRefress: () => localStorage.getItem(REFRESH_KEY),
    getUser: () => {
        const raw = localStorage.getItem(USER_KEY)
        return raw ? JSON.parse(raw) : null
    },

    set: ({accessToken, refreshToken, user}) =>{
        if(accessToken) localStorage.setItem(ACCESS_KEY, accessToken);
        if(refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
        if(user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    clear: () => {
        localStorage.removeItem(ACCESS_KEY);
        localStorage.removeItem(REFRESH_KEY);
        localStorage.removeItem(USER_KEY);
    }
}