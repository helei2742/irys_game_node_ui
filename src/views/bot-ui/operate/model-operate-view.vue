<script setup lang="ts">
import {onMounted, type Ref, ref} from "vue";
import {queryBotApiListNetwork} from "@/api/bot-ui/model-operate-api.ts";
import type {BotApiDetail} from "@/types/bot-ui/model-operate-type.ts";
import OperateList from "@/views/bot-ui/operate/components/operate-list/operate-list.vue";
import type {Pair} from "@/types/vortexa-type-common.ts";
import {useRoute} from "vue-router";

const loading = ref(false)
const activeNamespace = ref()

const botApiGroupedMap: Ref<Record<string, Pair<string, Array<BotApiDetail>>>> = ref({})
const queryBotApiList = () => {
  loading.value = true
  queryBotApiListNetwork().then(result => {
    const data = result.data
    botApiGroupedMap.value = {}

    for (let namespace of Object.keys(data)) {
      if (!activeNamespace.value) {
        activeNamespace.value = namespace
      }

      const apiList = data[namespace]
      const groupMap = {}
      for (let pair of apiList) {
        const group = pair.key
        groupMap[group] = pair.value
      }
      botApiGroupedMap.value[namespace] = groupMap
    }

  }).finally(() => loading.value = false)
}

const route = useRoute()
function parseQuery() {
  activeNamespace.value = route.query.namespace?.toString() || activeNamespace.value
}

const refresh = () => {
  queryBotApiList()
}

onMounted(() => {

  refresh()
  parseQuery()
})
</script>

<template>
  <div v-loading="loading">

    <el-tabs tab-position="left"
             class="operate-api-tab"
             v-model="activeNamespace"
    >
      <el-tab-pane
          v-for="(groupApiList, namespace) in botApiGroupedMap"
          :label="namespace"
          :key="namespace"
          :name="namespace"
          lazy
      >
        <el-tabs
            tab-position="top"
            class="operate-api-tab"
        >
          <el-tab-pane
              v-for="(apiList, group) in groupApiList"
              :label="group"
              lazy
          >
            <div class="tab-content">
              <operate-list
                  :bot-api-list="apiList"
                  @refresh="refresh"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.operate-api-tab {
  height: calc(100vh - 120px); /* 根据实际情况调节 */

}

.operate-api-tab .tab-content {
  height: calc(100vh - 180px); /* 根据实际情况调节 */
  overflow-y: auto;
  padding-right: 8px; /* 给滚动条留点空间 */
  box-sizing: border-box;
}
</style>
