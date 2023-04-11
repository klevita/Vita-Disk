import axios, { AxiosResponse } from "axios"
import store from "@/store";

export async function proccesRequest(func: Promise<AxiosResponse<any,any>>) {
    try {
        let resp = await func
        return resp.data
    } catch (err: any) {
        return err.response
    }
}

export default axios.create({
    baseURL: 'http://45.131.41.20/api/v1/',
    headers: { 'Authorization': `Bearer ${store.state.user.token}` }
});