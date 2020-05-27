import React from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';

export default function Contract(props){



    return (
        <div className={props.className}>
            <AssignmentIcon style={{fontSize: 30}} color="primary"/>
        </div> 
    )
}