import {type BotInstanceConfig, Result} from "@/types/vortexa-type-common.ts";

/**
 * 获取配置
 */
export async function getConfigNetwork()
    : Promise<Result<BotInstanceConfig>> {
    return fetch(
        '/base/config',
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST'
        }
    ).then(res => res.json())
}

/**
 * 获取签名消息
 * @param address
 */
export async function getSignMessageNetwork(address: string):Promise<Result<String>> {
    return fetch(
        '/base/getSignMessage',
        {
            method: 'POST',
            body: address
        }
    ).then(res => res.json())
}

/**
 * 检查token
 * @param token
 */
export async function checkTokenNetwork(token: string)
    : Promise<Result<boolean>> {
    return fetch(
        '/base/checkToken',
        {
            method: 'POST',
            body: token
        }
    ).then(res => res.json())
}

/**
 * 登录
 * @param address
 * @param signatured
 */
export async function signInNetwork(
    address: string, signatured: string
): Promise<Result<any>> {
    return fetch(
        '/base/signIn',
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                signatured: signatured
            })
        }
    ).then(res => res.json())
}
