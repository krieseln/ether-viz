import React from 'react';

export default async function changeValueTo(accounts, contract) {

    let newno = document.getElementById("changeValueTo").value;
    if(newno != null){
        console.log("changedValueto", newno)
        await contract.methods.set(parseInt(newno)).send({from: accounts[0]});
    } else {
        console.log("value is null");
    };

};