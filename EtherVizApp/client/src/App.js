import React, {Component} from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Web3 from "web3";
import "./App.css";
import BlockchainCanvas from "./Components/BlockchainComponents/BlockchainCanvas";
import SendMenu from "./Components/SendMenu";
import MenuCanvas from "./Components/MenuCanvas";
import InfoCanvas from "./Components/InfoCanvas";
import MiningPoolCanvas from "./Components/SmartContractCanvas";
import GraphCanvas from "./Components/GraphCanvas";
import NodeInformation from './Components/NodeInformation';


import createNodeCanvasData from "./Functions/createNodeCanvasData";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storageValue: 0,
            web3: null,
            debug: null,
            accounts: null,
            contracts: null,
            currentAccount: null,
            networkId: null,
            deployedNetwork: null,
            nodes: null,
            nodeConvasData: null,
            selectedNode: null,
            selectedNodeAccounts: null,
            accountsPerNode: null
        }
    }


    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            // --> Browser-Fenster wird gebaut


            const node1Provider = new Web3.providers.HttpProvider(
                "http://127.0.0.1:8545"
            );

            const node1ProviderWS = new Web3.providers.WebsocketProvider(
                "ws://127.0.0.1:8546"
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
            const contracts = [];


            /*
            const node1 = new Web3(node1Provider);
            const node2 = new Web3(node2Provider);
            const miner1 = new Web3(miner1Provider);
            const miner2 = new Web3(miner2Provider);
            const miner3 = new Web3(miner3Provider);

            nodes.push({"name": "geth", "instance": node1});
            nodes.push({"name": "node1", "instance": node1});
            nodes.push({"name": "node2", "instance": node2});
            nodes.push({"name": "miner1", "instance": miner1});
            nodes.push({"name": "miner2", "instance": miner2});
            nodes.push({"name": "miner3", "instance": miner3});
            */

            //UseCase: Buy Car from Seller. Notify State insurance to confirm transaction

            const interessenten  = new Web3(miner3Provider);
            const verkaufende = new Web3(miner1Provider);
            const staat = new Web3(node1Provider);

            nodes.push({"name": "Interessent", "instance": interessenten, "alias": "Tim"});
            nodes.push({"name": "Autohaus", "instance": verkaufende, "alias": "Jens"});
            nodes.push({"name": "Staat", "instance": staat, "alias": "Zulassungsstelle"});

            //get accounts for each node
            for (let node of nodes) {
                accountsPerNode.push({"name": node.name, "accounts": await node.instance.eth.getAccounts(), "alias": node.alias});
            }

            //array with hex of all accounts. Used to have one list of all accounts.
            const accounts = [];

            //iterate through accountsPerNode to get all accounts in one array
            for (let acc of accountsPerNode) {
                for (let i = 0; i <= acc.accounts.length; i++) {
                    if (acc.accounts[i] != null && acc.accounts[i] !== undefined)
                        accounts.push({"hash": acc.accounts[i], "alias": acc.alias});
                }
                //console.log("accounts", accounts);
            }

            //set stateSetter to instantiate in the render methods
            const currentAccount = accounts[0];
            const selectedNode = nodes[0];
            const selectedNodeAccounts = accountsPerNode.find(n => (n.name === nodes[0].name)).accounts;
            //console.log("selctedNodeAccounts in start", selectedNodeAccounts);


            // Get the contract instance.
            // --> Contract (Transaktionsdetails werden abgerufen) #2
            const networkId = await nodes[0].instance.eth.net.getId();

            // --> Netzwerk zu Contract wird aufgerufen
            const deployedNetwork = SimpleStorageContract.networks[networkId];

            //--> Neue Instanz des Contracts wird erzeugt
            const instance = new nodes[0].instance.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            // @todo--> set address the contract calls. Is set to account for now
            instance.options.address = accounts[1].hash;

            contracts.push({id: nodes[1].name, instance: instance});


            const nodeCanvasData = createNodeCanvasData(nodes, accountsPerNode, contracts);

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({
                web3: nodes[0].instance,
                accounts: accounts,
                contracts: contracts,
                currentAccount: currentAccount.hash,
                networkId: networkId,
                deployedNetwork: deployedNetwork,
                nodes: nodes,
                selectedNode: selectedNode,
                selectedNodeAccounts: selectedNodeAccounts,
                nodeCanvasData: nodeCanvasData,
                accountsPerNode: accountsPerNode

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
        const {contracts} = this.state;

        // Stores a given value, 5 by default.

        let oldValue = await contracts[0].instance.methods.get().call();
        if (oldValue == null) {
            await contracts[0].instance.methods.set(40).send({from: this.state.currentAccount});
        } else {
            await contracts[0].instance.methods.set(oldValue).send({from: this.state.currentAccount});
        }

        // Get the value from the contract to prove it worked.
        const response = await contracts[0].instance.methods.get().call();


        //nodeinfo
        const nodeinfo = await this.state.web3.eth.getNodeInfo();

        // Update state with the result.
        this.setState({storageValue: response, nodeinfo: nodeinfo});
    };

    handleOnAccountClick = (props) => {
        this.setState({currentAccount: this.state.accounts[props].hash})
    };

    handleNodeClick = (nodeId) => {
        const {nodes, accountsPerNode} = this.state;
        let selectedNode = nodes.find(n => (n.name === nodeId));

        if (selectedNode != null || selectedNode !== undefined) {
            let selectedNodeAccounts = accountsPerNode.find(n => (n.name === nodeId)).accounts;

            this.setState({
                selectedNode: selectedNode,
                selectedNodeAccounts: selectedNodeAccounts
            })
        }
    };



    render() {
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            <div className="App container">
                <MenuCanvas
                    accounts={this.state.accounts}
                    currentAccount={this.state.currentAccount}
                    handleOnAccountClick={this.handleOnAccountClick}
                />
                <SendMenu
                    web3={this.state.selectedNode.instance}
                    toAccounts={this.state.accounts}
                    accounts={this.state.selectedNodeAccounts}
                    handleOnAccountClick={this.handleOnAccountClick}
                />
                <GraphCanvas
                    data={this.state.nodeCanvasData}
                    handleNodeClick={this.handleNodeClick}
                />
                <NodeInformation
                    selectedNode={this.state.selectedNode}
                />
                <BlockchainCanvas
                    web3={this.state.selectedNode.instance}
                />
                <MiningPoolCanvas
                />
                <InfoCanvas
                    web3={this.state.web3}
                    contract={this.state.contracts[0].instance}
                    currentAccount={this.state.currentAccount}
                />
            </div>
        );
    }
}

export default App;
