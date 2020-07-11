import React from "react";
import TextField from "@material-ui/core/TextField";

class SmartContractCanvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contractOwner: props.contractOwner,
            insurance: false,

            blur: true,
            className: "smartcontractcanvas"

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.contractOwner !== this.state.contractOwner) {
            this.setState({contractOwner: this.props.contractOwner,
                insurance: this.props.insurance
            });
        }
    };


    blurCanvas = (event) => {
        if (event.target.className.includes("smartcontractcanvas")) {
            this.setState({
                blur: !this.state.blur,
                className: this.state.blur ? "smartcontractcanvas" : "smartcontractcanvas blurry"
            })
        }
    };

    render() {
        const {contractOwner, insurance} = this.state;

        return (
            <div className={this.state.className} onClick={(event) => this.blurCanvas(event)}>
                <div>
                    <p className="headline">CONTRACT CONTENT</p>
                    <table align="left">
                        <tr>
                            <th>Owner</th>
                            <th>{contractOwner.toString().substr(contractOwner.length-6, contractOwner.length)}</th>
                        </tr>
                        <tr>
                            <th>Value</th>
                            <th>120 Eth</th>
                        </tr>
                        <tr>
                            <th>Chassis number</th>
                            <th>WB10A0400G</th>
                        </tr>
                        <tr>
                            <th>Insurance</th>
                            <th>{insurance ? "true" : "false"}</th>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}

export default SmartContractCanvas;