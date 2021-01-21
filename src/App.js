// import logo from './logo.svg';
// import "./App.css";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from './containers/Orders/Orders';

class App extends Component {
  //code to test if it will call componentWillMount
  /* state = {
    show: true,
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: false });
    }, 5000);
  } */

  render() {
    return (
      <div>
        <Layout>
          {/* Switch loads the first one that meets a path */}
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
        {/* {this.state.show ? <BurgerBuilder /> : null} */}
        {/* <BurgerBuilder /> */}
      </div>
    );
  }
}

export default App;
