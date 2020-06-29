import nodeLogo from '../Components/BlockchainComponents/sprites/Ethereum_logo.svg'
import accountLogo from '../Components/BlockchainComponents/sprites/Private-Key-Icon.svg'
import smartcontractLogo from '../Components/BlockchainComponents/sprites/smartcontract.svg'

export default function createNodeCanvasData(tempNodes, tempAccounts, contracts) {




    let nodes = [];
    let links = [];

    for (let i = 0; i < tempAccounts.length; i++) {
        nodes.push({id: tempAccounts[i].name, symbolType: "node", svg: nodeLogo});

        for (let accountIter = 0; accountIter < tempAccounts[i].accounts.length; accountIter++) {
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

    for(let ci = 0; ci < contracts.length; ci++){
        nodes.push({
            id: contracts[ci].id + "_contract",
            symbolType: "smartcontract",
            svg: smartcontractLogo,
            size: 400
        });

        links.push({
            source: contracts[ci].id + "_contract",
            target: contracts[ci].instance._address
        });
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