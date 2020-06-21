import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";
import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";


class SendMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: props.accounts
        }
    }



    render() {
        const {accounts} = this.state;

        return (
        <div className="sendmenucanvas">
            <List>
                <ListSubheader>send ETH</ListSubheader>
                <ListItem>
                    <ListItemText id="send-from-account" primary="From:"/>
                    <FormControl>
                        <InputLabel htmlFor="from-selection">From</InputLabel>
                        <NativeSelect id="send-from-account-dropdown">
                            {accounts.map((accountHash, index) => (
                                <option value={accountHash}>{accountHash}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </ListItem>
                <ListItem>
                    <ListItemText id="send-to-account" primary="From:"/>
                    <FormControl>
                        <InputLabel htmlFor="to-selection">From</InputLabel>
                        <NativeSelect id="send-to-account-dropdown">
                            {accounts.map((accountHash, index) => (
                                <option value={accountHash}>{accountHash}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </ListItem>
                <ListItem>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </ListItem>
            </List>
        </div>
        );
    }
}
export default SendMenu;