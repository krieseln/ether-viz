import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader'
import Tooltip from "@material-ui/core/Tooltip";
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import TextField from '@material-ui/core/TextField'

import changeValueTo from "../Functions/changeValueTo";
import getAccounts from "../Functions/getAccounts";
import getBlock from "../Functions/getBlock";

class DrawerMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            web3: props.web3,
            accounts: props.accounts,
            contract: props.contract,
            storageValue: props.storageValue,
            currentAccount: props.currentAccount,
            lastValue: null,
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

    handleGetBlock = () => {
        getBlock(this.state.web3);
    }

    handleChangeValueClick = () => {
        changeValueTo(this.state.accounts, this.state.contract);
    };

    getLastValue = async () => {
        const {contract, storageValue} = this.state;
        await contract.methods.get().call()
            .then(function (res) {
                    console.log(res);
                    this.setState({storageValue: res})

                },
                function (err) {
                    console.log(err);
                });
    };

    render() {
        const {accounts, currentAccount, storageValue, handleOnAccountClick} = this.state;

        return (
            <div className="menucanvas">
                <Drawer
                    className="menucanvas"
                    variant="permanent"
                    anchor="left"
                    width="15%"
                >
                    <div className="drawermenu"/>
                    <Divider/>
                    <List>
                        <ListSubheader>Actions</ListSubheader>
                        <ListItem button key="getAccountsAction" onClick={this.handleGetAccounts}>
                            <ListItemIcon><AccountTreeIcon/></ListItemIcon>
                            <ListItemText primary="Get Accounts"/>
                        </ListItem>
                        <ListItem button key="getAccountsAction" onClick={this.handleGetBlock}>
                            <ListItemIcon><AccountTreeIcon/></ListItemIcon>
                            <ListItemText primary="Get Block"/>
                        </ListItem>
                        <Divider/>

                        <ListItem>
                            <TextField id="changeValueTo" label="Change No"/>
                        </ListItem>
                        <ListItem button key="commitChangeValueTo" onClick={this.handleChangeValueClick}>
                            <ListItemText primary="Change Value"/>
                        </ListItem>
                        <ListItem key="savedValue">
                            <ListItemText primary={storageValue}/>
                        </ListItem>

                    </List>
                    <Divider/>
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
                </Drawer>
            </div>
        );
    }
}

export default DrawerMenu;