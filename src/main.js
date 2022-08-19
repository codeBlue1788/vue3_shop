import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入pinia
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

import { Loading } from './utils/loading'

import httpService from '@/service/httpService'

// i18n 
import i18n from './locales/index'

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersist);

// 使用路由
app.use(router);

// 使用ElementPlus
app.use(ElementPlus);

//使用pinia
app.use(pinia);

// 使用i18n
app.use(i18n);

// 註冊全局icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

// 引入WindCss
import 'virtual:windi.css'

app.config.globalProperties.$Loading = Loading;
app.config.globalProperties.$http = httpService;

app.mount('#app');




