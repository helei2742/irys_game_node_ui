import { defineStore } from 'pinia'
import type {BotInstanceConfig} from "@/types/vortexa-type-common.ts";

export const useBotInstanceConfigConfigStore = defineStore('botInstanceConfig', {
    state: () => ({
        baseUrl: '' as string,
        botContentPath: '' as string,
        signMessage: '' as string,
        botKey: '' as string,
        botVersion: '' as string,
        botName: '' as string,
    }),
    actions: {
        setConfig(config: BotInstanceConfig) {
            this.baseUrl = config.baseUrl
            this.botContentPath = config.botContentPath
        }
    }
})
