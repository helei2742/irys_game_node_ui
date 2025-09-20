export interface BotApiDetail {
    namespace: string
    group: string
    name: string
    description: string
    order: number
    schedulerType: VortexaBotApiSchedulerType
    scheduleParams: ScheduleRegistryParams
    accountParams: AccountSelectParams
    operateParams: OperateParams
    parameters: object[]
}


export interface StartSignParams {
    address: string,
    gameType: string,
    score: number,
    startTime: number
}

export interface StartSignMessage {
    id: string,
    address: string,
    gameType: string,
    gameSessionId: string,
    score: number,
    cost: number,
    startTime: number,
    startMessage: string,
    completeTime: number,
    completeMessage: string,
    loadScore:number
}

export interface PlayGameParams {
    id: string,
    address: string,
    gameType: string,
    gameSessionId: string,
    score: number,
    cost: number,
    startTime: number,
    startMessage: string,
    startSign: string
    completeTime: number,
    completeMessage: string,
    completeSign: string,
    loadScore:number
}
