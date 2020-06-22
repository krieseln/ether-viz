import React from 'react'

class TerminalCanvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            web3: props.web3,
            accounts: props.accounts,
            contract: props.contract,
            storageValue: props.storageValue,
            currentAccount: props.currentAccount,
            nodeinfo: props.nodeinfo
    }
}

objectMap = (obj, fn) => {
        Object.fromEntries(
            Object.entries(obj).map(
                ([k,v], i) => [k, fn(v, k, i)]
            )
        )
    };

    render() {
        return (
            <div className="terminalcanvas">
                <p>
                    {/*web3: {this.objectMap(this.state.web3, v => v.toString())}*/}
                </p>
                <p>
                    accounts: {this.state.accounts.toString()}
                </p>
                <p>
                    contract: {this.objectMap(this.state.contract.options, v => (v != null) ? v.toString() : "empty contract")}
                </p>
                <p>
                    storageValue: {this.state.storageValue.toString()}
                </p>
                <p>
                    currentAccount: {this.state.currentAccount.toString()}
                </p>


            </div>
        )
    };
}

export default TerminalCanvas;