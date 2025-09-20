<script setup lang="ts">
import {useConnectedWalletStore} from "@/store/connectedWallet.ts";
import {CloseBold} from '@element-plus/icons-vue'
import {onMounted, ref} from "vue";
import {useContractStore} from "@/store/contractStore.ts";
import {connectToOKXWallet} from "@/contract/irys-contract-info.ts";

const connectedWalletStore = useConnectedWalletStore();
const walletAddress = ref(null)
const connectWallet = async () => {
  const connection = await connectToOKXWallet()
  walletAddress.value = await connection?.signer.getAddress()
  connectedWalletStore.setWalletAddress(walletAddress.value, connection?.provider, connection?.signer)
}

const disconnectWallet = () => {
  connectedWalletStore.disconnect()
  walletAddress.value = ''
}

const contractStore = useContractStore()
onMounted(async () => {
  const contractInfo = await contractStore.requireContract()
  console.log(contractInfo)
})
</script>

<template>
  <div class="wallet-connector">
    <!-- 未连接 -->
    <el-button
        v-if="!walletAddress"
        type="primary"
        size="default"
        round
        @click="connectWallet"
    >
      Connect Wallet
    </el-button>

    <!-- 已连接 -->
    <div v-else class="wallet-connected">
        <el-tooltip :content="walletAddress" placement="bottom">
          <el-button
              style="margin-left: 0"
              type="info"
              size="small"
              @click="disconnectWallet"
              plain
          >
            {{ walletAddress.slice(0, 6) + '...' + walletAddress.slice(-4)}}
            <el-icon style="margin-left: 4px;color: var(--el-color-danger)"><CloseBold /></el-icon>
          </el-button>
        </el-tooltip>

    </div>
  </div>
</template>

<style scoped>
wallet-connector {
  display: flex;
  align-items: center;
  gap: 8px;
  position: fixed;
  top: 16px;
  right: 16px;
}

.wallet-connected {
  display: flex;
  align-items: center;
}

</style>
