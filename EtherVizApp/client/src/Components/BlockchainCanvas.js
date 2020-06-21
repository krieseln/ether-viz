import React from 'react';
import Block from "./Block";
import LineTo from "react-lineto";
import * as _ from "underscore";
import BlockSubscription from "./BlockSubscription"


class BlockchainCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: props.web3,
            web3WS: props.web3WS,
            blocks: []
        };

        this.getLastBlocksTicker();
    }


    getLastBlocksTicker = () => {
        window.setInterval(
            this.getLastBlocks(),
            15000
        );
    };

    //get last 5 blöcke
    getLastBlocks = async () => {
        const {web3} = this.state;

        let latestBlock = await web3.eth.getBlockNumber();
        console.log("latestBlock", latestBlock);
        let blocksAway = 0;
        if (latestBlock <= 4) {
            blocksAway = latestBlock;
        } else {
            blocksAway = 4;
        }

        const b = [];

        for (let i = 0; i <= blocksAway; i++) {
            const callBlock = await web3.eth.getBlock(latestBlock - i);
            b.push(callBlock);
        /*    console.log("callBlock", callBlock)*/
        }

        this.setState({
                blocks: b
            }
        );
       /* console.log(b);*/
    };


    localGetBlock = () => {
        const {web3} = this.state;
        return web3.eth.getBlock(0);
    }


    render() {

        const {blocks, web3WS} = this.state;


        return (
            <div>
                <div>
                    <BlockSubscription web3WS={web3WS}/>
                </div>
                <div className="blockchaincanvas">
                    {
                        blocks.map(block => <Block blockInfo={block}/>)
                    }
                </div>
            </div>
        )

    }


}

export default BlockchainCanvas;