import React from "react";
import TextField from "@material-ui/core/TextField";

class MiningPoolCanvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blur: true,
            className: "miningpoolcanvas"

        }
    }

    blurCanvas = (event) => {
        if (event.target.className.includes("miningpoolcanvas")) {
            this.setState({
                blur: !this.state.blur,
                className: this.state.blur ? "miningpoolcanvas" : "miningpoolcanvas blurry"
            })
        }
    };

    render() {


        return (
            <div className={this.state.className} onClick={(event) => this.blurCanvas(event)}>
                <div>
                    <p>Smart Contract</p>
                    <table>
                        <tr>
                            <th>Owner:</th>
                            <th>Jens</th>
                        </tr>
                        <tr>
                            <th>Value:</th>
                            <th>120 Eth</th>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}

export default MiningPoolCanvas;