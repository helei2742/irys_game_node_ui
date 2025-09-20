import { defineStore } from 'pinia'
import {getContractInfoNetwork} from "@/api/bot-ui/model-operate-api.ts";

export const useContractStore = defineStore('contractStore', {
    state: () => ({
        contract: {
            abi: null as [],
            address: '' as string
        }
    }),
    actions: {
        async requireContract(): Promise<void> {
            // 如果已经有地址和 ABI，就不再请求
            if (!this.contract.address || !this.contract.abi) {
                const result = await getContractInfoNetwork()
                this.contract.abi = JSON.parse(result.data.abi)
                this.contract.address = result.data.address
            }
            return this.contract
        }
    }
})
