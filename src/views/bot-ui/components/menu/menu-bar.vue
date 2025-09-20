<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {BotUiPath} from "@/router";
import {getAccountToken} from "@/util/local-storage-util.ts";
import WalletConnector from "@/views/bot-ui/components/menu/wallet-connector/wallet-connector.vue";

const router = useRouter();
const goTo = (path) => {
  router.push('/ui/' + path);
};

const route = useRoute()
const active = computed(() => {
  const path = route.path; // 比如 "/ui/operate"
  return path.substring(path.lastIndexOf("/") + 1); // operate
});

const signIn = ref(false)

onMounted(() => {
  if (getAccountToken()) {
    signIn.value = true
  }
})
</script>

<template>
  <div class="menu-bar">
    <el-menu
        :default-active="active"
        class="menu-bar-content"
        mode="horizontal"
    >
      <el-menu-item index="operate" @click="goTo(BotUiPath.operate)">Operate</el-menu-item>
      <el-menu-item class="wallet">
        <wallet-connector/>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.menu-bar {
}

.menu-bar-content {
}

:deep(.el-menu) {
  justify-content: space-between;
}

.wallet{
  display: flex;
  align-content: center;
}
</style>
