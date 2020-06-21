import React from 'react';
import BathtubIcon from '@material-ui/icons/Bathtub';

class Client extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            clientInfo: props.clientInfo
        }
    }




    render(){
        return(
            <div className={"testclient"}>
                <BathtubIcon />
            </div>
        )
    }

}

export default Client;