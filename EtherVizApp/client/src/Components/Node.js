import React from 'react';
import AdjustIcon from '@material-ui/icons/Adjust';
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";


class Node extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentAccount: props.currentAccount,
            accountHash: props.accountHash,
            iconColor: "primary",
            anchorEL: null
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentAccount !== this.state.currentAccount) {
            this.setState({currentAccount: this.props.currentAccount});
        }
    };

    isSelectedAccount = () => {
        const {accountHash, currentAccount} = this.state;

        if (accountHash === currentAccount) {
            return "primary"
        } else {
            return "disabled"
        }
    };

    handleClick = (event) => {
        this.setState({anchorEL: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEL: null});
    };

    getNodeInfo = (account) => {
        this.handleClose();
        this.props.getNodeInfo(account);
    }

    render() {
        const {accountHash} = this.state;

        return (
            <div>
                <Tooltip title={accountHash} interactive>
                    <AdjustIcon
                        color={this.isSelectedAccount()}
                        className={accountHash}
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    />
                </Tooltip>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEL}
                    keepMounted
                    open={Boolean(this.state.anchorEL)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={() => this.getNodeInfo(accountHash)}>NodeInfo</MenuItem>
                    <MenuItem onClick={this.handleClose}>Info</MenuItem>
                    <MenuItem onClick={this.handleClose}>Send Ether</MenuItem>
                    <MenuItem onClick={this.handleClose}>{accountHash}</MenuItem>

                </Menu>
            </div>
        )
    }
}

export default Node;