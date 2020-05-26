import React from 'react';
import LineTo from 'react-lineto';
import Button from '@material-ui/core/Button'

const Canvas = () => {


        return (
            <div>
                <Button variant="contained" className="A" >Element A</Button>
                <Button variant="contained" className="B">Element B</Button>
                    <p>
                            <Button variant="contained" className="C">Element C</Button>
                    </p>
                <LineTo from="A" to="B" />
                <LineTo from="C" to="A" />
            </div>
        );
};

export default Canvas;
