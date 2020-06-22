import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import FormControl from "@material-ui/core/FormControl";
import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


class SendMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: props.accounts,
            handleOnAccountClick: props.handleOnAccountClick

        }
    }


    render() {
        const {accounts, handleOnAccountClick} = this.state;

        return (
        <div className="sendmenucanvas">
            <List>
                <ListSubheader style={{fontSize: "large", fontStyle: "bold"}}>send ETH</ListSubheader>
                <ListItem>
                    <FormControl>
                        <InputLabel htmlFor="from-selection">From</InputLabel>
                        <NativeSelect id="send-from-account-dropdown">
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
                        <NativeSelect id="send-to-account-dropdown">
                            <option/>
                            {accounts.map((accountHash, index) => (
                                    <option value={accountHash}>{accountHash}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </ListItem>
                <ListItem>
                    <TextField style={{width: "100%", backgroundColor: "white"}} id="filled-basic" label="ETH amount" variant="filled" />
                </ListItem>
                <ListItem>
                    <Button style={{width: "100%"}} variant="contained">Send</Button>
                </ListItem>
            </List>
        </div>
        );
    }
}
export default SendMenu;