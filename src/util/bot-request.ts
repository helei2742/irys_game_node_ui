import axios from 'axios'
import {Result} from "@/types/vortexa-type-common.ts";
import {
    API_TIME_OUT,
} from "@/config/vortexa-config.ts";
import {ElMessage} from "element-plus";
import {getAccountToken} from "@/util/local-storage-util.ts";
import {useBotInstanceConfigConfigStore} from "@/store/botInstanceConfig.ts";

let instance: any = null

export function getAxiosInstance() {
    if (!instance) {
        const store = useBotInstanceConfigConfigStore()
        if (!store.baseUrl || !store.botContentPath) {
            throw new Error('Base config not initialized yet')
        }

        instance = axios.create({
            baseURL: store.baseUrl + store.botContentPath,
            timeout: API_TIME_OUT,
            transformResponse: [(data) => {
                const parsedData = JSON.parse(data)
                return new Result(parsedData)
            }]
        })


        // 请求拦截器
        instance.interceptors.request.use(
            config => {
                const token = getAccountToken();
                if (token) {
                    config.headers['Authorization'] = `${token}`;
                }

                return config
            },
            error => Promise.reject(error)
        )

        // 响应拦截器
        instance.interceptors.response.use(
            response => {
                const data: Result<never> = response.data
                if (!data.success) {
                    ElMessage({
                        message: 'Request error, ' + data.errorMsg,
                        type: 'error',
                    })
                    return Promise.reject(new Error(data.errorMsg))
                }
                return data
            },
            error => {
                ElMessage({
                    message: 'Network error, ' + error.code,
                    type: 'error',
                })
                return Promise.reject(error)
            }
        )
    }
    return instance
}

export default getAxiosInstance
