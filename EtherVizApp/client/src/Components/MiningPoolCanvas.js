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
                   <TextField style={{width: "100%", backgroundColor: "white"}} id="filled-basic"
                              label="Hash rate" variant="filled" />
               </div>
               <div>
                   <TextField style={{width: "100%", backgroundColor: "white"}} id="filled-basic"
                              label="active miners" variant="filled" />
               </div>
               <div>
                   <TextField style={{width: "100%", backgroundColor: "white"}} id="filled-basic"
                              label="blocks" variant="filled" />
               </div>
           </div>
        )
    }
}

export default MiningPoolCanvas;