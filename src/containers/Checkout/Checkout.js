import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

export class Checkout extends Component {
  state = {
    ingredients: null,
    // ingredients: {
    //   salad: 1,
    //   meat: 1,
    //   cheese: 1,
    //   bacon: 1,
    // },
    price: 0,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      // ['salad', '1']
      //receiving the total price and separating it from the rest
      //the total prize is no ingredient, so I shouldn't push it onto this array.
      //if the parameter is price, do not add it to ingredients
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  //Navigating back on history
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  //Navigating to the next page on history
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />{" "}
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
              //includes history object
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
