import React from "react";
import TextField from "@material-ui/core/TextField";

class MiningPoolCanvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {


        return(
           <div className="miningpoolcanvas">
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