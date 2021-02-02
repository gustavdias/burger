import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

export class Checkout extends Component {
  //*Redux case - issue of passing the ingredients through query params
  // state = {
  //   ingredients: null,
  //   // ingredients: {
  //   //   salad: 1,
  //   //   meat: 1,
  //   //   cheese: 1,
  //   //   bacon: 1,
  //   // },
  //   price: 0,
  // };

  //* Redux - no longer need to get our ingredients in componentWillMount like this:
  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     // ['salad', '1']
  //     //receiving the total price and separating it from the rest
  //     //the total prize is no ingredient, so I shouldn't push it onto this array.
  //     //if the parameter is price, do not add it to ingredients
  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: price });
  // }

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
          // ingredients={this.state.ingredients}
          ingredients={this.props.ings}

          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />{" "}
        <Route
          path={this.props.match.path + "/contact-data"}
          // *change the way we render this route so that we don't have to use this way just to get the ingredients to contact data,
          //Now thanks to our redux store, we no longer need to use the tricks so we don't actually even need the price here because we don't use it anywhere else in this component.
          /* render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props} */
              //includes history object
              component={ContactData}
            />
          {/* )}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    ings: state.ingredients // ingredients: it has to be the property as you name it in your state
    // price: state.totalPrice,//totalPrice - property name in the reducer
  }
}


//no need for mapDispatchToProps, because we are not dispatching anything in this container, we just navigate a little bit but we don't do this through redux store, we do this through the react router

export default connect(mapStateToProps)(Checkout);
