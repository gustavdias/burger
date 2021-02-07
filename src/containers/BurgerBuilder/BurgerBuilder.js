import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import instanceAxios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"; //for axios REST calls
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

// import * as actionTypes from "../../store/actions/actionTypes";
//*instead of importing actionTypes, I import actionCreators from a central file exporting all of them
// import * as burgerBuilderActions from "../../store/actions/index";

//convention name constants you want to use as global constants in all capital characters.
//*into redux - reducer.js
// const INGREDIENT_PRICES = {
//   salad: 0.5,
//   cheese: 0.4,
//   meat: 1.3,
//   bacon: 0.7,
// };

//! test containers: strip out the component part and get rid of the connection to redux.
//! this export strips out the connection to Redux so I can do a shallow rendering for testing
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
    //* Move to redux - reducer
    //ingredients and totalPrice are better in redux
    // ingredients: null,
    // totalPrice: 4,

    //purchasable is more for the UI state (activate or deactivate the order button), this is better as a local state

    //redux
    // purchasable: false,

    //purchasing, loading and error are kind of local UI state
    purchasing: false,
    // //spinner
    // loading: false,
    // error: false,
  };
  //componentDidMount: a good place for fetching data :)
  componentDidMount() {
    console.log(this.props);
    //*After I will have to use Redux with async code, maybe redux saga
    // instanceAxios
    //   .get(
    //     "https://gd-burger-builder-react-app-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json"
    //   )
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
    this.props.onInitIngredients(); //fetch ingredients
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

    // since I took out purchasable={this.state.purchasable}
    //    this.setState({ purchasable: sum > 0 });
    return sum > 0;
  }

  //* Move to redux - actions
  //Updates ingredients and price
  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     //State should be updated in an immutable way. Here I create a new js object and use spread operator to distribute the properties of the old ingredients state into the new object
  //     ...this.state.ingredients,
  //   };
  //   //Updates Price
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients); //related to disabling the order button
  //   //the problem is that the ingredients which I'm analyzing is of course my old state here. Now due to the way set state works, when we execute update purchase state, we might not get the updated ingredients and therefore, once we copy the ingredients and analyze them, we might simply get an outdated version.
  //   //to solve it, you pass updatedIngredients to this.updatePurchaseState()
  //   // /this.updatePurchaseState(updatedIngredients)
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   //if statement so you don't get a negative state number for ingredients
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  //modal appears with info when button order now is clicked
  //this inside a event does not refers to the class
  //That is why you should use a arrow function
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      //if user is authenticated, set the state to purchasing
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      //else push the user to the /auth page for login or signup
      // this.props.onSetAuthRedirectPath('/checkout');
      //*dynamic approach if you need to support different URLs would be to store the URL in your redux store
      this.props.history.push("/auth");
    }
  };

  //if user clicks on the backdrop, he cancels the order
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  //? Checkout
  purchaseContinueHandler = () => {
    // // alert("You continue!");

    //>now in ContactData orderHandler
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Johnny Walker",
    //     address: {
    //       street: "Teststreet 1",
    //       zipCode: "23123",
    //       country: "Germany",
    //     },
    //     email: "test@test.com",
    //   },
    //   deliveryMethod: "fastest",
    // };
    // //Post method / for firebase you need to add .json
    // //!
    // instanceAxios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch((error) => {
    //     this.setState({ loading: false, purchasing: false });
    //   });

    //*with Redux query params to pass our ingredients to the checkout component are no longer needed
    //Logic to pass the ingredients into the checkout container
    /*  const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }

    //To pass the total price to checkout
    queryParams.push("price=" + this.state.totalPrice);

    //history is one of these special props provided by the router
    const queryString = queryParams.join("&"); */

    //*with redux I can make this shorter
    //   this.props.history.push({
    //     pathname: "/checkout",
    //     search: "?" + queryString,
    //   }); //push prop - allows you to switch the page and push a new page onto that stack of pages.
    // };
    this.props.history.push("/checkout"); //I can get the ingredients from the redux store.
    this.props.onInitPurchase();
  };

  render() {
    //logic to disable buttons
    const disabledInfo = {
      // ...this.state.ingredients,
      //with redux:
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; //it will give true or false for smaller or equal to 0 and update the copy of the object
    }

    let orderSummary = null;

    // let burger = this.state.error ? (
    let burger = this.props.error ? (
      <p>Ingredients cannot be loaded!</p>
    ) : (
      <Spinner />
    );
    // if (this.state.ingredients) {
    //*with redux
    if (this.props.ings) {
      //Check if there are ingredients, so I can map through it get it's keys from server
      burger = (
        <React.Fragment>
          {/* <Burger ingredients={this.state.ingredients} />; */}
          <Burger ingredients={this.props.ings} />;
          {/* addIngredientHandler into the build controls / button  */}
          <BuildControls
            // ingredientAdded={this.addIngredientHandler}
            ingredientAdded={this.props.onIngredientAdded}
            // ingredientRemoved={this.removeIngredientHandler}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            //since purchasable: false, was taken out of this component
            // purchasable={this.state.purchasable}
            purchasable={this.updatePurchaseState(this.props.ings)}
            // ordered={this.state.totalPrice} //index.js:1 Warning: Expected `onClick` listener to be a function, instead got a value of `number` type.
            ordered={this.purchaseHandler}
            //redux
            // price={this.state.totalPrice}
            price={this.props.price}
            //*build controls need to know whether I'm authenticated or not.
            isAuth={this.props.isAuthenticated}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          // ingredients={this.state.ingredients}
          ingredients={this.props.ings} //!!!!!!!!!!!!!error!!!
          //redux
          // price={this.state.totalPrice}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

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
const mapStateToProps = (state) => {
  return {
    // ings: state.ingredients, - after combineReducers into a rootReducer
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    //*build controls need to know whether I'm authenticated or not
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //*where I dispatch actions, I no longer dispatch them directly, instead I want to use my action creators.
    // dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

//! connection to Redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, instanceAxios));
//we can still handle the errors with our higher order component here because we're using an axios instance, so no matter if we do send the request from another place in the app like our async action creator, we can still handle it with the same axios instance which we're passing to the higher order component to show our error modal which of course is what we want to do still, we want to have this central error handling place.
