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
            pendingBlock: props.pendingBlock

        };

    }

    render() {
        const {blockInfo, pendingBlock} = this.state;
        console.log("blockInfo", blockInfo);
        console.log("pendingBlock", pendingBlock);

        const pendingFlag = (blockInfo.hash === pendingBlock.hash) ? "grey" : "white";

        return (
            //@todo add blockno as className
            <div style={{width: "20%", float: "left", padding: "10px", color: {pendingFlag}}} className={"container_" + blockInfo.hash} id={blockInfo.number}>

                <TableContainer id={blockInfo.hash} component={Paper}>
                    <Table className="blockTable" size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Attribute</TableCell>
                                <TableCell align="right">Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key="Blockname">
                                <TableCell align="left">{"Blockname"}</TableCell>
                                <TableCell align="right">{blockInfo.number}</TableCell>
                            </TableRow>

                            <TableRow key="Blockhash">
                                <TableCell align="left">{"Blockhash"}</TableCell>
                                <Tooltip title={blockInfo.hash}>
                                    <TableCell align="right">{blockInfo.hash.substr(0, 8) + "..."}</TableCell>
                                </Tooltip>
                            </TableRow>

                            <TableRow key="Blockname">
                                <TableCell align="left">{"parent hash"}</TableCell>
                                <Tooltip title={blockInfo.parentHash}>
                                    <TableCell align="right">{blockInfo.parentHash.substr(0, 8) + "..."}</TableCell>
                                </Tooltip>

                            </TableRow>

                            <TableRow key="Blockname">
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