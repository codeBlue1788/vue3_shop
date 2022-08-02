import config from '@/store/config/base.config'
import http from '@/service/httpService'

export default {

    async getUser(userVO) {
        const result = await http.get(`${config.apiPath}/login/validateUser`, { params: userVO })
        return result;
    },
    async getUserPost(userVO) {
        const result = await http.post(`${config.apiPath}/login/validateUserPost`, userVO)
        return result;
    }
}