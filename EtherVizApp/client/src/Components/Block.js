import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        width: '50%'
    }
})

function createData(attribute, value) {
    return { attribute, value };
}

const rows = [
    createData('Block Name', 'Block 001'),
    createData('Block Hash', 'asdver423'),
    createData('Prev Block Hash','dfsdfsdf3223'),
    createData('Transaction', '3kfljdhf32k3'),
    createData('NONCE', 0o1)
];

// @todo --> use data from './Functions/getBlock.js'

export default function DenseTable() {
    const classes = useStyles();

    return (
        <div className="block">
            <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Attribute</TableCell>
                        <TableCell align="right">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell align="left">{row.attribute}</TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
}