import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

export default function DrawerMenu(props) {
    const web3 = props.web3;
    const accounts = props.accounts;
    const contract = props.contract;
    let lastVal = null;

    const handleAccountOnClick = () => {
        getAccounts(props.web3).then(console.log);
    }

    const handleChangeValueClick = () => {
        changeValueTo(accounts, contract);
        console.log("set value to:", getLastValue());
    };

    const getLastValue = async () => {
        await contract.methods.get().call()
            .then(function(result){console.log(result); setValue(result)},
                function(err){console.log(err);});
    };

    const setValue = (res) => {
        console.log("setValue call with", res);
        lastVal = res;
    }


    return (
        <div className="menucanvas">
            <Drawer
                className="menucanvas"
                variant="permanent"
                anchor="left"
                width="15%"
            >
                <div className="drawermenu" />
                <Divider />
                <List>
                    <ListSubheader>Actions</ListSubheader>
                    <ListItem button key="getAccountsAction" onClick={handleAccountOnClick}>
                        <ListItemIcon><AccountTreeIcon/></ListItemIcon>
                        <ListItemText primary="Get Accounts"/>
                    </ListItem>

                    <Divider/>

                    <ListItem>
                        <TextField id="changeValueTo" label="Change No"/>
                    </ListItem>
                    <ListItem button key="commitChangeValueTo" onClick={handleChangeValueClick}>
                        <ListItemText primary="Change Value"/>
                    </ListItem>
                    <ListItem key="savedValue" >
                        <ListItemText primary={lastVal}/>
                    </ListItem>

                </List>
                <Divider />
                <List>
                    <ListSubheader>Accounts</ListSubheader>
                    {accounts.map((text, index) => (
                        <Tooltip title={text} arrow>
                        <ListItem button key={text.substr(text.length - 6, text.length)}>
                            <ListItemText primary={text.substr(text.length - 6, text.length)} />
                        </ListItem>
                        </Tooltip>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}