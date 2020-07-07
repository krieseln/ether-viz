import React from "react";
import TextField from "@material-ui/core/TextField";

class MiningPoolCanvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blur: true,
            className: "miningpoolcanvas blurry"

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


        return(
           <div className={this.state.className} onClick={(event) => this.blurCanvas(event)}>
               <div>
                   <TextField style={{width: "100%", backgroundColor: "white"}}
                              id="filled-basic"
                              label="Smart Contract Info"
                              variant="filled"
                              disabled={true}
                   />
               </div>
               <div>
                   <TextField
                       style={{width: "100%", backgroundColor: "white"}}
                       id="smart contract content"
                       label="smart contract content"
                       multiline
                       rows={12}
                       disabled={true}
                   />
               </div>
           </div>
        )
    }
}

export default MiningPoolCanvas;