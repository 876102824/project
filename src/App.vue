<template>
  <div class="app">
  <el-menu :default-active="activeIndex" class="menu" mode="horizontal" @select="handleSelect" :router=true>
    <el-menu-item index="1" route="/Login">用户{{this.$store.state.user.userName}}</el-menu-item>
    <el-menu-item index="2" route="/Home">外卖</el-menu-item>
    <el-menu-item index="3" route="/Setting">用户设置</el-menu-item>
  </el-menu>
    <router-view/>
  </div>
</template>

<script>
  export default {
  name: 'app',
  data() {
  return {
  loginText: '登录/注册',
    activeIndex: '1'
  }
  },
    created() {
      this.getindex()
    },
  methods: {
    getindex() {
      this.activeIndex = 1
    },
    handleSelect() {
    }
  },
  components: {
    // login
  }
}
</script>

<style lang="stylus" scoped>
.app
  position relative
  width 100%
</style>
