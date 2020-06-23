import React, {Component} from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Web3 from "web3";
import "./App.css";
import NodeCanvas from './Components/NodeCanvas'
import BlockchainCanvas from "./Components/BlockchainCanvas";
import TerminalCanvas from "./Components/TerminalCanvas";
import getAccountInfo from './Functions/getAccountInfo';
import SendMenu from "./Components/SendMenu";
import MenuCanvas from "./Components/MenuCanvas";
import InfoCanvas from "./Components/InfoCanvas";
import MiningPoolCanvas from "./Components/MiningPoolCanvas";
import GraphCanvas from "./Components/GraphCanvas";
import TransactionFeed from './Components/TransactionFeed';


import createNodeCanvasData from "./Functions/createNodeCanvasData";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storageValue: 0,
            web3: null,
            debug: null,
            accounts: null,
            contract: null,
            currentAccount: null,
            networkId: null,
            deployedNetwork: null,
            nodes: null,
            nodeConvasData: null,
            selectedNode: null
        }
    }

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            // --> Browser-Fenster wird gebaut


            const node1Provider = new Web3.providers.HttpProvider(
                "http://127.0.0.1:8545"
            );

            const node2Provider = new Web3.providers.HttpProvider(
                "http://127.0.0.1:8547"
            );

            const miner1Provider = new Web3.providers.HttpProvider(
                "http://127.0.0.1:8549"
            );

            const miner2Provider = new Web3.providers.HttpProvider(
                "http://127.0.0.1:8551"
            );

            const miner3Provider = new Web3.providers.HttpProvider(
                "http://127.0.0.1:8553"
            );


            const nodes = [];
            const accountsPerNode = [];

            const web3 = new Web3(node1Provider);
            const node2 = new Web3(node2Provider);
            const miner1 = new Web3(miner1Provider);
            const miner2 = new Web3(miner2Provider);
            const miner3 = new Web3(miner3Provider);

            nodes.push({"name": "geth", "instance": web3});
            nodes.push({"name": "node1", "instance": node2});
            nodes.push({"name": "miner1", "instance": miner1});
            nodes.push({"name": "miner2", "instance": miner2});
            nodes.push({"name": "miner3", "instance": miner3});


            for (let node of nodes) {
                accountsPerNode.push({"name": node.name, "accounts": await node.instance.eth.getAccounts()});
            }

            // Use web3 to get the user's accounts.
            // --> User-Account wird abgerufen #1
            const accounts = [];

            for (let acc of accountsPerNode) {
                for (let i = 0; i <= acc.accounts.length; i++) {
                    if (acc.accounts[i] != null && acc.accounts[i] !== undefined)
                        accounts.push(acc.accounts[i]);
                }
            }

            const currentAccount = accounts[0];
            const selectedNode = nodes[0];

            // Get the contract instance.
            // --> Contract (Transaktionsdetails werden abgerufen) #2
            const networkId = await web3.eth.net.getId();

            // --> Netzwerk zu Contract wird aufgerufen
            const deployedNetwork = SimpleStorageContract.networks[networkId];

            //--> Neue Instanz des Contracts wird erzeugt
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            // @todo--> set address the contract calls. Is set to account for now
            instance.options.address = accounts[0];

            const nodeCanvasData = createNodeCanvasData(nodes, accountsPerNode, instance, currentAccount);

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({
                web3,
                accounts: accounts,
                contract: instance,
                currentAccount: currentAccount,
                networkId: networkId,
                deployedNetwork: deployedNetwork,
                nodes: nodes,
                selectedNode: selectedNode,
                nodeCanvasData: nodeCanvasData
            }, this.runExample);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };


    //TESTDURCHLAUF für Contract
    runExample = async () => {
        const {accounts, contract} = this.state;

        // Stores a given value, 5 by default.

        let oldValue = await contract.methods.get().call();
        if (oldValue == null) {
            await contract.methods.set(40).send({from: this.state.currentAccount});
        } else {
            await contract.methods.set(oldValue).send({from: this.state.currentAccount});
        }

        // Get the value from the contract to prove it worked.
        const response = await contract.methods.get().call();


        //nodeinfo
        const nodeinfo = await this.state.web3.eth.getNodeInfo();

        // Update state with the result.
        this.setState({storageValue: response, nodeinfo: nodeinfo});
    };

    handleOnAccountClick = (props) => {
        this.setState({currentAccount: this.state.accounts[props]})
    };

    handleNodeClick = (nodeId) => {
        const {nodes} = this.state;
        let selectedNode = nodes.find(n => (n.name == nodeId));



        if (selectedNode != null || selectedNode != undefined) {
            this.setState({selectedNode: selectedNode})
        }
    };

    /*   getNodeInfo = (account) => {
           getAccountInfo(this.state.web3, account);
       };*/


    render() {
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            <div className="App container">
                {/*<DrawerMenu
                    web3={this.state.web3}
                    accounts={this.state.accounts}
                    contract={this.state.contract}
                    storageValue={this.state.storageValue}
                    currentAccount={this.state.currentAccount}
                    handleOnAccountClick={this.handleOnAccountClick}

                />*/}
                <MenuCanvas
                    web3={this.state.web3}
                    accounts={this.state.accounts}
                    contract={this.state.contract}
                    currentAccount={this.state.currentAccount}
                    handleOnAccountClick={this.handleOnAccountClick}
                />
                <SendMenu
                    web3={this.state.web3}
                    accounts={this.state.accounts}
                    handleOnAccountClick={this.handleOnAccountClick}
                />
                <GraphCanvas
                    data={this.state.nodeCanvasData}
                    handleNodeClick={this.handleNodeClick}
                />
                {/*
                <NodeCanvas
                    accounts={this.state.accounts}
                    currentAccount={this.state.currentAccount}
                    getNodeInfo={this.getNodeInfo}
                    contract={this.state.contract}
                    nodes={this.state.nodes}
                />
                */}
                <TransactionFeed
                    selectedNode={this.state.selectedNode}
                />
                <BlockchainCanvas
                    web3={this.state.selectedNode.instance}
                />
                <MiningPoolCanvas
                />
                {/*<TerminalCanvas
                    storageValue={storageValue}
                    web3={web3}
                    accounts={accounts}
                    contract={contract}
                    currentAccount={currentAccount}
                    nodeinfo={nodeinfo}
                />*/}
                <InfoCanvas
                    web3={this.state.web3}
                    accounts={this.state.accounts}
                    contract={this.state.contract}
                    currentAccount={this.state.currentAccount}
                />
            </div>
        );
    }
}

export default App;
