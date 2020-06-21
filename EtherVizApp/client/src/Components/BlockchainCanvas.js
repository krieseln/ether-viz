import React from 'react';
import Block from "./Block";
import LineTo from "react-lineto";


class BlockchainCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: props.web3,
            blocks: []
        };

        this.getLastBlocksTicker();
    }


    getLastBlocksTicker = () => {
        window.setInterval(
            () => this.getLastBlocks(),
            15000
        );
    };

    //get last 5 blöcke
    getLastBlocks() {
        const {web3} = this.state;

        let latestBlock = web3.eth.getBlockNumber();
        console.log("latestBlock", latestBlock);
        let blocksAway = 0;
        if (latestBlock <= 4) {
            blocksAway = latestBlock;
        } else {
            blocksAway = 4;
        }

        const b = [];

        for (let i = 0; i <= blocksAway; i++) {
            const callBlock = web3.eth.getBlock(latestBlock - i);
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
    };

    LineBetweenBlocks = () => {
        const {blocks} = this.state;
        let hashes = [];
        blocks.map(block => hashes.push(block.hash));

        let ret = null;

        for (let i = 0; i <= hashes.length; i++){
            let from = hashes[i].hash;
            let to = hashes[i-1].hash;
            ret += <LineTo from={from} to={to}/>;
        }
        console.log("linebetweenblocks", ret);

        return ret;

    };

    pendingBlock = async () => {
        const {web3} = this.state;
        let pending = null;
        await web3.eth.getBlock("pending").then((res) => {
            pending = res;
        });
        return pending;
    }


    render() {

        const {blocks} = this.state;


        let pendingBlock = this.pendingBlock();
        console.log("render", pendingBlock);

        return (

            <div className="blockchaincanvas">
                {
                    blocks.map(block => <Block blockInfo={block} pendingBlock = {pendingBlock}/>)
                }
                {blocks.map((item, index) => (
                    <LineTo borderColor="black" zIndex={-1} from={blocks[0].hash} to={blocks[1].hash}/>
                ))}
            </div>
        )

    }


}

export default BlockchainCanvas;