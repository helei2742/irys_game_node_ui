<script setup lang="ts">
import type {BotApiDetail} from "@/types/bot-ui/model-operate-type.ts";
import OperateListCard from "@/views/bot-ui/operate/components/operate-list/components/operate-list-card.vue";

defineProps<{
  botApiList: Array<BotApiDetail>
}>()


const emit = defineEmits(['refresh'])
const handleRefresh = () => {
  emit('refresh')
}
</script>

<template>
  <div>
    <el-space direction="horizontal"
              alignment="stretch"
              :size="30"
              wrap
    >
      <operate-list-card
          style="width: 350px; height: 315px"
          v-for="apiDetail in botApiList"
          :api-detail="apiDetail"
          :key="apiDetail.name"
          @refresh="handleRefresh"
      />
    </el-space>
  </div>
</template>

<style scoped>

:deep(.el-dialog__body){
  height: calc(100% - 50px);
}

</style>
