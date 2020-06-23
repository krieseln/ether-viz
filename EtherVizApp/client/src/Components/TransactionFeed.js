import React from "react";

class TransactionFeed extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedNode: props.selectedNode
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.selectedNode !== this.state.selectedNode){
            this.setState({selectedNode: this.props.selectedNode});
        }
    };

    render(){

        return(
            <div className="transactionfeed" id="transactionfeed">
                <p>node: {this.state.selectedNode.name} on {this.state.selectedNode.instance._provider.host} </p>
            </div>
        )

    }
}

export default TransactionFeed;