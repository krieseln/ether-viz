import nodeLogo from '../Components/Ethereum_logo.svg'
import accountLogo from '../Components/Private-Key-Icon.svg'

export default function createNodeCanvasData(tempNodes, tempAccounts, tempContracts, tempCurrentAccount) {

    let nodes = [];
    let links = [];

    for (let i = 0; i < tempAccounts.length; i++) {
        nodes.push({id: tempAccounts[i].name, symbolType: "node", svg: nodeLogo});

        for (let accountIter = 0; accountIter < tempAccounts[i].accounts.length; accountIter++) {

            if(tempAccounts[i].accounts[accountIter] === tempCurrentAccount){
                nodes.push({
                    id: tempAccounts[i].accounts[accountIter],
                    symbolType: "account",
                    svg: accountLogo,
                    size: 400
                });
            }

            nodes.push({
                id: tempAccounts[i].accounts[accountIter],
                symbolType: "account",
                svg: accountLogo
            });

            links.push({
                source: tempAccounts[i].name,
                target: tempAccounts[i].accounts[accountIter]
            })
        }

        let act = i;
        let after = i + 1;

        if (tempAccounts[after]) {
            links.push({
                source: tempAccounts[act].name,
                target: tempAccounts[after].name
            })
        } else {
            links.push({
                source: tempAccounts[act].name,
                target: tempAccounts[0].name
            })
        }
    }

    let data = {};
    if (!nodes || !links) {
        data = {"data": "empty"};
    } else {
        data = {nodes, links};
    }
    //console.log("nodeCanvasData", data);
    return data;

}