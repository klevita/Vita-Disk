import axios from "axios"
import store from "@/store";

export default axios.create({
    baseURL: 'http://45.131.41.20/api/v1/',
    headers: {'Authorization': `Bearer ${store.state.user.token}`}
});