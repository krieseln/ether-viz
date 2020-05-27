import React from 'react';


export default function Block(props){

    return (
        <div>
            <table border={2} style={{float:"left", margin: 40}} >
                <tr>
                    <th>attribute</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <th>Block Name</th>
                    <th>    //get block name </th>
                </tr>
                <tr>
                    <th>Prev Block Hash</th>
                    <th>    //hash of previous block</th>
                </tr>
                <tr>
                    <th>Transactions</th>
                    <th>    //list of stored transactions in this block</th>
                </tr>
            </table>
        </div>
    )

};