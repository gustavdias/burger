import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      {/* ensure that whenever we click a navigation item, we essentially close that drawer. */}
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          {/* only show navigation item with authenticate on it if you are unauthenticated,
    show a logout link instead if you are logged in. */}
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
