import Vue from 'vue'
// import Router from '@vue/cli-plugin-router'
import Vrouter from 'vue-router'
import Home from '../components/page/Home'
import Seller from '../components/page/Seller'
import Login from '../components/page/Login'
import Setting from '../components/page/Setting'
// import store from '@/components/store/index'
// const routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error => error)
// }
// Vue.use(Router)
Vue.use(Vrouter)
const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Setting',
    name: 'Setting',
    component: Setting
  },
  {
    path: '/Seller',
    name: 'Seller',
    component: Seller
  },
  {
    path: '/',
    redirect: {
      name: 'Login'
    }
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'Seller',
        name: 'Seller',
        component: Seller
      }
    ]
  }
  ]
const router = new Vrouter({
  mode: 'history',
  routes
})
// if (sessionStorage.getItem('token')) {
//   store.commit('set_token', sessionStorage.getItem('token'))
// }
// // router.beforeEach((to, from, next) => {
// //   if (to.matched.some(r => r.meta.requireAuth)) { // 这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
// //     if (store.state.token) {
// //       next()
// //     } else {
// //       next({
// //         path: '/login',
// //         query: { redirect: to.fullPath }
// //       })
// //     }
// //   } else {
// //     next()
// //   }
// // })
//
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next()
//   } else {
//     const token = localStorage.getItem('Authorization')
//
//     if (token === null || token === '') {
//       next('/login')
//     } else {
//       next()
//     }
//   }
// })
export default router
