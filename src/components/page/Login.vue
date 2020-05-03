<template>
  <div class="Login">
    <div class="header" v-if= "this.$store.state.user.isIn != 0">
        <User></User>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick" v-if= "this.$store.state.user.isIn == 0">
      <el-tab-pane label="登录" name="first">
        <el-input v-model="inputAccount" placeholder="请输入账号"></el-input>
        <el-input placeholder="请输入密码" v-model="inputPassword" show-password></el-input>
        <div align="center"><el-button type="success" class="el-button" @click="login" align="center">登录</el-button></div>
      </el-tab-pane>
      <el-tab-pane label="注册" name="second">
        <el-input v-model="inputAccount" placeholder="请输入账号"></el-input>
        <el-input placeholder="请输入密码" v-model="inputPassword" show-password></el-input>
        <div align="center"><el-button type="success" class="el-button" @click="signUp" align="center">注册</el-button></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import User from '../page/User'
import axios from 'axios'
  export default {
    data () {
      return {
        inputAccount: '',
        inputPassword: '',
        userName: '',
        isIn: '0',
        activeName: 'first',
        address: ''
      }
    },
    components: {
      User
    },
    methods: {
      handleClick (tab, event) {
        this.inputAccount = ''
        this.inputPassword = ''
      },
      signUp () {
        const _this = this
        let count
        axios.get('http://localhost:3000/api/getSignup', { params: { name: _this.inputAccount } })
          .then((res) => {
            count = res.data[0].count
            console.log('data0', res.data[0])
            if (this.inputAccount === '' || this.inputPassword === '') {
              alert('账号或密码不能为空')
            } else if (count == 0) {
              axios.post('http://localhost:3000/api/addUser', {
                name: this.inputAccount, password: this.inputPassword
              })
                .then((res) => {
                  console.log('res', res)
                  // _this.$router.push('/Home')
                  _this.$store.commit('loaduserName', _this.inputAccount)
                  _this.$store.commit('loadPassword', _this.inputPassword)
                  _this.$emit('eventuserName', _this.inputAccount)
                  _this.$store.commit('loadAddress', _this.address)
                  _this.$emit('eventaddress', _this.address)
                  _this.isIn = 1
                  _this.$store.commit('loadisIn', _this.isIn)
                  _this.$emit('eventisIn', _this.isIn)
                  alert('注册并登陆成功')
                })
            } else if (count != 0) {
              alert('账号已存在')
            }
          })
      },
      login () {
        const _this = this
        let count, address
        if (this.inputAccount === '' || this.inputPassword === '') {
          alert('账号或密码不能为空')
        } else {
          axios.get('http://localhost:3000/api/getLogin', { params: { name: _this.inputAccount, password: this.inputPassword } })
            .then((res) => {
              count = res.data[0].count
              if (count == 0) {
                alert('账号密码错误')
              } else {
                axios.get('http://localhost:3000/api/getLogin', { params: { name: _this.inputAccount, password: this.inputPassword } })
                  .then((res) => {
                    axios.get('http://localhost:3000/api/getAddress', { params: { name: _this.inputAccount } })
                      .then((res) => {
                        address = res.data[0].address
                        _this.userName = res.data[0].name
                        _this.$store.commit('loaduserName', _this.userName)
                        _this.$store.commit('loadPassword', _this.inputPassword)
                        _this.$emit('eventuserName', _this.userName)
                        console.log('userName2', _this.userName)
                        _this.address = address
                        _this.$store.commit('loadAddress', _this.address)
                        _this.$emit('eventaddress', _this.address)
                        console.log('address2', _this.address)
                         // _this.$emit('getAddress', address)
                        // vm.$emit('address', _this.address)
                        // _this.$router.push('/Home')
                        _this.isIn = 1
                        _this.$store.commit('loadisIn', _this.isIn)
                        _this.$emit('eventisIn', _this.isIn)
                        console.log('isIn2', _this.isIn)
                        alert('登陆成功')
                      })
                  })
              }
            })
        }
      }
    },
    mounted() {
        this.$emit('eventisIn', this.isIn)
        this.$emit('eventuserName', this.userName)
        this.$emit('eventaddress', this.address)
      }
    }
</script>
<style scoped>
  .el-button {
    width: 25%;
    text-align: center;
  }
  /*.Login {*/
  /*width: 75%;*/
    /*text-align: center;*/
  /*}*/

</style>
