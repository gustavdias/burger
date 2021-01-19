import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import instanceAxios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"; //for axios REST calls

//convention name constants you want to use as global constants in all capital characters.
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export class BurgerBuilder extends Component {
  // constructor(props){
  //     super(props);
  //     this.state={...}
  // }

  state = {
    // ingredients: {
    //   salad: 0,
    //   bacon: 0,
    //   cheese: 0,
    //   meat: 0,
    // },
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    //spinner
    loading: false,
    error: false,
  };
  //componentDidMount: a good place for fetching data :)
  componentDidMount() {
    instanceAxios
      .get(
        "https://gd-burger-builder-react-app-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json"
      )
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  // how to decide is the burger is purchasable, a.k.a disable/enable order button
  updatePurchaseState(ingredients) {
    //const ingredients = {
    //  ...this.state.ingredients,//if you use like this, the button to order a burger will only work after the user adds two ingredients, not one
    //instead you pass ingredients as a arguments into updatePurchaseState
    //!!Volta
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  //Updates ingredients and price
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      //State should be updated in an immutable way. Here I create a new js object and use spread operator to distribute the properties of the old ingredients state into the new object
      ...this.state.ingredients,
    };
    //Updates Price
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients); //related to disabling the order button
    //the problem is that the ingredients which I'm analyzing is of course my old state here. Now due to the way set state works, when we execute update purchase state, we might not get the updated ingredients and therefore, once we copy the ingredients and analyze them, we might simply get an outdated version.
    //to solve it, you pass updatedIngredients to this.updatePurchaseState()
    // /this.updatePurchaseState(updatedIngredients)
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    //if statement so you don't get a negative state number for ingredients
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  //modal appears with info when button order now is clicked
  //this inside a event does not refers to the class
  //That is why you should use a arrow function
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  //if user clicks on the backdrop, he cancels the order
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  //? Checkout
  purchaseContinueHandler = () => {
    // alert("You continue!");
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Johnny Walker",
        address: {
          street: "Teststreet 1",
          zipCode: "23123",
          country: "Germany",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    //Post method / for firebase you need to add .json
    //!
    instanceAxios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    //logic to disable buttons
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; //it will give true or false for smaller or equal to 0 and update the copy of the object
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients cannot be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      //Check if there are ingredients, so I can map through it get it's keys from server
      burger = (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients} />;
          {/* addIngredientHandler into the build controls / button  */}
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            // ordered={this.state.totalPrice} //index.js:1 Warning: Expected `onClick` listener to be a function, instead got a value of `number` type.
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    // {salad: true, meat: false, ...}
    return (
      <>
        {/* A component with info inside a component with UI - if the Modal is not visible, it should not update the component */}
        {/* the wrapping element controls the updating of the wrapped element. */}
        {/* OrderSummary is not updated because the wrapping element Modal has a shouldComponentUpdate method where we control this. */}
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, instanceAxios);
