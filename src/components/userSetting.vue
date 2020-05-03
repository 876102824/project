<template>
  <div>
    <div class="userName">
      <div class="div-inline">用户名:</div>
      <el-input class="input"
        size="mini"
        placeholder="请输入用户名"
        v-model="inputname" clearable>
      </el-input>
    </div>
    <el-divider></el-divider>
    <div class="userName">
      <div class="div-inline">密码:</div>
      <el-input class="input"
                size="mini"
                placeholder="请输入密码"
                v-model="inputpw" show-password>
      </el-input>
    </div>
    <el-divider></el-divider>
    <div class="address">
      <div class="div-inline">地址:</div>
      <el-input class="input"
                size="mini"
                placeholder="请输入地址"
                v-model="inputaddress" clearable>
      </el-input></div>
    <el-divider></el-divider>
    <div class="Avatar">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        头像
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <el-divider></el-divider>
    <div>
    <el-button type="primary" class="primary" @click="submit">提交</el-button>
    <el-button type="danger" class="danger" @click="logout">注销</el-button>
  </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        imageUrl: '',
        inputname: '',
        inputpw: '',
        inputaddress: ''
      }
    },
    name: 'userSetting',
    methods: {
      submit() {
        const _this = this
        let count
        axios.get('http://localhost:3000/api/getSignup', { params: { name: _this.inputname } })
          .then((res) => {
            count = res.data[0].count
            console.log('data0', res.data[0])
            if (this.inputname === '' || this.inputpw === '') {
              alert('账号或密码不能为空')
            } else if (count == 0) {
              axios.post('http://localhost:3000/api/deleteUser', {
                name: this.$store.state.user.userName
              })
              axios.post('http://localhost:3000/api/setUser', {
                name: this.inputname, password: this.inputpw, address: this.inputaddress, avatar: this.imageUrl
              })
                .then((res) => {
                  console.log('res', res)
                  // _this.$router.push('/Home')
                  _this.$store.commit('loaduserName', _this.inputname)
                  _this.$emit('eventuserName', _this.inputAccount)
                  _this.$store.commit('loadAddress', _this.inputaddress)
                  _this.$emit('eventaddress', _this.address)
                  _this.isIn = 1
                  _this.$store.commit('loadisIn', _this.isIn)
                  _this.$emit('eventisIn', _this.isIn)
                  _this.$store.commit('loadPassword', _this.inputpw)
                  _this.$store.commit('loadAvatar', _this.imageUrl)
                  console.log('url', this.imageUrl)
                  alert('用户修改成功')
                })
            } else if (count != 0) {
              alert('账号已存在')
            }
          })
      },
      logout() {
        this.$confirm('确认注销用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '注销成功!'
          })
          this.$store.state.user.isIn = 0
            this.$store.state.user.userName = '登录/注册'
            this.$router.push('/Login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
        console.log('urlhandle', this.imageUrl)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 4px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    float: right;
  }
  .div-inline{
    display:inline;
  }
  .input{
    width: 75%;
    float: right;
  }
  .primary{
    float: left;
  }
  .danger{
    float: right;
  }
</style>
