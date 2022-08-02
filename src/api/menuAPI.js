import config from '@/store/config/base.config'
import http from '@/service/httpService'

export default {
    // 儲存menu
    async saveMenu(menuVO) {
        const result = await http.post(`${config.apiPath}/menu/saveMenu`, menuVO)
        return result;
    },
    // 取得menu
    async getMenus() {
        const result = await http.get(`${config.apiPath}/menu/getMenus`)
        return result;
    },
    async getParents() {
        const result = await http.get(`${config.apiPath}/menu/getParents`)
        return result;
    },

    
}