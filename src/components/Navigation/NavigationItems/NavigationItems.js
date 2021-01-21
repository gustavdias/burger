import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    {/* don't have to define if it's active or not, it will automatically determine this */}
    {/* <NavigationItem link="/" active>Burger Builder</NavigationItem> */}

    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {/* exact will be passed to NavigationItem, so it will work only with this link */}

    <NavigationItem link="/orders">Orders</NavigationItem>
  </ul>
);

export default navigationItems;
