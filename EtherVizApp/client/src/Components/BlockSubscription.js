import React from 'react'
import Block from "./Block";

class BlockSubscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            web3WS : props.web3WS,
            localblockHeader: null
        }
        this.call()

    }
    call = () => {
        console.log("blocksubscription call")
        const {web3WS} = this.state;
        console.log(web3WS);
        const subscription = web3WS.eth.subscribe('newBlockHeaders', function (error, result) {
            if (!error) {
                console.log(result);

                return;
            }

            console.error(error);
        })
            .on("connected", function (subscriptionId) {
                console.log(subscriptionId);
            })
            .on("data", function (blockHeader) {
                console.log(blockHeader);
                this.setState ({localblockHeader : blockHeader});
            })
            .on("error", console.error);

// unsubscribes the subscription
        subscription.unsubscribe(function (error, success) {
            if (success) {
                console.log('Successfully unsubscribed!');
            }
        });
    }
    render() {
        return (
            <div>
                <Block blockInfo={this.state.localblockHeader} />
            </div>
        )

    }
}

export default BlockSubscription;