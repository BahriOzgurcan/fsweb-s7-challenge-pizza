import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Button } from 'reactstrap';
import "./pizzaCounter.css";


const CounterButton = ({ isButtonDisabled, counterHandler, numberOfPizza, pizzaStock, orderForm, sizePrice, thicknessPrice, extrasPrice, totalPrice }) => {

    return (

        <>
        <div>
            <h3>Siparis Karti</h3>
            <h6>Pizza Boyutu Ucret {sizePrice} TL</h6>
            <h6>Pizza Kalinligi Ucret {thicknessPrice} TL</h6>
            <h6>Ek Malzemeler {extrasPrice} TL</h6>
            <h5>Pizza Ucreti {totalPrice} TL</h5>
        </div>
            <div className="button">
                <h6>Pizza adeti sec</h6>
                <div>
                    <Button
                        color="primary"
                        name="decrease"
                        id="decrease"
                        onClick={counterHandler}
                        disabled={numberOfPizza === 1}
                    >
                        -
                    </Button>{' '}
                    {orderForm.quantity}
                    <Button
                        color="primary"
                        name="increase"
                        id="increase"
                        onClick={counterHandler}
                        disabled={numberOfPizza === pizzaStock}
                    >
                        +
                    </Button>{' '}
                </div>
                <h5>Toplam {totalPrice * numberOfPizza}  TL</h5>
                <Button id="order-button" type="submit" disabled={isButtonDisabled}>SIPARIS VER</Button>
            </div>
        </>
    )
};

export default CounterButton;