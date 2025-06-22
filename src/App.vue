<script setup lang="ts">
// 导入Vue Router
</script>

<template>
  <!-- 路由出口，用于显示当前路由对应的组件 -->
  <RouterView />
</template>

<style>
/* Tailwind CSS 配置 */
:root {
  --primary: #165DFF;
  --secondary: #36D399;
  --warning: #FFAA33;
  --danger: #F87272;
  --dark: #1E293B;
  --light: #F8FAFC;
}

/* 全局样式 */
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', system-ui, sans-serif;
}

/* App容器样式现在应用到body */
body {
  min-height: 100vh;
}

/* 确保容器充分利用屏幕宽度 */
.container {
  max-width: none;
}

/* 优化大屏幕显示 */
@media (min-width: 1280px) {
  .max-w-7xl {
    max-width: 90rem;
  }
}

@media (min-width: 1536px) {
  .max-w-7xl {
    max-width: 100rem;
  }
}
</style>
