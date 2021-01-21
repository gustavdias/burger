import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";

const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
    {/* <a 
            href={props.link} 
            className={props.active ? classes.active : null}>{props.children}</a> */}
    <NavLink
      to={props.link}//as long as our current paths starts with this path here, this link is treated to be active.
      exact={props.exact}// to fix that put the exact route
    //! volta  - for this class to have an effect
    //   NavLink automatically appends or attaches a class named active
    // css module takes a className and converts it into a unique className, so class active will be set with another name
    //? NavLink element has one extra property we can set up
    activeClassName={classes.active}
    >
      {props.children}
    </NavLink>
    {/* don't have to define if it's active or not, it will automatically determine this */}
  </li>
);

export default navigationItem;
