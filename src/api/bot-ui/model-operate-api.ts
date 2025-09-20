import {getAxiosInstance} from '@/util/bot-request.ts'
import type {Pair, Result} from "@/types/vortexa-type-common.ts";
import type {
    BotApiDetail, StartSignMessage,
    StartSignParams
} from "@/types/bot-ui/model-operate-type.ts";

/**
 * 查询bot的api列表
 */
export function queryBotApiListNetwork(): Promise<Result<Record<string, Array<Pair<String, Array<BotApiDetail>>>>>> {
    return getAxiosInstance()({
        url: '/botApiList',
        method: 'post',
    })
}

/**
 * 获取合约地址
 */
export function getContractInfoNetwork():Promise<Result<{
    abi: string, address: string
}>> {
    return getAxiosInstance()({
        url: '/irys/contractInfo',
        method: 'get'
    })
}

/**
 * 获取游戏参数
 * @param data
 */
export function getGameSignMessageNetwork(data: StartSignParams): Promise<Result<StartSignMessage>> {
    return getAxiosInstance()({
        url: '/irys/getStartSignMessage',
        method: 'post',
        data: data
    })
}


