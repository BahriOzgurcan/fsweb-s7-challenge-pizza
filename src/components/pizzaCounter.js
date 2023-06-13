import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Button } from 'reactstrap';
import "./pizzaCounter.css";


const CounterButton = ({ isButtonDisabled, counterHandler, numberOfPizza, pizzaStock, orderForm, sizePrice, thicknessPrice, extrasPrice, totalPrice }) => {

    return (

        <>
        <div>
            <h3>Sipariş Kartı</h3>
            <h6>Pizza Boyutu Ücret {sizePrice} TL</h6>
            <h6>Pizza Kalınlığı Ücret {thicknessPrice} TL</h6>
            <h6>Ek Malzemeler {extrasPrice} TL</h6>
            <h5>Pizza Ücreti {totalPrice} TL</h5>
        </div>
            <div className="button">
                <h6>Pizza adeti seç</h6>
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
                <Button id="order-button" type="submit" disabled={isButtonDisabled}>SİPARİŞ VER</Button>
            </div>
        </>
    )
};

export default CounterButton;