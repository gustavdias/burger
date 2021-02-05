import React from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      {/* only show navigation item with authenticate on it if you are unauthenticated,
    show a logout link instead if you are logged in. */}
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
