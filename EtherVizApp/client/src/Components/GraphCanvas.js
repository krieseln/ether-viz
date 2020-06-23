import React from 'react';
import {Graph} from "react-d3-graph"
import nodeLogo from './Ethereum_logo.svg'

class GraphCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.currentAccount !== this.state.currentAccount){
            this.setState({currentAccount: this.props.currentAccount});
        }
    };


    render() {

        const {data} = this.state;
        const tempData = {
            nodes: [{id: "Harry"}, {id: "Sally"}, {id: "Alice"}],
            links: [{source: "Harry", target: "Sally"}, {source: "Harry", target: "Alice"}],
        };
        const config = {
            "automaticRearrangeAfterDropNode": false,
            "collapsible": false,
            "directed": false,
            "focusAnimationDuration": 0.75,
            "focusZoom": 1,
            "height": 400,
            "highlightDegree": 1,
            "highlightOpacity": 1,
            "linkHighlightBehavior": true,
            "maxZoom": 8,
            "minZoom": 0.1,
            "nodeHighlightBehavior": true,
            "panAndZoom": false,
            "staticGraph": false,
            "staticGraphWithDragAndDrop": false,
            "width": 800,
            "d3": {
                "alphaTarget": 0.05,
                "gravity": -100,
                "linkLength": 100,
                "linkStrength": 1,
                "disableLinkForce": false
            },
            "node": {
                "color": "#d3d3d3",
                "fontColor": "black",
                "fontSize": 11,
                "fontWeight": "normal",
                "highlightColor": "red",
                "highlightFontSize": 13,
                "highlightFontWeight": "bold",
                "highlightStrokeColor": "black",
                "highlightStrokeWidth": "3",
                "labelProperty": "id",
                "mouseCursor": "pointer",
                "opacity": 1,
                "renderLabel": true,
                "size": 600,
                "strokeColor": "none",
                "strokeWidth": 1.5,
                "svg": "nodeLogo",
                "symbolType": "circle"
            },
            "link": {
                "color": "#d3d3d3",
                "fontColor": "black",
                "fontSize": 8,
                "fontWeight": "normal",
                "highlightColor": "red",
                "highlightFontSize": 8,
                "highlightFontWeight": "normal",
                "labelProperty": "label",
                "mouseCursor": "pointer",
                "opacity": 1,
                "renderLabel": false,
                "semanticStrokeWidth": false,
                "strokeWidth": 1.5,
                "markerHeight": 6,
                "markerWidth": 6
            }
        };

        const onClickNode = function(event) {
            window.alert('Clicked the node');
        };



        //console.log("data in graphcanvas", tempData);

        return (
            <div className="graphcanvas">
                <Graph
                    id="graphcanvas-id"
                    data={data}
                    config={config}
                    onClickNode={onClickNode}
                />
            </div>
        )
    }

}

export default GraphCanvas;