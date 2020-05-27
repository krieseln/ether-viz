import React from 'react';
import ViewListIcon from '@material-ui/icons/ViewList';
import Tooltip from "@material-ui/core/Tooltip";


export default function Block(props){

    return (
        <div>
            <Tooltip title={props.item} arrow>
                <ViewListIcon className={props.item} />
            </Tooltip>
        </div>
    )

};