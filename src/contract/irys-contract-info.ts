import {ethers} from "ethers";
import {ElMessage} from "element-plus";

const irysTestnet = {
    chainId: '0x4f6', // Chain ID 1270 (十六进制)
    chainName: 'Irys Testnet',
    rpcUrls: ['https://testnet-rpc.irys.xyz/v1/execution-rpc'], // 官方 RPC URL
    nativeCurrency: {
        name: 'IRYS',
        symbol: 'IRYS',
        decimals: 18
    },
    blockExplorerUrls: ['https://testnet-explorer.irys.xyz'] // 可选
}

// 连接函数
export const connectToOKXWallet = async () => {
    try {
        // 检查 OKX 钱包是否注入
        if (!window.okxwallet) {
            ElMessage.error({
                message: 'please install OKX wallet'
            })
            return;
        }

        // 请求连接账户
        const accounts = await window.okxwallet.request({ method: 'eth_requestAccounts' });
        if (accounts.length === 0) {
            ElMessage.error({
                message: 'user refused connect'
            })
            return
        }

        // 创建 Ethers.js Provider（使用 OKX 的注入 provider）
        const provider = new ethers.BrowserProvider(window.okxwallet);

        // 创建 Signer（用于签名和发送交易）
        const signer = await provider.getSigner();

        // 切换或添加 Irys 测试网
        try {
            // 先尝试切换到指定链
            await window.okxwallet.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: irysTestnet.chainId }]
            });
        } catch (switchError) {
            // 如果链不存在，添加链
            if (switchError.code === 4902) { // Chain not added
                await window.okxwallet.request({
                    method: 'wallet_addEthereumChain',
                    params: [I]
                });
            } else {
                throw switchError;
            }
        }

        // 示例：获取当前链 ID
        const network = await provider.getNetwork();
        console.log('current chain id：', network.chainId);
        return { provider, signer };
    } catch (error) {
        console.error('connect fail：', error);
        ElMessage.error({
            message: 'connect fail, ' + error.message
        })
    }
};
