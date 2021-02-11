import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
// import reducer from "./store/reducers/burgerBuilder";
import thunk from "redux-thunk";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";

//! Hiding the access to your store and state from users using redux devtools for chrome
//only set this extension if we are in development mode
const composeEnhancers =
  process.env.REACT_APP_NODE_ENVX === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
//process is a global variable available with the need to import it.
//redux dev tools will only be available in the development environment.

//? basic setup - no middleware
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//! TypeError: Cannot read property 'toFixed' of undefined
//! src/components/Burger/BuildControls/BuildControls.js:17 - Current Price: <strong>{props.price.toFixed(2)}</strong>
//on the checkout page in the checkout summary, we of course show a preview of our burger with the ingredients we have and initially before we loaded the ingredients, ingredients is null and therefore it fails if we try to loop through our ingredients.
// const store = createStore(
//   reducer,
//   /* preloadedState, */ +composeEnhancers,
//   compose(applyMiddleware(thunk))
// );
const rootReducer = combineReducers({
  order: orderReducer,
  burgerBuilder: burgerBuilderReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
