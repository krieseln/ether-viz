import React from 'react';
import Block from "./Block";


class BlockchainCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: props.web3,
            blocks: []
        };
    }

    getLastBlocksTicker = () => {
        window.setInterval(
            this.getLastBlocks,
            15000
        );
    };

    //get last 5 blöcke
    getLastBlocks = async () => {
        const {web3} = this.state;

        const latestBlock = await web3.eth.getBlockNumber();
        let blocksAway = 0;
        if (latestBlock >= 5) {
            blocksAway = latestBlock;
        } else {blocksAway = 5;}

        const b = [];

        for (let i = 0; i <= blocksAway; i++) {

            const callBlock = await web3.eth.getBlock(i);

            b.push(callBlock);
            console.log("callBlock", callBlock)
        }

        this.setState({
                blocks: b
            }
        );
        console.log(b);
    };


    localGetBlock = () => {
        const {web3} = this.state;
        return web3.eth.getBlock(0);
    }


    render() {

        const blockInfo = this.localGetBlock();

        return (
            <div className="blockchaincanvas">
                <Block blockInfo={blockInfo}/>
            </div>
        )

    }


}

export default BlockchainCanvas;