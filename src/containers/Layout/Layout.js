import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  //!Volta- This version: if you plan on using the state, insert state,
  //? you shouldn't do it like this because due to the asynchronous nature of set state,
  //? this may lead to unexpected outcomes. So instead use the function form,
  //? expect the previous state as input and in there, simply return the object you want to set as a new state or you want to merge into the state
  // sideDrawerToggleHandler = () => {
  //   this.setState(() => {
  //     this.setState({showSideDrawer: !this.state.showSideDrawer})
  //   });
  //!!!!! the clean way of setting the state when it depends on the old state.
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
