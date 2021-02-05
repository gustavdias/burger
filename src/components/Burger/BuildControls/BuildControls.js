import React from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    {/* Burger total price */}
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>

    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        //!!!Volta
        added={() => props.ingredientAdded(ctrl.type)} // to keep track of which type this build control is of, use types,
        //you could pass type to the ingredient:
        //type ={ctrl.type} is a unnecessary extra loop
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]} //to disable buttons
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
      //*button should behave differently if user is not authenticated
    >
      {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
    </button>
  </div>
);

export default buildControls;
