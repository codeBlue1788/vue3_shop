import axios from 'axios'
import qs from 'qs'

import { notifyError, notifySuccess } from '@/service/notifyService'
import { Loading } from '@/utils/loading'


const http = axios.create({
    timeout: 60000,
    headers: {
        common: {
            Accept: "application/json;charset=utf-8"
        },
    },
    responseEncoding: "utf8",
    paramsSerializer(params) {
        return qs.stringify(params, { allowDots: true });
    }
});

http.interceptors.request.use(
    config => {
        Loading();
        return config
    },
    error => {
        Loading();
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    response => {
        notifySuccess("成功", "操作成功!");
        Loading().close();
        return response.data
    },
    error => {
        if (error.response.status == 500 && error.response.data.msgCode) {
            notifyError("錯誤", error.response.data.msgStringList.join(","));
            Loading().close();
            return error.response.data;
        } else {
            notifyError("錯誤", "未預期錯誤");
            Loading().close();
            return "錯誤";
        }

    }
);

export default http