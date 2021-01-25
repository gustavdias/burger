import React from "react";
import classes from "./Button.module.css";

const button = (props) => {
  return (
    //btnType is either danger or success
    <button
      disabled={props.disabled}
      className={[classes.Button, classes[props.btnType]].join(" ")}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default button;
