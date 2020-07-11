import React from "react";
import Box from '@material-ui/core/Box';


class InfoCanvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            web3: props.web3,
            contract: props.contract,

            currentAccount: props.currentAccount,
            currentAccountBalance: null,
            transactionCount: null,

            currentAccountInfo: [props.currentAccount],
            blur: true,
            className: "infocanvas blurry"
        };


    }

    //check if account selections has updated
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentAccount !== this.state.currentAccount) {
            this.setState({currentAccount: this.props.currentAccount});
            this.getCurrentAccountInfo(this.props.currentAccount);
        }

    };

    componentDidMount() {
        this.getCurrentAccountInfo(this.state.currentAccount);
    }


    //function to collect account infos
    getCurrentAccountInfo = async (curAcc) => {
        const {web3} = this.state;
        let transactionCount = await web3.eth.getTransactionCount(curAcc);
        let balance = 0;

        await web3.eth.getBalance(curAcc, function (error, wei) {
            if (!error) {
                balance = web3.utils.fromWei(wei, 'ether')
            }
        });

        this.setState({
            currentAccountBalance: balance,
            transactionCount: transactionCount,

        });
    };

    blurCanvas = (event) => {
        if (event.target.className.includes("infocanvas")) {
            this.setState({
                blur: (!this.state.blur),
                className: this.state.blur ? "infocanvas" : "infocanvas blurry"
            })
        }
    };

    render() {
        const {currentAccount, className} = this.state;

        return (
            <div className={className}
                 onClick={(event) => this.blurCanvas(event)}
            >
                <p className="headline">ACCOUNT INFO</p>
                <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
                    Account-Hash: {currentAccount.substr(currentAccount.length - 6, currentAccount.length)}
                </Box>
                <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
                    Balance: {this.state.currentAccountBalance}
                </Box>
                <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
                    Transaction Count: {this.state.transactionCount}
                </Box>
            </div>
        );
    }
}

export default InfoCanvas;
