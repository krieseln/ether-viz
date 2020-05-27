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



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    }
}));

export default function DrawerMenu(props) {
    const classes = useStyles();
    const accounts = props.accounts;
    const contract = props.contract;
    const getAccounts = props.getAccounts;
    const changeValueTo = props.changeValueTo;
    const lastValue = contract.methods.get().call();

    return (
        <div className="menucanvas">
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <ListSubheader>Actions</ListSubheader>
                    <ListItem button key="getAccountsAction" onClick={getAccounts(props.web3)}>
                        <ListItemIcon><AccountTreeIcon/></ListItemIcon>
                        <ListItemText primary="Get Accounts"/>
                    </ListItem>

                    <Divider/>

                    <ListItem>
                        <TextField id="changeValueTo" label="Change No"/>
                    </ListItem>
                    <ListItem button key="commitChangeValueTo" onClick={changeValueTo(accounts, contract)}>
                        <ListItemText primary="Change Value"/>
                    </ListItem>
                    <ListItem key="savedValue">
                        <ListItemText primary="123fake" />
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