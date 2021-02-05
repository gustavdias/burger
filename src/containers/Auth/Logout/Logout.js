//* clicking on logout cleans the token and redirect - linking to a page which then just redirects and logs you out,
import React, { Component } from "react";
import { Redirect } from "react-router-dom";//redirect declaratively
import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    //redirect - whenever this container is loaded, it just redirects
    return <Redirect to="/" />;
  }
}

//dispatch action to logout
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
