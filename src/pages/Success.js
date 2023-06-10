import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Header from "../components/header";
import "./styles/Success.css";


const Success = ({ orderCheck }) => {
    return (
        <div className='home-background-red'>
            <Header />

            {orderCheck === true ?
                <div className='checkout'>
                    <p className="checkout-message">TEBRIKLER!</p>
                    <p className="checkout-message">SIPARISINIZ ALINDI!</p>
                </div>

                : <div className='checkout'>
                    <p className="checkout-message">HENUZ SIPARIS GIRILMEMIS :(</p>
                    <p className="checkout-message">MIDEN SENI CAGIRIYOR!</p>
                </div>}
        </div>
    );
}

export default Success