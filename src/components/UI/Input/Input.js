import React from "react";

import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;
  //output feedback upon our validation result
  const inputClasses = [classes.InputElement];

  //invalid property if the input is invalid
  //*make sure that I only check the validity if the element was touched, otherwise I don't want to check the validity,
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          //   className={classes.InputElement}
          className={inputClasses.join(" ")} //to concatenate all my string classes into one long string where the classes are separated
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          //   className={classes.InputElement}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    //? Dropdown component
    case "select":
      inputElement = (
        <select
          //   className={classes.InputElement}
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            //   dropdown option
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          //   className={classes.InputElement}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
