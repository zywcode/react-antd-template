import axios from 'axios';

export const userLogin = (params: any) => axios.get(`/api/user/login`, {params: params});
export const userInfo = () => axios.get(`/api/user/detail`);
