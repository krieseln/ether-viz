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
        console.log(this.state.selectedNode);

        return(
            <div className="transactionfeed" id="transactionfeed">
                <p>returns all transactions of node {this.state.selectedNode.name}</p>
            </div>
        )

    }
}

export default TransactionFeed;