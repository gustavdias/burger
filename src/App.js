// import logo from './logo.svg';
// import "./App.css";
import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
// import HOC to load some components lazily.
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

//* set up some components to be loaded lazily - the ones that are not necessarily visited by users
const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout"); //return this import statement as a function where then, I can define the path to the component we want to load lazily
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});
//* end of set up some components to be loaded lazily

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
    //! Volta - route protection on the frontend with guards
    //*this are the routes the user can access if he isn't auth
    let routes = (
      //Switch loads the first one that meets a path
      <Switch>
        {/* <Route path="/auth" component={Auth} /> */}
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />{" "}
        {/* in case the user goes to /order or other address he will be redirected, instead of getting a empty page*/}
      </Switch>
    );
    // logged out user can access /orders (not even manually)
    //? since this of course is all javascript, people can of course always theoretically dig into your source code and still kind of manipulate it to still go to the protected route, and this is why we have protection on the server, to not return any data for unauthenticated users.
    //*this are the routes the user can access if he is auth
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          {/* //! logged out user can access /orders (not even manually)
if we don't render this route component (order & checkout page), we get no way of going there, an't reach it because the react router is not aware of it and will never load it*/}
          {/* <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} /> */}
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />

          <Route path="/logout" component={Logout} />

          {/* //with a route to Auth, the Auth container redirects to a route that the user does not have access to even though he is auth*/}
          {/* <Route path="/auth" component={Auth} /> */}
          <Route path="/auth" component={asyncAuth} />

          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //! logged out user can access /orders (not even manually)
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
//! error connect + router - fix with withRouter (HOC)
// wrapping the app container with connect breaks the react router
