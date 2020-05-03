<template>
<div>
  <el-row>
    <el-col :span="24">
      <div class="grid-content Primary">
        <i class="el-icon-search">
        </i>
      </div>
      <div>

      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
  export default {
    name: 'homeheader'
  }
</script>

<style scoped>
.el-icon-search{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 6px;
}
  .Primary{
    background: #409EFF;
  }
</style>
