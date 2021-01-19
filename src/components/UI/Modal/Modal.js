import React, { Component } from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

//Lifecycle to avoid a unnecessary re-render- if the Modal is not visible, it should not update the component
//Change it into an class component so I can add a lifecycle into it (training conversion, instead of using hooks)

class Modal extends Component {
  //It doesn't react to changes in the clicked={this.props.modalClosed}, only if show changed
  //PureComponent would run more checks than with shouldComponentUpdate
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
      //to show spinner I look for changes on nextProps.children too.
    );
  }
  componentDidUpdate() {
    console.log("[Modal] DidUpdate");
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;

// const modal = (props) => {
// return (
// );
//};
//export default modal;
