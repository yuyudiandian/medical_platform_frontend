import logo from '../assets/logo.png'

export const defaultImg = logo

export const setToken = (token: string) => sessionStorage.setItem('token', token)

export const getToken = () => sessionStorage.getItem('token')