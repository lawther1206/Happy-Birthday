<template>
  <div class="mode">
    <el-card class="box-card">
      <router-link class="a-link" to="/Happy-Birthday/birthday"
        >生日祝福</router-link
      >
    </el-card>
    <el-card class="box-card">
      <router-link class="a-link" to="/Happy-Birthday/name"
        >缘分测试</router-link
      >
    </el-card>

    <router-view />
  </div>
</template>
<script setup>
import { ref } from "vue";
</script>

<style lang="scss">
.mode {
  background: #ffffff;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  .box-card {
    margin: 20px 0;
    width: 80vw;
    max-width: 360px;
    &:hover {
      background-color: lightpink;
    }
  }
}
.a-link {
  display: block;
  width: 100%;
  line-height: 60px;
  text-align: center;
}
.el-card__body {
  padding: 0px;
}
</style>
