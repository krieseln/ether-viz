import nodeLogo from '../Components/Ethereum_logo.svg'
import accountLogo from '../Components/Private-Key-Icon.svg'

export default function createNodeCanvasData(tempNodes, tempAccounts, tempContracts, tempCurrentAccount) {

    const tempData = {
        nodes: [{id: "geth", symbolType: "node", svg: nodeLogo},
            {id: "miner", symbolType: "node"},
            {id: "0x123...", symbolType: "account"},
            {id: "0x321...", symbolType: "contract"}
        ],
        links: [{source: "geth", target: "0x123..."},
            {source: "0x123...", target: "0x321..."}
        ],
    };


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

    let data = {};
    if (!nodes || !links) {
        data = {"data": "empty"};
    } else {
        data = {nodes, links};
    }
    //console.log("nodeCanvasData", data);
    return data;

}