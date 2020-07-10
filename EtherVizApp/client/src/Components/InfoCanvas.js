import React from "react";
import Box from '@material-ui/core/Box';


class InfoCanvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            web3: props.web3,
            contract: props.contract,
            currentAccount: props.currentAccount,
            currentAccountInfo: [props.currentAccount],
            blur: true,
            className: "infocanvas blurry"
        };


    }

    //check if account selections has updated
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentAccount !== this.state.currentAccount) {
            this.setState({currentAccount: this.props.currentAccount});
            this.getCurrentAccountInfo();
        }

    };

    componentDidMount() {
        this.getCurrentAccountInfo();
    }


    //function to collect account infos
    getCurrentAccountInfo = async () => {
        const {web3, currentAccount} = this.state;

        let tmpcurrentAccountInfo = [];

        let transactionCount = await web3.eth.getTransactionCount(currentAccount);
        let accountBalance = null;
        let storageAT = null;

        await web3.eth.getStorageAt(currentAccount, 0).then(result => {
            storageAT = web3.utils.hexToAscii(result);
        });
        await web3.eth.getBalance(currentAccount, function (error, wei) {
            if (!error) {
                accountBalance = web3.utils.fromWei(wei, 'ether');
                //console.log(wei)
                //console.log(accountBalance)
            }
        });
        let contractCode = await web3.eth.getCode(currentAccount);

        tmpcurrentAccountInfo.push(accountBalance);
        tmpcurrentAccountInfo.push(transactionCount);
        tmpcurrentAccountInfo.push(contractCode);
        tmpcurrentAccountInfo.push(storageAT);

        this.setState({
            currentAccountInfo: tmpcurrentAccountInfo
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
        const {currentAccount, currentAccountInfo, className} = this.state;
        //console.log(currentAccountInfo)

        return (
            <div className={className}
                onClick={(event) => this.blurCanvas(event)}
            >
                <h2>Account Info</h2>
                <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
                   Account-Hash: {currentAccount.substr(currentAccount.length - 6, currentAccount.length)}
                </Box>
                {currentAccountInfo.map(detail => (
                    <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">{detail}</Box>))}

            </div>
        );
    }
}

export default InfoCanvas;
