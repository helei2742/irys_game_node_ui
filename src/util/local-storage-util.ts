import {ACCOUNT_ADDRESS_KEY, ACCOUNT_TOKEN_KEY} from "@/config/vortexa-config.ts";

/**
 * 保存token
 * @param token
 */
export function saveAccountToken(token: string) {
    localStorage.setItem(ACCOUNT_TOKEN_KEY, token);
}

/**
 * 获取token
 */
export function getAccountToken() {
    return localStorage.getItem(ACCOUNT_TOKEN_KEY)
}

/**
 * 保存account
 * @param address
 */
export function saveAccount(address: string) {
    localStorage.setItem(ACCOUNT_ADDRESS_KEY, address)
}

/**
 * 获取account
 */
export function getAccount() {
    return localStorage.getItem(ACCOUNT_ADDRESS_KEY)
}
