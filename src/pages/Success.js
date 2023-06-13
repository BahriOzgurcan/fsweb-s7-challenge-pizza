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
                    <p className="checkout-message">TEBRİKLER!</p>
                    <p className="checkout-message">SİPARİŞİNİZ ALINDI!</p>
                </div>

                : <div className='checkout'>
                    <p className="checkout-message">HENÜZ SİPARİŞ GİRİLMEMİŞ :(</p>
                    <p className="checkout-message">MİDEN SENİ ÇAĞIRIYOR!</p>
                </div>}
        </div>
    );
}

export default Success