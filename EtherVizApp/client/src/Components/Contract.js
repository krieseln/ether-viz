import React from 'react';
import DescriptionIcon from '@material-ui/icons/Description';
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

class Contract extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEL: null,
            anchorMethodBox: null
        }
    };

    handleClick = (event) => {
        this.setState({anchorEL: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEL: null});
    };

    getContractInfo = () => {
     /*   console.log(
            this.props.contract.options
        )*/

    };

    showContractMethods = () => {
    /*    console.log(
            this.props.contract.options.jsonInterface
        )*/

    };


    render() {
        const {contract} = this.props;

        return (
            <div className="contractItem">
                <Tooltip title={contract._address} interactive>
                    <DescriptionIcon
                        className={contract._address}
                        style={{fontSize: 30}}
                        color="black"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    />
                </Tooltip>
                <Menu
                    id="contractMenu"
                    anchorEl={this.state.anchorEL}
                    keepMounted
                    open={Boolean(this.state.anchorEL)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.getContractInfo}>Contract Info</MenuItem>

                    <MenuItem onClick={this.showContractMethods}>Methods</MenuItem>
                    <MenuItem onClick={this.handleClose}>Send Ether</MenuItem>
                    <MenuItem onClick={this.handleClose}>{contract._address}</MenuItem>
                </Menu>
            </div>
        )
    }
}

export default Contract;