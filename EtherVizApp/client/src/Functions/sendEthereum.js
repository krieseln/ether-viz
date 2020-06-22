export default async function sendEthereum(web3, fromAddress, toAddress, amountInEther) {

    /*
    await web3.eth.personal.unlockAccount(fromAddress, "pass").then(
        web3.eth.sendTransaction({
            from: fromAddress,
            gasPrice: "10000",
            gas: "2100",
            to: toAddress,
            value: web3.utils.toWei(amountInEther, "ether"),
            data: ""
        }, function (err, transactionHash) {
            if (err) {
                console.log(err);
            } else {
                console.log(transactionHash);
            }
        }));
*/

    await web3.eth.sendTransaction({
        from: "0x8Cc5A1a0802DB41DB826C2FcB72423744338DcB0",
    })


    console.log("Transaction sent from", fromAddress, "transaction sent to", toAddress);


}