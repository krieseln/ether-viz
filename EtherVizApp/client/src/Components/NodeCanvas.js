import React from 'react';
import LineTo from 'react-lineto';
import AdjustIcon from '@material-ui/icons/Adjust';

import Contract from "./Contract";
import Node from './Node';

class NodeCanvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: props.accounts,
            currentAccount: props.currentAccount
        };
        const zIndex = 1;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.currentAccount !== this.state.currentAccount){
            this.setState({currentAccount: this.props.currentAccount});
        }
    };

    render() {
        const {currentAccount, accounts, zIndex} = this.state;


        return (

            <div className="nodecanvas">
                <div className="accountlist">
                    {accounts.map((accountHash, index) => (
                        <Node
                            accountHash={accountHash}
                            currentAccount={currentAccount}

                        />
                    ))}
                </div>
                {accounts.map((item, index) => (
                    <LineTo borderColor="black" zIndex={zIndex} from={accounts[index]} to={accounts[index - 1]}/>
                ))}

                <AdjustIcon variant="contained" className="A">Element A</AdjustIcon>
                <AdjustIcon variant="contained" className="B">Element B</AdjustIcon>
                <p>
                    <AdjustIcon variant="contained" className="C">Element C</AdjustIcon>
                </p>

                <p>
                    <Contract className="contractA"/>
                </p>
                <LineTo borderColor="black" from="A" to="B"/>
                <LineTo zIndex={zIndex} from="C" to="A"/>
                <LineTo zIndex={zIndex} from="B" to="contractA"/>
            </div>
        )
    };
}

export default NodeCanvas;
