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
            accounts: props.accounts,
            currentAccount: props.currentAccount,
            handleOnAccountClick: props.handleOnAccountClick,
            blur: false,
            className: "menucanvas"
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentAccount !== this.state.currentAccount) {
            this.setState({currentAccount: this.props.currentAccount});
        }
    };

    blurCanvas = (event) => {
        if (event.target.className.includes("menucanvas")) {
            this.setState({
                blur: (!this.state.blur),
                className: this.state.blur ? "menucanvas" : "menucanvas blurry"
            })
        }
    };


    render() {
        const {accounts, currentAccount, handleOnAccountClick, className} = this.state;
        return (
            <div
                className={className}
                onClick={(event) => this.blurCanvas(event)}
            >
                <List>
                    <ListSubheader>Accounts</ListSubheader>
                    <ListItem key="currentAccount">
                        <ListItemText
                            primary={"..." + currentAccount.substr(currentAccount.length - 6, currentAccount.length)}/>
                    </ListItem>
                    <Divider/>
                    {accounts.map((currentValue, index) => (
                        <Tooltip title={currentValue.alias} arrow>
                            <ListItem
                                button
                                onClick={() => handleOnAccountClick(index)}
                                key={currentValue.alias + "_" + index}>
                                <ListItemText primary={currentValue.alias}/>
                            </ListItem>
                        </Tooltip>
                    ))}
                </List>
            </div>
        )
    }
}

export default MenuCanvas;