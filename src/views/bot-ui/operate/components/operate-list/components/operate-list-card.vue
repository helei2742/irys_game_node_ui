<script setup lang="ts">
import {More, VideoPlay, EditPen} from "@element-plus/icons-vue";
import type {
  BotApiDetail, PlayGameParams,
} from "@/types/bot-ui/model-operate-type.ts";
import {computed, onMounted, type Ref, ref} from "vue";
import {ElMessage} from "element-plus";
import {useConnectedWalletStore} from "@/store/connectedWallet.ts";
import {getGameSignMessageNetwork} from "@/api/bot-ui/model-operate-api.ts";
import {ethers} from "ethers";

import {useContractStore} from "@/store/contractStore.ts";
import {connectToOKXWallet} from "@/contract/irys-contract-info.ts";

const props = defineProps<{
  apiDetail: BotApiDetail,
}>()

const connectedWalletStore = useConnectedWalletStore();
const contractStore = useContractStore();
const contractInfo: Ref<{ abi: string, address: string }> = ref(null)
const targetScore = ref(null)
const startTime = ref()
const playGameParams: Ref<PlayGameParams> = ref({})

const isLoading = ref(false)

const signClick = async (name) => {
  isLoading.value = true
  try {
    const address = connectedWalletStore.address
    if (!address) {
      ElMessage.warning({
        message: "Please connect your wallet"
      })
      return
    }

    const gameType = getGameType(name);

    const result = await getGameSignMessageNetwork({
      address: address,
      gameType: gameType,
      score: targetScore.value,
      startTime: startTime.value
    })

    const startSignMessage = result.data
    playGameParams.value.id = startSignMessage.id
    playGameParams.value.gameType = gameType
    playGameParams.value.gameSessionId = startSignMessage.gameSessionId
    playGameParams.value.score = startSignMessage.score
    playGameParams.value.startTime = startSignMessage.startTime
    playGameParams.value.startMessage = startSignMessage.startMessage
    playGameParams.value.startSign = await signMessage(startSignMessage.startMessage)
    playGameParams.value.completeTime = startSignMessage.completeTime
    playGameParams.value.completeMessage = startSignMessage.completeMessage
    playGameParams.value.completeSign = await signMessage(startSignMessage.completeMessage)
    playGameParams.value.loadScore = startSignMessage.loadScore
  } finally {
    isLoading.value = false
  }
}

const uploadChainClick = async () => {
  isLoading.value = true
  try {
    const {signer} = await connectToOKXWallet()
    const contract = new ethers.Contract(
        contractInfo.value.address,
        contractInfo.value.abi,
        signer
    );

    const intent = [
      ethers.zeroPadValue(playGameParams.value.id, 32),
      ethers.encodeBytes32String(playGameParams.value.gameType),
      ethers.encodeBytes32String(playGameParams.value.gameSessionId),
      playGameParams.value.score, // 确保是 BigInt 如果值大
      playGameParams.value.startTime,
      ethers.toUtf8Bytes(playGameParams.value.startMessage),
      ethers.getBytes(playGameParams.value.startSign), // 钱包签名的 bytes
      playGameParams.value.completeTime,
      ethers.toUtf8Bytes(playGameParams.value.completeMessage),
      ethers.getBytes(playGameParams.value.completeSign),
      playGameParams.value.loadScore
    ]

    const tx = await contract.registerIntent(intent);
    const receipt = await tx.wait();
    console.log(receipt);
    playGameParams.value = {}
  } finally {
    isLoading.value = false
  }
};

const signMessage = async (message) => {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  return await signer.signMessage(message)
}

const uploadClickable = computed(() => {
  return playGameParams.value.gameType && playGameParams.value.gameSessionId && playGameParams.value.score
      && playGameParams.value.startTime && playGameParams.value.startMessage && playGameParams.value.startSign
      && playGameParams.value.completeTime && playGameParams.value.completeMessage && playGameParams.value.completeSign
      && playGameParams.value.loadScore && connectedWalletStore.signer && contractInfo.value
      && contractInfo.value.abi && contractInfo.value.address
})

const signClickable = computed(() => {
  return targetScore.value && startTime.value && connectedWalletStore.signer
})

type GameType = 'missile-command' | 'snake' | 'asteroids' | 'hex-shooter'
type GameName = 'Missile Game' | 'Snake Game' | 'Asteroids Game' | 'Hexshot Game'

const getGameType = (name: GameName): GameType => {
  if (name == 'Missile Game') {
    return 'missile-command'
  } else if (name == 'Asteroids Game') {
    return 'asteroids'
  } else if (name == 'Snake Game') {
    return 'snake'
  } else if (name == 'Hexshot Game') {
    return 'hex-shooter'
  } else {
    ElMessage.error({
      message: "known game type"
    })
    throw new Error('known game type')
  }
}

onMounted(() => {
  contractInfo.value = contractStore.contract
})
</script>

<template>
  <div style="width: 100%; height: 100%">
    <el-card
        class="operate-list-item"
        shadow="hover"
        v-loading="isLoading"
    >
      <template #header>
        <div class="operate-list-item-header">
          <el-text class="operate-list-item-title" size="large" truncated>
            {{ apiDetail.name }}
          </el-text>

          <el-dropdown placement="bottom-end" trigger="click">
            <el-button size="small" plain>
              <el-icon>
                <More/>
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>History</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>

      <template #default>
        <div class="operate-list-item-content">
          <el-tabs>
            <el-tab-pane label="overview">
              <el-form label-width="auto">
                <el-form-item label="Score">
                  <el-input-number v-model="targetScore" :min="1" size="small"/>
                </el-form-item>
                <el-form-item label="Execute At">
                  <el-date-picker v-model="startTime"
                                  type="datetime"
                                  value-format="x"
                                  size="small"
                  />
                </el-form-item>

              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </template>

      <template #footer>
        <div class="operate-list-item-footer">
          <div>
            <el-tooltip content="Sign" placement="top">
              <el-button
                  size="small"
                  type="info"
                  @click="signClick(apiDetail.name)"
                  :disabled="!signClickable"
                  plain
              >
                <el-icon>
                  <EditPen/>
                </el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip content="Start" placement="top">
              <el-button
                  size="small"
                  type="success"
                  @click="uploadChainClick"
                  plain
                  :disabled="!uploadClickable"
              >
                <el-icon>
                  <VideoPlay/>
                </el-icon>
              </el-button>
            </el-tooltip>
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>

<style scoped>
.operate-list-item {
  width: 100%;
  height: 100%;
  min-height: 300px;
  //background-color: var(--el-bg-color);
}

.operate-list-item-header {
  display: flex;
  justify-content: space-between;
}

.operate-list-item-title {
  font-weight: 750;
  font-size: 20px;
  flex: 1;
  padding-right: 10px;
}


:deep(.el-card__body) {
  height: calc(100% - 134px);
}

.operate-list-item-content {
  height: 100%;
  overflow-y: scroll;
}

.operate-list-item-footer {
  display: flex;
  justify-content: right;
}

:deep(.el-card__body) {
  padding: 0 20px;
}
</style>
