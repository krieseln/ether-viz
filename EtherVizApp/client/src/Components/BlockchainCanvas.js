import React from 'react';
import Block from "./Block";


class BlockchainCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            web3: this.props.web3,
            blocks: []
        };

        window.setInterval(this.getLastBlocks(), 15000);
    }

    //get last 5 blöcke
    getLastBlocks = async () => {
        const {web3} = this.state;

        const latestBlock = await web3.eth.getBlockNumber();
        let blocksAway = 0;

        if (latestBlock >= 5) {
            blocksAway = latestBlock;
        } else {
            blocksAway = 5;
        }

        const b = [];

        for (let i = 0; i <= blocksAway; i++) {

            b.push(await web3.eth.getBlock(i))
        }

        this.setState({
                blocks: b
            }
        );
        console.log("blocks to array complete");
    };

    render() {

        return (
            <div className="blockchaincanvas">
                <Block/>
                <Block/>
            </div>
        )

    }


}

export default BlockchainCanvas;