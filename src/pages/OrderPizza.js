import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header"
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import priceData from "../assets/prices";
import { useNavigate, Link } from "react-router-dom";
import './styles/OrderPizza.css';
import * as Yup from "yup";
import formSchema from '../components/formSchema';
import CounterButton from '../components/pizzaCounter';
import Divider from '../components/Divider';




const OrderPizza = ({ orderSent, setPizzaStock, pizzaStock }) => {

    const [totalPrice, setTotalPrice] = useState(0);
    const [sizePrice, setSizePrice] = useState(0);
    const [thicknessPrice, setThicknessPrice] = useState(0);
    const [extrasPrice, setExtrasPrice] = useState(0);
    const [numberOfPizza, setNumberOfPizza] = useState(1);
    const [isButtonDisabled, setButtonDisabled] = useState(true);

    const [isSizeSelected, setSizeSelected] = useState(false);
    const [isThicknessSelected, setThicknessSelected] = useState(false);
    const [isNameActive, setNameActive] = useState(false);


    const navigate = useNavigate();
    // const history = useHistory();

    const [orderForm, setOrderForm] = useState({
        name: "",
        size: "",
        thickness: "",
        special_note: "",
        extra: [],
        quantity: numberOfPizza,
    });
    const [formError, setFormError] = useState({
        name: "",
        size: "",
        thickness: "",
        special_note: "",
        extra: [],
        quantity: "",
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;


        Yup.reach(formSchema, name)
            .validate(value)
            .then((valid) => {
                setFormError({ ...formError, [name]: "" });
            })
            .catch((err) => {
                setFormError({ ...formError, [name]: err.errors[0] });
            })

        setOrderForm({ ...orderForm, [name]: value })
    };

    const changeHandlerExtras = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setOrderForm({ ...orderForm, extra: [...orderForm.extra, value] })
        } else {
            setOrderForm({ ...orderForm, extra: [...orderForm.extra.filter(x => x != value)] })
        }

    };

    const counterHandler = (e) => {
        e.stopPropagation();
        const { id } = e.target;
        if (id === "increase") {
            numberOfPizza < pizzaStock &&
                setNumberOfPizza(numberOfPizza + 1);
        } else if (id === "decrease") {
            numberOfPizza > 1 &&
                setNumberOfPizza(numberOfPizza - 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        axios
            .post("https://reqres.in/api/orders", orderForm)
            .then((res) => {
                orderSent();
                setPizzaStock(pizzaStock - orderForm.quantity);
            })
            .catch((error) => {
                console.log("HATA!", error);
            })
            .finally(() => {
                navigate("/success");

            })
    };

    useEffect(() => {
        setOrderForm({ ...orderForm, quantity: numberOfPizza })
    }, [numberOfPizza]);

    useEffect(() => {
        if (!orderForm.size) {
            return
        };
        setSizePrice(Number(priceData.size.filter(x => x.label === orderForm.size)[0].price));
        setSizeSelected(true);
    }, [orderForm.size])

    useEffect(() => {
        if (!orderForm.thickness) {
            return
        };

        setThicknessPrice(Number(priceData.thickness.filter(x => x.label === orderForm.thickness)[0].price))

        setThicknessSelected(true);
    }, [orderForm.thickness])

    useEffect(() => {
        if (orderForm.extra) {

            const filteredExtras = priceData.ingredients.filter(ingredient => orderForm.extra.includes(ingredient.label));


            setExtrasPrice(filteredExtras.reduce((acc, ingredient) => acc + ingredient.price, 0));
        }

    }, [orderForm.extra])

    useEffect(() => {
        if (orderForm.name.length >= 2) {
            setNameActive(true)
        } else {
            setNameActive(false)
        }
    }, [orderForm.name])

    useEffect(() => { setTotalPrice(sizePrice + thicknessPrice + extrasPrice) }, [sizePrice, thicknessPrice, extrasPrice]);

    useEffect(() => {
        formSchema
            .isValid(orderForm)
            .then((a) => {
                setButtonDisabled(!a)
            })
    }, [orderForm])

    useEffect(() => {
        console.log(pizzaStock)
    }, [pizzaStock])


    useEffect(() => {
        console.log("Siparis Ozeti", [orderForm])
        console.log("Form hata", [formError])
    }, [orderForm]);

    return (
        <>
            <Header />
            <div className='container'>
                <div className="order-container-header">
                    <div className="aciklama" style={{ maxWidth: "45rem" }}>
                        <h2>Pizzani Yarat</h2>
                        <div>Kalan pizza adeti: {pizzaStock}</div>
                        <Divider />
                        <p>Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir..Küçük bir pizzaya bazen pizzetta denir.</p>
                    </div>
                </div>
                <Divider />
                {/* Radio Check Selection */}
                <Form id="pizza-form" onSubmit={handleSubmit}>
                    <div className="form-top-card">
                        <FormGroup className="size-container">
                            <legend>
                                Boyut Sec{!isSizeSelected && <span style={{ color: "red" }}>*</span>}
                            </legend>

                            {priceData.size.map((size, index) => {
                                return (
                                    <div key={size.label}>
                                        <FormGroup htmlFor={size.label}>
                                            <Label check>
                                                <Input
                                                    type="radio"
                                                    name="size"
                                                    id={index}
                                                    value={size.label}
                                                    onChange={changeHandler}
                                                />
                                                &nbsp;&nbsp;{size.turkishName}&nbsp;&nbsp;{size.price} TL
                                            </Label>
                                        </FormGroup>
                                    </div>)
                            })}
                            {!isSizeSelected ? <span className='input-alert' >Pizzani olusturmaya once pizza boyutu secerek basla. Acele et miden hata veriyor!!!</span> : <span className='input-alert' style={{ visibility: "hidden" }} > Pizzani olusturmaya once pizza boyutu secerek basla. Acele et miden hata veriyor!!!</span>}
                        </FormGroup>

                        {/* Dropdown Selection */}

                        <FormGroup className="thickness-container">
                            <legend >
                                Hamur Sec{isSizeSelected && !isThicknessSelected && <span style={{ color: "red" }}>*</span>}
                            </legend>
                            <Input
                                type="select"
                                name="thickness"
                                id="size-dropdown"
                                key="size-dropdown"
                                value={orderForm.thickness}
                                onChange={changeHandler}
                                disabled={!isSizeSelected}
                            >
                                <option value="" hidden>
                                    Hamur Kalinligi Seciniz
                                </option>
                                {
                                    priceData.thickness.map((thickness, index) => {
                                        return (
                                            <option key={index} value={thickness.label}>
                                                {thickness.turkishName}{`  `}{thickness.price !== 0 ? `+ ${thickness.price} TL` : null}
                                            </option>)
                                    })
                                }
                            </Input>
                            {isSizeSelected && !isThicknessSelected ? <span className='input-alert'> Siparise devam etmek icin hamur kalinligini sec. Waiting for Pizza response!!!</span> : <span className='input-alert' style={{ visibility: "hidden" }}>Siparise devam etmek icin hamur kalinligini sec. Waiting for Pizza response!!!</span>}
                        </FormGroup>
                    </div>
                    {/* Checkbox Selection */}

                    <FormGroup className="extras-container">
                        <legend>
                            Ilave Malzemeler {isSizeSelected && isThicknessSelected && <span className='input-alert'> Simdi diledigin malzemeleri secebilirsin... ADV varken MVP mi kalalim?!</span>}
                        </legend>
                        <br />
                        <span className='description-extras' >Not: Standart pizzada pizza sosu ve mozarella peyniri bulunur.</span>
                        <div className="ingredients">
                            {priceData.ingredients.map((ingredients, index) => {
                                return (
                                    < FormGroup key={ingredients.label} htmlFor={ingredients.label} check >
                                        <Label check>
                                            <Input
                                                type="checkbox"
                                                className="checkbox"
                                                name="extra"
                                                id={index}
                                                value={ingredients.label}
                                                onChange={changeHandlerExtras}
                                                disabled={!isThicknessSelected}
                                            />
                                            &nbsp;&nbsp;{ingredients.label}{`  `}
                                            &nbsp;&nbsp;{ingredients.price}TL
                                        </Label>
                                    </FormGroup>)

                            })
                            }
                        </div>
                    </FormGroup >
                    <div className="text-input-container">

                        <FormGroup>
                            <legend htmlFor="name-input">
                                Isim {isSizeSelected && isThicknessSelected && !isNameActive && <span className='input-alert'> Siparisini tamamlamadan once, kim bu sansli midenin sahibi?</span>}
                            </legend>
                            <Input
                                type="text"
                                name="name"
                                id="name-input"
                                placeholder="Isim giriniz..."
                                onChange={changeHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <legend htmlFor="additionalNotes">
                                Siparis Notu
                            </legend>
                            <Input
                                type="text"
                                name="special_note"
                                id="special-text"
                                placeholder="Siparise eklemek istediginiz bir sey var mi?"
                                onChange={changeHandler}
                            />
                        </FormGroup>
                    </div>
                    <Divider />
                    <div className="checkout-card">
                        <CounterButton isButtonDisabled={isButtonDisabled} counterHandler={counterHandler} extrasPrice={extrasPrice} thicknessPrice={thicknessPrice} sizePrice={sizePrice} totalPrice={totalPrice} numberOfPizza={numberOfPizza} pizzaStock={pizzaStock} orderForm={orderForm} />
                    </div>
                </Form >
            </div>
        </>
    );
}

export default OrderPizza