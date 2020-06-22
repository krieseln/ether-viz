import getAccounts from "../Functions/getAccounts";
import changeValueTo from "../Functions/changeValueTo";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";

import React from "react";

class MenuCanvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            web3: props.web3,
            accounts: props.accounts,
            contract: props.contract,
            currentAccount: props.currentAccount,
            handleOnAccountClick: props.handleOnAccountClick
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.currentAccount !== this.state.currentAccount){
            this.setState({currentAccount: this.props.currentAccount});
        }
    };

    handleGetAccounts = () => {
        getAccounts(this.state.web3).then(console.log);
    };

    handleChangeValueClick = () => {
        changeValueTo(this.state.accounts, this.state.contract);
    };

    render() {
        const {accounts, currentAccount, handleOnAccountClick} = this.state;

        return (
            <div className="menucanvas">
                <List>
                    <ListSubheader>Accounts</ListSubheader>
                    <ListItem key="currentAccount">
                        <ListItemText
                            primary={currentAccount.substr(currentAccount.length - 6, currentAccount.length)}/>
                    </ListItem>
                    <Divider/>
                    {accounts.map((currentValue, index) => (
                        <Tooltip title={currentValue} arrow>
                            <ListItem
                                button
                                onClick={() => handleOnAccountClick(index)}
                                key={currentValue.substr(currentValue.length - 6, currentValue.length)}>
                                <ListItemText primary={currentValue.substr(currentValue.length - 6, currentValue.length)}/>
                            </ListItem>
                        </Tooltip>
                    ))}
                </List>
            </div>
        )
    }
}

export default MenuCanvas;