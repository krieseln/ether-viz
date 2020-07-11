import React from 'react';
import Block from "./Block";
import SteppedLineTo from 'react-lineto';


class BlockchainCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: props.web3,
            latestBlockNumber: null,
            blocks: [],
            blur: true,
            className: "blockchaincanvas blurry"

        };

        this.getLastBlocksTicker();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.web3 !== this.state.web3){
            this.setState({web3: this.props.web3});
        }
    };
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
        this.setState({latestBlockNumber: latestBlock});
        let blocksAway = 0;
        if (latestBlock <= 2) {
            blocksAway = latestBlock;
        } else {
            blocksAway = 2;
        }
        const blockArray = [];
        const blockHashesArray = [];
        for (let i = 0; i <= blocksAway; i++) {
            const callBlock = await web3.eth.getBlock(latestBlock - i);
            blockArray.push(callBlock);
        }
        const pendingBlock = await web3.eth.getBlock("pending");

        if (pendingBlock.number > blockArray[0].number) {
            blockArray.unshift(pendingBlock);
        }

        this.setState({blocks: blockArray, blockHashes: blockHashesArray});

    };

    blurCanvas = (event) => {
        if (event.target.className.includes("blockchaincanvas")) {
            this.setState({
                blur: (!this.state.blur),
                className: this.state.blur ? "blockchaincanvas" : "blockchaincanvas blurry"
            })
        }
    };


    render() {
        const {blocks, latestBlockNumber, className} = this.state;
        const zIndex = 0;
        return (
            <div
                className={className}
                onClick={(event) => this.blurCanvas(event)}
            >
                <div >
                    {blocks.map(block => (<Block zIndex={1} blockInfo={block} latestBlockNumber={latestBlockNumber}/>))}
                </div>
                <div className="blocklines">
                    {blocks.map((block, index) => (
                        <SteppedLineTo id="steppedlineto"
                                       borderColor={"grey"}
                                       borderWidth= {3}
                                       from={(block.hash) ? "hash_" + block.hash : "hash_empty"}
                                       toAnchor="bottom right"
                                       fromAnchor="bottom left"
                                       to={"parenthash_" + block.hash} zIndex={zIndex}/>
                    ))}
                </div>
            </div>
        )
    }
}

export default BlockchainCanvas;