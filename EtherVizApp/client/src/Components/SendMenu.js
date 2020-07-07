import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import FormControl from "@material-ui/core/FormControl";
import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import sendEthereum from "../Functions/sendEthereum";

class SendMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            web3: props.web3,
            accounts: props.accounts,
            toAccounts: props.toAccounts,
            handleOnAccountClick: props.handleOnAccountClick,
            from: null,
            to: null,
            blur: true,
            className: "sendmenucanvas blurry"


        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.web3 !== this.state.web3){
            this.setState({web3: this.props.web3,
            accounts: this.props.accounts
            });
        }
        //console.log("SendMenu componentDidUpdate", this.state.web3._provider.host);
    };

    handleSendClick = () => {
        const {web3, from, to, amount} = this.state;
        console.log("handleSendClick", web3._provider);
        sendEthereum(web3, from, to, amount);
        console.log("handleSendClick", from, to, amount);
    };

    handleFromChange = (event) => {
        this.setState({from: event.target.value});
    };
    handleToChange = (event) => {
        this.setState({to: event.target.value});
    };

    handleAmountChange = (event) => {
        this.setState({amount: event.target.value});
        console.log("amount changed to", event.target.value);
    };

    //@ToDo from account selected source account should be greyed out in the scond drop down menu
    //@ToDo text field should only be able to hold numbers and a dot (letters and further points are not allowed)
    //@ToDo send button should execute the transaction

    blurCanvas = (event) => {
        console.log(event.target.className);
        if (event.target.className.includes("sendmenucanvas")) {
            this.setState({
                blur: (!this.state.blur),
                className: this.state.blur ? "sendmenucanvas" : "sendmenucanvas blurry"
            })
        }
    };

    render() {
        const {accounts, className, toAccounts} = this.state;

        return (
        <div className={className}
             onClick={(event) => this.blurCanvas(event)}
        >
            <List>
                <ListSubheader style={{fontSize: "large", fontStyle: "bold"}}>send ETH</ListSubheader>
                <ListItem>
                    <FormControl>
                        <InputLabel htmlFor="from-selection">From</InputLabel>
                        <NativeSelect
                            onChange={this.handleFromChange}
                            id="send-from-account-dropdown">
                            <option/>
                            {accounts.map((accountHash, index) => (
                                <option value={accountHash}>{accountHash}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </ListItem>
                <ListItem>
                    <FormControl>
                        <InputLabel style={{color: "black"}} htmlFor="to-selection">To</InputLabel>
                        <NativeSelect
                            onChange={this.handleToChange}
                            id="send-to-account-dropdown">
                            <option/>
                            {toAccounts.map((account, index) => (
                                    <option value={account.hash}>{account.hash}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </ListItem>
                <ListItem>
                    <TextField style={{width: "100%", backgroundColor: "white"}} id="filled-basic" label="ETH amount" variant="filled" onChange={this.handleAmountChange} />
                </ListItem>
                <ListItem>
                    <Button onClick={this.handleSendClick} style={{width: "100%"}} variant="contained">Send</Button>
                </ListItem>
            </List>
        </div>
        );
    }
}
export default SendMenu;