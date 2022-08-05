import config from '@/store/config/base.config'
import http from '@/service/httpService'

export default {
    async getSysParam() {
        const result = await http.get(`${config.apiPath}/system/getSysParam`)
        return result;
    },
}