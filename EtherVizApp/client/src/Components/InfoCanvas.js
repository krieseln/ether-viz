import TextField from "@material-ui/core/TextField";
import React from "react";

class InfoCanvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            web3: props.web3,
            accounts: props.accounts,
            contract: props.contract,
        }
    }

    //functions here
    //@ToDo once an account is selected in menu canvas: highlight node in node canvas
    //@Todo once an account is selected in menu canvas: insert account information into text fields


    render() {
        const {accounts} = this.state;

        return (
            <div className="infocanvas">
                <div>
                    <h2>Account/Contract Info</h2>
                </div>
                <div>
                    <TextField style={{width: "100%", backgroundColor: "white"}} id="filled-basic"
                               label="" variant="filled" />
                </div>
                <div>
                    <TextField style={{width: "100%", backgroundColor: "white"}} id="filled-basic"
                               label="" variant="filled" />
                </div>
                <div>
                    <TextField style={{width: "100%", backgroundColor: "white"}} id="filled-basic"
                               label="" variant="filled" />
                </div>
                <div>
                    <TextField style={{width: "100%", backgroundColor: "white"}} id="filled-basic"
                               label="" variant="filled" />
                </div>
                <div>
                    <TextField style={{width: "100%", backgroundColor: "white"}} id="filled-basic"
                               label="" variant="filled" />
                </div>
                <div>
                    <TextField style={{width: "100%", backgroundColor: "white"}} id="filled-basic"
                               label="" variant="filled" />
                </div>
                <div>
                    <TextField style={{width: "100%", backgroundColor: "white"}} id="filled-basic"
                               label="" variant="filled" />
                </div>
            </div>
        );
    }
}

export default InfoCanvas;
