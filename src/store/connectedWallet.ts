import { defineStore } from 'pinia'
import type {JsonRpcSigner} from "ethers/src.ts/providers/provider-jsonrpc.ts";
import {BrowserProvider} from "ethers";

export const useConnectedWalletStore = defineStore('connectedWallet', {
    state: () => ({
        address: '' as string,
        provider: null as BrowserProvider,
        signer: null as JsonRpcSigner
    }),
    actions: {
        setWalletAddress(address: String, provider:BrowserProvider, signer: JsonRpcSigner) {
            this.address = address
            this.signer = signer
            this.provider = provider
        },
        disconnect() {
            this.walletAddress = ''
            this.signer = null
            this.provider = null
        }
    }
})
