import Vue from 'vue'
// import vuex from '@vue/cli-plugin-vuex'
import Vuex from 'vuex'
Vue.use(Vuex)

// 挂载Vuex
// Vue.use(vuex)

// 创建VueX对象
const store = new Vuex.Store({
  modules: {
    user: {
      state: {
        // 存放的键值对就是所要管理的状态
        userName: '登录/注册',
        password: '',
        isIn: '0',
        address: '',
        type: '',
        avatar: ''
      },
    mutations: {
      loaduserName (state, userName) {
        state.userName = userName
      },
      loadPassword (state, password) {
        state.password = password
      },
      loadisIn (state, isIn) {
        state.isIn = isIn
      },
      loadAddress (state, address) {
        state.address = address
      },
      loadType (state, Type) {
        state.Type = Type
      },
      loadAvatar (state, avatar) {
        state.avatar = avatar
      }
    }
    },
  seller: {
    state: {
      sellerID: '',
      sellerName: '',
      sellerAvatar: '',
      deliveryPrice: '',
      rankRate: '',
      score: '',
      foodScore: '',
      serviceScore: '',
      item: '',
      obj: []
    },
    mutations: {
      loadsellerName (state, sellerName) {
        state.sellerName = sellerName
      },
      loadsellerID (state, sellerID) {
        state.sellerID = sellerID
      },
      loadsellerobj (state, obj, num) {
        state.obj[num] = obj
      },
      loadsellerItem (state, sellerItem) {
        state.item = sellerItem
      },
      loaddeliveryPrice (state, deliveryPrice) {
        state.deliveryPrice = deliveryPrice
      },
      loadrankRate (state, rankRate) {
        state.rankRate = rankRate
      },
      loadfoodScore (state, foodScore) {
        state.foodScore = foodScore
      },
      loadserviceScore (state, serviceScore) {
        state.serviceScore = serviceScore
      },
      loadsellerAvatar (state, sellerAvatar) {
        state.sellerAvatar = sellerAvatar
      },
      loadsellerScore (state, sellerScore) {
        state.score = sellerScore
      }
    }
  }
  }
})

export default store
