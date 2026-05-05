import { api } from "./api";
import { tokenstore } from "./tokenStore";


export const authService = {
    async register({name, email, password}) {
     const {data} = await api.post("/auth/register", {name, email, password});
     tokenstore.set(data);
     return data;
    },
    async login({email, password}){
        const {data} = await api.post("/auth/login", {email, password})
        tokenstore.set(data)
        return data;
    },
    async logout(){
        await api.post("/auth/logout")
        tokenstore.clear()
    },
    async getProfile(){
        const {data} = await api.get("/user/profile")
        return data.user
    }
};