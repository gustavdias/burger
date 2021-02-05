import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    {/* don't have to define if it's active or not, it will automatically determine this */}
    {/* <NavigationItem link="/" active>Burger Builder</NavigationItem> */}

    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {/* exact will be passed to NavigationItem, so it will work only with this link */}

    {/* orders is only visible if we are authenticated */}
    {props.isAuthenticated ? (
      <NavigationItem link="/orders">Orders</NavigationItem>
    ) : null}

    {/* only show navigation item with authenticate on it if you are unauthenticated,
    show a logout link instead if you are logged in. */}
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
      //* clicking on logout cleans the token and redirect - linking to a page which then just redirects and logs you out,
    )}
  </ul>
);

export default navigationItems;
