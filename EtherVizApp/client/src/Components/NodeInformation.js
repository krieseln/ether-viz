import React from "react";

class NodeInformation extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedNode: props.selectedNode,
            blur: true,
            className: "transactionfeed blurry"

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.selectedNode !== this.state.selectedNode){
            this.setState({selectedNode: this.props.selectedNode});
        }
    };

    blurCanvas = (event) => {
        console.log(event.target.className)
        if (event.target.className.includes("transactionfeed")) {
            this.setState({
                blur: (!this.state.blur),
                className: this.state.blur ? "transactionfeed" : "transactionfeed blurry"
            })
        }
    };

    render(){

        return(
            <div className={this.state.className} onClick={(event) => this.blurCanvas(event)}>
                <span>node: {this.state.selectedNode.name} on {this.state.selectedNode.instance._provider.host} </span>
            </div>
        )

    }
}

export default NodeInformation;