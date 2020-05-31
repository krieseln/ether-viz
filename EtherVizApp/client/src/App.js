import React, {Component} from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import Web3 from "web3";

import "./App.css";
import DrawerMenu from './Components/DrawerMenu'
import NodeCanvas from './Components/NodeCanvas'
import BlockchainCanvas from "./Components/BlockchainCanvas";
import TerminalCanvas from "./Components/TerminalCanvas"



class App extends Component {

    state = {storageValue: 0, web3: null, accounts: null, contract: null, currentAccount: null};

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            // --> Browser-Fenster wird gebaut
            const provider = new Web3.providers.HttpProvider(
                "http://127.0.0.1:8545"
            );
            const web3 = new Web3(provider);

            // Use web3 to get the user's accounts.
            // --> User-Account wird abgerufen #1
            const accounts = await web3.eth.getAccounts();
            const currentAccount = accounts[0];

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

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({web3, accounts, contract: instance, currentAccount: currentAccount}, this.runExample);
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

        // Update state with the result.
        this.setState({storageValue: response});
    };

    handleOnAccountClick = (props) => {
        this.setState({currentAccount: this.state.accounts[props]})
        console.log(this.state.currentAccount)
    };

    render() {
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            <div className="App container">
                <DrawerMenu
                    web3={this.state.web3}
                    accounts={this.state.accounts}
                    contract={this.state.contract}
                    storageValue={this.state.storageValue}
                    currentAccount={this.state.currentAccount}
                    handleOnAccountClick={this.handleOnAccountClick}
                />
                <NodeCanvas
                    accounts={this.state.accounts}
                    currentAccount={this.state.currentAccount}/>
                <BlockchainCanvas/>
                <TerminalCanvas/>
            </div>
        );
    }
}

export default App;
