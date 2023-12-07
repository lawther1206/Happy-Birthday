<template>
  <router-view />
</template>
<script setup></script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
/* 对于Webkit浏览器如Chrome和Safari */
::-webkit-scrollbar {
  width: 2px; /* 宽度 */
  height: 2px; /* 高度（对于水平滚动条） */
}

::-webkit-scrollbar-track {
  background: #f1f1f1; /* 轨迹颜色 */
}

::-webkit-scrollbar-thumb {
  background: #b78e81; /* 滑块颜色 */
}

::-webkit-scrollbar-thumb:hover {
  background: #b78e81; /* 鼠标悬停时滑块颜色 */
}

/* 对于Firefox */
* {
  scrollbar-width: thin; /* 滚动条宽度 */
  scrollbar-color: #b78e81 #f1f1f1; /* 滚动条颜色：滑块颜色 + 轨迹颜色 */
}
</style>
