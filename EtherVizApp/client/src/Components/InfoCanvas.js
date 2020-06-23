import TextField from "@material-ui/core/TextField";
import React from "react";
import Box from '@material-ui/core/Box';
import getAccountInfo from "../Functions/getAccountInfo";

class InfoCanvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            web3: props.web3,
            accounts: props.accounts,
            contract: props.contract,
            currentAccount: props.currentAccount
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentAccount !== this.state.currentAccount) {
            this.setState({currentAccount: this.props.currentAccount});
        }
    };

 /*    getAccountInfo = async () => {
        const {web3, currentAccount} = this.state;
        let x = await getAccountInfo(web3, currentAccount);
        return (
            <div className="accountinfo">
            <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
                Balance: {x.balance}
            </Box>
        </div>)
    };*/

    //functions here
    //@ToDo once an account is selected in menu canvas: highlight node in node canvas
    //@Todo once an account is selected in menu canvas: insert account information into text fields


    render() {
        const {currentAccount} = this.state;
/*
        getAccountInfo(this.state.web3, this.state.currentAccount).then(console.log)
*/

        return (
            <div className="infocanvas">
                <h2>Account/Contract Info</h2>
                <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
                    {currentAccount}
                </Box>
             {/*   <getAccountInfo />*/}
            </div>
        );
    }
}

export default InfoCanvas;
