import React from 'react';
import {Graph} from "react-d3-graph"
import Popover from '@material-ui/core/Popover';

class GraphCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            handleNodeClick: props.handleNodeClick,
            anchorEl: null,
            setAnchorEl: null,
            open: false,
            blur: true,
            className: "graphcanvas blurry"
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentAccount !== this.state.currentAccount) {
            this.setState({currentAccount: this.props.currentAccount});
        }
    };

    onMouseOverNode = (nodeId) => {

        if (nodeId === "geth_contract") {
        }
        console.log(`Mouse over node ${nodeId}`);
    };


    handleClick = (event) => {
        const trgt = document.getElementById(event);
        console.log("handleClick currenttarget", trgt);

        this.setState({
            setAnchorEl: trgt,
            open: true
        })
    };

    handleClose = () => {
        this.setState({
            setAnchorEl: null,
            open: false
        });
    };

    blurCanvas = (event) => {
        if (event.target.nodeName.includes("svg")) {
            this.setState({
                blur: !this.state.blur,
                className: this.state.blur ? "graphcanvas" : "graphcanvas blurry"
            })
        }
    };

    render() {
        const {data, handleNodeClick, open, className} = this.state;
        const id = open ? 'simple-popover' : undefined;


        const config = {
            "automaticRearrangeAfterDropNode": false,
            "collapsible": false,
            "directed": false,
            "focusAnimationDuration": 0.75,
            "focusZoom": 1,
            "height": '',
            "highlightDegree": 1,
            "highlightOpacity": 1,
            "linkHighlightBehavior": true,
            "maxZoom": 8,
            "minZoom": 0.1,
            "nodeHighlightBehavior": true,
            "panAndZoom": false,
            "staticGraph": false,
            "staticGraphWithDragAndDrop": false,
            "width": '',
            "d3": {
                "alphaTarget": 0.05,
                "gravity": -50,
                "linkLength": 200,
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

        return (
            <div className={className}
                 onClick={(event) => this.blurCanvas(event)}
            >
                <Graph
                    id="graphcanvas-id"
                    data={data}
                    config={config}
                    onClickNode={(nodeId) => handleNodeClick(nodeId)}
                    onMouseOverNode={(nodeId) => this.onMouseOverNode(nodeId)}
                />
                {/*<Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <span>The content of the Popover.</span>
                </Popover>*/}
            </div>
        )
    }

}

export default GraphCanvas;