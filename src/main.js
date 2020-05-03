// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/index'
import Home from './components/page/Home'
import Seller from './components/page/Seller'
import App from './App'
import router from './router/index'
import axios from 'axios'
import ElementUI from 'element-ui'
import cubeUI from 'cube-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'common/stylus/index.styl'
import 'amfe-flexible'
import './plugins/element.js'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(cubeUI)
// import style from './file.css'
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App, Home, Seller },
  template: '<App/>'
})
