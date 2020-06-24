export default async function getAccountInfo(web3, account) {
    const nodeInfo = await web3.eth.getNodeInfo();
    const currentProvider = await web3.eth.personal.currentProvider;
    const balance = await web3.eth.getBalance(account);
    const networkId = await web3.eth.net.getId();
    const isListening = await web3.eth.net.isListening().then();
    const peerCount = await web3.eth.net.getPeerCount();
    const networkType = await web3.eth.net.getNetworkType();

    let out = {
        nodeInfo,
        currentProvider,
        balance,
        networkId,
        isListening,
        peerCount,
        networkType
    };

    console.log("getAccountInfo", out);

    return out;
}