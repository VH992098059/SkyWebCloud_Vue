// FILE: main.js

import { createApp } from 'vue'
import { Quasar ,Cookies} from 'quasar'
import quasarLang from 'quasar/lang/zh-CN'
import { ElMessage } from 'element-plus'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/reset.css'
import 'element-ui/lib/theme-chalk/index.css';
import TDesign from 'tdesign-vue-next';
// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'
import router from '../src/components/Router/index'
import { DatePicker } from 'ant-design-vue';
import 'tdesign-vue-next/es/style/index.css';
import store from './components/store/modules/createStore.js'
import createStore  from './components/store/modules/createStore.js'
import CryptoJS from 'crypto-js'
const myApp = createApp(App)
myApp.use(Quasar, {
    plugins: {Cookies}, // import Quasar plugins and add here
    lang: quasarLang,
},)
myApp.use(router)/*单独use*/
myApp.use(ElementPlus)
myApp.use(DatePicker)
myApp.use(TDesign)
myApp.use(store)
myApp.use(ElMessage)
myApp.use(CryptoJS)
// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')
