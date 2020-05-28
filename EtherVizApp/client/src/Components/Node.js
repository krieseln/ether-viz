import React from 'react';
import AdjustIcon from '@material-ui/icons/Adjust';
import Tooltip from "@material-ui/core/Tooltip";


export default function Node(props){

    return (
        <div>
            <Tooltip title={props.item} arrow>
                <AdjustIcon className={props.item} />
            </Tooltip>
        </div>
    )

};