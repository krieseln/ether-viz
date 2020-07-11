export default async function sendEthereum(web3, fromAddress, toAddress, amountInEther) {



    console.log("Transaction sent from", fromAddress, "transaction sent to", toAddress);
    console.log("current provider host", web3._provider.host);

    const sendValue = '99999999999999999999999999999999999';

    web3.eth.sendTransaction({
        from: fromAddress,
        to: toAddress,
        value: amountInEther
    })
        .on('transactionHash', function(hash){
            console.log("send Transaction: hash", hash)
        })
        .on('receipt', function(receipt){
            console.log("send Transaction: receipt", receipt);
            alert("Ethereum sent. \n Transaction mined in Block " + receipt.blockNumber);
        })
        .on('confirmation', function(confirmationNumber, receipt){
            console.log("send Transaction confirmationNumber, receipt",confirmationNumber, receipt)
        })
        .on('error', console.error); // If a out of gas error, the second parameter is the receipt.





}