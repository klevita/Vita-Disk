import HTTP from "../clients/NaPopravkuHTTPClient"
export default class AuthService{
    static async Login(email:string,pass:string) {
        try{
            let resp = await HTTP.post(`/auth/login?email=${email}&password=${pass}`)
            return resp.data
        }catch(err:any){
            return err.response
        }
    } 
    static async Logout(email:string,pass:string) {
        
    } 
    static async Register(email:string,pass:string,name:string) {
        try{
            let resp = await HTTP.post(`/auth/register?email=${email}&name=${name}&password=${pass}`)
            return resp.data
        }catch(err:any){
            return err.response
        }
    } 
}