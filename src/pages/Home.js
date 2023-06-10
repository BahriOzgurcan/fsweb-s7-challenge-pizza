import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import './styles/Home.css';
import pizza from "../assets/pizza.png"


const Home = () => {
    return (
        <>
            <div className='home-background-red'>
                <Header />
                <div className='home-text'>
                    <p className="home-text-detail">KOD ACIKTIRIR</p>
                    <p className="home-text-detail">PIZZA DOYURUR</p>
                </div>
                <Link className="home-button" id='order-pizza' to="/pizza">
                    ACIKTIM
                </Link>
                <img className="pizza-png" src={pizza} alt='' ></img>
            </div>
        </>
    );
}

export default Home