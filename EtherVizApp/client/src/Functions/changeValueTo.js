import React from 'react';

export default async function changeValueTo(accounts, contract) {

    let newno = parseInt(document.getElementById("changeValueTo").value);
    if(newno != null){
        await contract.methods.set(newno).send({ from: accounts[0]});
        window.location.reload();
    };

};