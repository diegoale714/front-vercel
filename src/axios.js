
import axios from "axios";

const instance = axios.create({
    baseURL: "https://vercel-back.onrender.com",
    
});

export default instance;
