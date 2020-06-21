import React from 'react';
import LineTo from 'react-lineto';
import Node from './Node';
import Contract from './Contract';
import Client from './Client';

class NodeCanvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: props.accounts,
            currentAccount: props.currentAccount,
            nodes: props.nodes
        };
        const zIndex = 1;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentAccount !== this.state.currentAccount) {
            this.setState({currentAccount: this.props.currentAccount});
        }
    };

    render() {
        const {currentAccount, accounts, zIndex, nodes} = this.state;


        return (

            <div className="nodecanvas">
                <div className="clients">
                    {nodes.map((clientInfo, index) => (
                        <Client clientInfo={clientInfo}/>
                    ))}
                </div>
                <div className="accountlist">
                    {accounts.map((accountHash, index) => (
                        <Node
                            accountHash={accountHash}
                            currentAccount={currentAccount}
                            getNodeInfo={this.props.getNodeInfo}
                        />
                    ))}
                </div>
                <div className="contractList">
                    <Contract
                        contract={this.props.contract}
                    />
                </div>
                {accounts.map((item, index) => (
                    <LineTo borderColor="black" zIndex={zIndex} from={accounts[index]} to={accounts[index - 1]}/>
                ))}
            </div>
        )
    };
}

export default NodeCanvas;
