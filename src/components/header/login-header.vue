<template>
<div class="login-header">
  <login @eventisIn="getisIn" @eventuserName="getuserName" @eventaddress="getaddress" >
  </login>
  address:{{address}} isIn:{{isIn}} userName:{{userName}}
</div>
</template>

<script>
  import login from '@/components/page/Login'
  export default {
    data() {
      return {
    address: '',
        isIn: '',
        userName: ''
      }
    },
    components: {
      login
    },
    name: 'login-header',
    methods: {
      getaddress(address) {
        this.address = address
      },
      getuserName(userName) {
        this.userName = userName
      },
      getisIn(isIn) {
        this.isIn = isIn
      }
    }
  }
</script>

<style scoped>

</style>
