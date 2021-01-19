import React, { Component } from "react";
import Button from "../../UI/Button/Button";

//Lifecycle to avoid a unnecessary re-render- if the Modal is not visible, it should not update the component
//Change it into an class component so I can add a lifecycle into it (training conversion, instead of using hooks )

class OrderSummary extends Component {
  // This could be a functional component (where you could use memo), doesn't have to be a class
  //!Volta
  componentDidUpdate() {
    console.log("[OrderSummary] DidUpdate");
    //to change that, I Modal
  }
  render() {
    //Object.keys gets the keys of the object into an array, map passes the keys into jsx
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>

        <p>Continue to Checkout?</p>
        {/* btnType is either danger or success */}
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </>
    );
  }
}

export default OrderSummary;
