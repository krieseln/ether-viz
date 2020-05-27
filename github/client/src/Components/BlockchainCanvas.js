import React from 'react';
import ViewListIcon from "@material-ui/icons/ViewList";

export default function BlockchainCanvas(props){


    return (
        <div className="blockchaincanvas">
            Blockchain goes here
            <p>
            <ViewListIcon variant="contained" className="VL-A" style={{ fontSize: 250}}>Element VL-A</ViewListIcon>
            <ViewListIcon variant="contained" className="VL-B" style={{ fontSize: 250}}>Element VL-B</ViewListIcon>
            </p>
        </div>
    )
}