import config from '@/store/config/base.config'
import http from '@/service/httpService'

export default {
    // 儲存menu
    async queryUserPage(queryString) {
        const result = await http.get(`${config.apiPath}/user/queryUserPage?${queryString}`)
        return result;
    },
}