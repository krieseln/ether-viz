import React from 'react';
import {Graph} from "react-d3-graph"

import * as config from './config.json';

class GraphCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        };
    }

    render() {

        const {data} = this.state;
        const tempData = {
            nodes: [{id: "Harry"}, {id: "Sally"}, {id: "Alice"}],
            links: [{source: "Harry", target: "Sally"}, {source: "Harry", target: "Alice"}],
        };
        console.log("data in graphcanvas", tempData);

        return (
            <div className="graphcanvas">
                <Graph
                    id="graphcanvas-id"
                    data={data}
                    config={config}

                />
            </div>
        )
    }

}

export default GraphCanvas;