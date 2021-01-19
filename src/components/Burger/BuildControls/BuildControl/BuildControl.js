import React from "react";
import classes from "./BuildControl.module.css";

const BuildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      {/* disabled={props.disabled} false disables the button */}
      <button
        className={classes.Less}
        onClick={props.removed}
        disabled={props.disabled}
      >
        Less
      </button>
      {/* //will trigger on BuildControls */}
      <button className={classes.More} onClick={props.added}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
