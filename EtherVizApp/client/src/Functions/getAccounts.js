import React from 'react';

export default function getAccounts(web3){
    const accounts = web3.eth.getAccounts();
    return accounts;
}