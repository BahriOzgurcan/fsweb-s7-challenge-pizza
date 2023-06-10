import React from "react";
import logo from "../assets/logo.svg"
import { NavLink } from "react-router-dom";
import "./header.css"

const Header = () => {
    return (
        <>
            <div className="background-red">
                <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <img style={{margin: "1rem", marginTop:"4rem"}} src={logo} alt="" />
                    <div className="top-nav-bar">
                        <NavLink to="/" activeclassname='active'>
                            Ana Sayfa
                        </NavLink>
                        <NavLink to="/pizza" activeclassname='active'>
                            Siparis Ver
                        </NavLink>
                        <NavLink to="/success" activeclassname='active'>
                            Siparisi Takip Et
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;