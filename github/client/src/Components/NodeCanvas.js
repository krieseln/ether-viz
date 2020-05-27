import React from 'react';
import LineTo from 'react-lineto';
import AdjustIcon from '@material-ui/icons/Adjust';

import Contract from "./Contract";
import Node from './Node';

export default function NodeCanvas(props) {

const zIndex = 1;
var prevAcc = null;

const setPrevAcc = (item) => {
    let from = item;
    let to = prevAcc;
    prevAcc = item;
    return (
        <LineTo borderColor="black" zIndex={zIndex} from={from} to={to} />
    );

};


        return (
            <div className="nodecanvas">
                <div className="accountlist">
                    {props.accounts.map((item, index) => (
                        <Node item={item}/>
                    ))}
                </div>
                {props.accounts.map((item,index)=> (
                    setPrevAcc(item)
                    ))}

                <AdjustIcon variant="contained" className="A" >Element A</AdjustIcon>
                <AdjustIcon variant="contained" className="B">Element B</AdjustIcon>
                    <p>
                            <AdjustIcon variant="contained" className="C">Element C</AdjustIcon>
                    </p>

                <p>
                    <Contract className="contractA"/>
                </p>
                <LineTo borderColor="black" from="A" to="B" />
                <LineTo zIndex={zIndex} from="C" to="A" />
                <LineTo zIndex={zIndex} from="B" to="contractA" />
            </div>
        );
};
