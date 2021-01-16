import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
export class BurgerBuilder extends Component {
  // constructor(props){
  //     super(props);
  //     this.state={...}
  // }

  state = {
    ingredients: {
      salad: 1,
      bacon: 2,
      cheese: 2,
      meat: 2,
    },
  };
  render() {
    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <div>Build Controls</div>
      </>
    );
  }
}

export default BurgerBuilder;
