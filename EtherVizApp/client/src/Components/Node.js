import React from 'react';
import AdjustIcon from '@material-ui/icons/Adjust';
import Tooltip from "@material-ui/core/Tooltip";


class Node extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentAccount: props.currentAccount,
            accountHash: props.accountHash,
            iconColor: "primary"
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.currentAccount !== this.state.currentAccount){
            this.setState({currentAccount: this.props.currentAccount});
        }
    };

    isSelectedAccount = () => {
        const {accountHash, currentAccount} = this.state;

        if(accountHash == currentAccount){
            return "primary"
        } else {
            return "disabled"
        }
    };

    render() {
        const {accountHash} = this.state;

        return (
            <div>
                <Tooltip title={accountHash} arrow>
                    <AdjustIcon color={this.isSelectedAccount()} className={accountHash}/>
                </Tooltip>
            </div>
        )
    }
};

export default Node;