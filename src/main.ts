import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import './service/axios_demo'
import router from './router'
import store from './store'
import { setupStore } from '@/store/index'
import { globalRegister } from './global'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
setupStore()

app
  .use(router)
  .use(store)
  .use(globalRegister)
  .use(ElementPlus, {
    locale: zhCn
  })
  .mount('#app')
