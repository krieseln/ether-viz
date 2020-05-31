import React from 'react';

export default async function getAccounts(web3){
     return await web3.eth.getAccounts();
}