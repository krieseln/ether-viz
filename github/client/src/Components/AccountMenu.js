import React, { Component } from "react";
import Menu from "react";
import MenuItem from "react";
import App from '../App'

export default function AccountMenu() {

    const handleClick = () => {
        console.log("click");
    };

    const  menuAccounts = [{name: "john", id: "123"}, {name: "jane", id:"231"}];


        return(
            <div id="menu-div">
                <Menu id="accounts-menu">
                    {
                        menuAccounts.map((option, index) => (
                            <MenuItem key = {option}>
                                {option.name}
                            </MenuItem>
                        ))
                    }
                </Menu>
            </div>
        )
    }