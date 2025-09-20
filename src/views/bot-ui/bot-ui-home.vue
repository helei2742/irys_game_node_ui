<script setup lang="ts">

import MenuBar from "@/views/bot-ui/components/menu/menu-bar.vue";
</script>

<template>
  <div class="bot-ui-home">
    <el-container>
      <el-header>
        <menu-bar/>
      </el-header>

      <el-main class="bot-ui-home-main">
        <router-view v-slot="{ Component, route }">
          <keep-alive>
            <component :is="Component" :key="route.fullPath"/>
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.bot-ui-home {
  width: 100%;
}

.bot-ui-home-main {
  min-height: calc(100vh - 58px);
}
</style>
