import HTTP, {proccesRequest} from "../clients/NaPopravkuHTTPClient"
export interface _File{
    id:number,
    folder_id?:number,
    name:string,
    full_name:string,
    size:number,
    public_url:string
}
export default class FileService{
    static UploadFile(file:File,folderId:number|undefined = undefined) {
        const bodyFormData = new FormData();
        bodyFormData.append('file',file)
        if(folderId){
            bodyFormData.append('folder_id',''+folderId)
        }
        return proccesRequest(HTTP.post(`/files`,bodyFormData))
    } 
    static GetFiles(folder_id:number|null = null){
        if(folder_id){
            return proccesRequest(HTTP.get(`/files?folder_id=${folder_id}`))
        }
        return proccesRequest(HTTP.get(`/files`))
    }
}