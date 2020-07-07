import React from 'react';


class NodeHover extends React.Component {
    constructor(props) {
        super(props);

    }

    showPos(event, text) {
        let el, x, y;

        el = document.getElementById('PopUp');
        if (window.event) {
            x = window.event.clientX + document.documentElement.scrollLeft
                + document.body.scrollLeft;
            y = window.event.clientY + document.documentElement.scrollTop +
                +document.body.scrollTop;
        } else {
            x = event.clientX + window.scrollX;
            y = event.clientY + window.scrollY;
        }
        x -= 2;
        y -= 2;
        y = y + 15
        el.style.left = x + "px";
        el.style.top = y + "px";
        el.style.display = "block";
        document.getElementById('PopUpText').innerHTML = text;
    }

    render() {


        return (
            <div className="NodeHover">
                <div id='PopUp'
                     style='display: none; position: absolute; left: 100px; top: 50px; border: solid black 1px; padding: 10px; background-color: rgb(200,100,100); text-align: justify; font-size: 12px; width: 135px;'
                     onmouseover="document.getElementById('PopUp').style.display = 'none' ">
                    <span id='PopUpText'>TEXT</span>
                </div>
            </div>
        )


    }
}

export default NodeHover;