import React from 'react';
import {Route} from "react-router-dom";

import './App.css';
import OrdersContainer from "./modules/order/OrdersContainer";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route path={'/orders/:orderId?'} component={OrdersContainer} />
      </div>
    );
  }
}

export default App;
