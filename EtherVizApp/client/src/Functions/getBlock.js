import React from 'react';

export default async function getBlock(web3) {
    //@todo --> gewünschte Daten raussuchen
    const blockNumber = await web3.eth.getBlockNumber();;
    const block = await web3.eth.getBlock(blockNumber)
    const predecessor = await web3.eth.getBlock(blockNumber - 1);
    console.log(
        {
            blockNumber,
            block,
            predecessor
        }
    )

}


