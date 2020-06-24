

export default async function changeValueTo(accounts, contract) {

    let newno = document.getElementById("changeValueTo").value;
    if(newno != null){
        await contract.methods.set(parseInt(newno)).send({from: accounts[0]});
        await contract.methods.get()
    } else {
        console.log("value is null");
    }

};