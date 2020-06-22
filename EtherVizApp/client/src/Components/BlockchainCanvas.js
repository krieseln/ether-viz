import React from 'react';
import Block from "./Block";
import LineTo from 'react-lineto';


class BlockchainCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: props.web3,
            latestBlockNumber: null,
            blocks: []
        };

        this.getLastBlocksTicker();
    }

    //@ToDo add lines between blocks: line from /"block hash" to /"parent block hash"

    getLastBlocksTicker = () => {
        window.setInterval(
            () => this.getLastBlocks(),
            4000
        );
    };

    //get last 5 blocks
    getLastBlocks = async () => {
        const {web3} = this.state;

        let latestBlock = await web3.eth.getBlockNumber();
        this.setState({latestBlockNumber: latestBlock})
        let blocksAway = 0;
        if (latestBlock <= 3) {
            blocksAway = latestBlock;
        } else {
            blocksAway = 3;
        }
        const blockArray = [];
        const blockHashesArray = [];
        for (let i = 0; i <= blocksAway; i++) {
            const callBlock = await web3.eth.getBlock(latestBlock - i);
            blockArray.push(callBlock);
        }
        this.setState({blocks: blockArray, blockHashes: blockHashesArray});
        console.log(this.state.blocks);
    };


    render() {
        const {blocks, latestBlockNumber} = this.state;
        const zIndex = -1;
        return (
            <div>
                <div className="blockchaincanvas">
                    {blocks.map(block => (<Block blockInfo={block} latestBlockNumber={latestBlockNumber}/>))}
                </div>
                <div className="blocklines">
                    {blocks.map((block, index) => (
                        <LineTo borderColor={"black"} from={block.hash} to={block.parentHash} zIndex={zIndex}/>
                    ))}
                </div>
            </div>
        )
    }
}

export default BlockchainCanvas;