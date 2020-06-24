import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from "@material-ui/core/Tooltip";


class Block extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            web3: props.web3,
            blockInfo: props.blockInfo,
            latestBlockNumber: props.latestBlockNumber
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.blockInfo !== this.state.blockInfo) {
            this.setState({blockInfo: this.props.blockInfo, latestBlockNumber: this.props.latestBlockNumber});
        }
    };

    render() {
        const {blockInfo, latestBlockNumber} = this.state;

        const flagIsLatestBlock = (blockInfo.number === latestBlockNumber) ? "#dedede" : "white";
        const flagIsPendingBlock = (!blockInfo.hash) ? "#fcc2c2" : "white";

        return (
                <div style={{width: "22%", float: "left", margin: "10px"}} className={"container_" + blockInfo.hash}
                     title={blockInfo.number}>
                    <TableContainer
                        component={Paper}
                        style={{background: (flagIsPendingBlock === "#fcc2c2") ? flagIsPendingBlock : flagIsLatestBlock}}

                    >
                        <Table className="blockTable" size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Attribute</TableCell>
                                    <TableCell align="right">Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key="blockname">
                                    <TableCell align="left">{"Blockname"}</TableCell>
                                    <TableCell align="right">{blockInfo.number}</TableCell>
                                </TableRow>

                                <TableRow className={(blockInfo.hash) ? "hash_" + blockInfo.hash : "hash_empty"} key="blockhash">
                                    <TableCell align="left">{"Blockhash"}</TableCell>
                                    <Tooltip title={(blockInfo.hash) ? blockInfo.hash : "empty"}>
                                        <TableCell align="right">
                                            {(blockInfo.hash) ? (blockInfo.hash.substr(0, 8) + "...") : "empty"}
                                        </TableCell>
                                    </Tooltip>
                                </TableRow>

                                <TableRow className={"parenthash_" + blockInfo.parentHash} key="parenthash">
                                    <TableCell align="left">{"parent hash"}</TableCell>
                                    <Tooltip title={blockInfo.parentHash}>
                                        <TableCell align="right">{blockInfo.parentHash.substr(0, 8) + "..."}</TableCell>
                                    </Tooltip>

                                </TableRow>

                                <TableRow key="gaslimit">
                                    <TableCell align="left">{"GasLimit"}</TableCell>
                                    <TableCell align="right">{blockInfo.gasLimit}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
        )
    }


}


export default Block;