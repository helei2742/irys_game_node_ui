import {createApp} from 'vue'
import '@/style.css'
import App from '@/App.vue'
import router from '@/router';
import {createPinia} from 'pinia';
import ElementPlus from 'element-plus';
import '@/styles/element-theme.scss'; // 引入自定义主题
import "echarts"
import {getConfigNetwork} from "@/api/base.ts";
import {useBotInstanceConfigConfigStore} from "@/store/botInstanceConfig.ts";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

await getConfigNetwork().then(result => {
    const instanceConfig = result.data;
    // 存进 Pinia，而不是 localStorage
    const store = useBotInstanceConfigConfigStore()
    store.setConfig(instanceConfig)
    app.mount('#app')
})

