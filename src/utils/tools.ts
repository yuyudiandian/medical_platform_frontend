import logo from '../assets/logo.png'

export const defaultUrl = 'http://localhost:3006'

// 文件上传接口
export const uploadActionUrl = defaultUrl + '/common/upload'

export const defaultImg = logo

export const setToken = (token: string) => sessionStorage.setItem('token', token)

export const getToken = () => sessionStorage.getItem('token')

export const dalImg = (img: string) => { 
    if (img) { 
        if (img.startsWith('http')) return img
        return defaultUrl + img
    }
    return defaultImg
}