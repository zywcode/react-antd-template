import axios from "axios";

export const douyinParser = (params: any) => axios.get(`/api/parser/douyin`, {params: params});
