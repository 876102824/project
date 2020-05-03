<template>
  <div>
    <div class="userName">
      <div class="div-inline">用户名:</div>
      {{this.$store.state.user.userName}}
    </div>
    <el-divider></el-divider>
    <div class="userName">
      <div class="div-inline">密码:</div>
      {{this.$store.state.user.password}}
    </div>
    <el-divider></el-divider>
    <div class="address">
      <div class="div-inline">地址:</div>
      {{this.$store.state.user.address}}
    </div>
    <el-divider></el-divider>
    <div class="Avatar">
        头像
        <img v-if="this.$store.state.user.avatar" :src="this.$store.state.user.avatar" class="avatar">
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
  export default {
    name: 'User'
  }
</script>

<style scoped>

</style>
