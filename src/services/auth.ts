import { post } from "../utils/request";

type LoginData = {
    userName: string,
    password: string
}

// 登录后台
export const loginAPI = (data: LoginData) => post('/auth/admin_login', data)