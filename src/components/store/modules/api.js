import {request} from "./axios.js";
export class UserService{
    static async login(parses) {
        return request("/webpan/login",parses,"post")
    }
    static async register(parses) {
        return request("/webpan/user/register", parses, "post");
    }

    static async loginMsg(parses) {
        return request("/webpan/user/loginMsg",parses,"get")
    }

    static async logout(parses) {
        return request("/webpan/logout",parses,"post")
    }

    static async isUser(parses) {
        return request("/webpan/user/isUser",parses,"get")
    }

    static async forgetUser(parses) {
        return request("/webpan/user/forgerUser",parses,"post")
    }
}
export class FileService {
    static async fileList(parses) {
        return request("/webpan/file/getFiles", parses, "get");
    }

    static async uploadFile(parses) {
        return request("/webpan/file/uploadFiles",parses,"post")
    }
    static async deleteFile(parses) {
        return request("/webpan/file/deleteFiles",parses,"post")
    }
}
