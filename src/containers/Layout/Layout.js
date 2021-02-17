import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

//!it would make sense to connect the layout here to our store so that we can pass the auth information down to toolbar and side drawer which then in turn could pass it to navigation items.
import { connect } from "react-redux";

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
        {/* //only show navigation item with authenticate on it if you are unauthenticated,
// show a logout link instead if you are logged in. */}
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

//only show navigation item with authenticate on it if you are unauthenticated,
// show a logout link instead if you are logged in.
const mapStateToProps = (state) => {
  console.log("!!!--- state.auth.token: ", state.auth.token);
  console.log('%cPretty colors', 'background-color: turquoise; color: white; padding: 4px')

  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
