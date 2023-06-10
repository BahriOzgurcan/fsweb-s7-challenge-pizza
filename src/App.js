import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import { Route, Link, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Success from "./pages/Success";
import OrderPizza from "./pages/OrderPizza";
import "./App.css";

const App = () => {
  const [orderCheck, setOrderCheck] = useState(false);
  const [pizzaStock, setPizzaStock] = useState(15);

  const orderSent = () => {
    if(orderCheck === false){
      setOrderCheck(!orderCheck);
    }
  }

  return (
<div>
    <Routes>
      <Route exact path="/" element={<Home />}>
        
      </Route>
      <Route exact path="/pizza" element={<OrderPizza orderSent={orderSent} pizzaStock={pizzaStock} setPizzaStock={setPizzaStock} />}>
        
      </Route>
      <Route exact path="/success" element={<Success orderCheck={orderCheck}/>}>
        
      </Route>
    </Routes>
</div>
  );
};
export default App;
