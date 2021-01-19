// import logo from './logo.svg';
// import "./App.css";
import React, { Component } from "react";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
class App extends Component {
  
  //code to test if it will call componentWillMount
  /* state = {
    show: true,
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: false });
    }, 5000);
  } */

  render() {
    return (
      <div>
        <Layout />
        {/* {this.state.show ? <BurgerBuilder /> : null} */}
        <BurgerBuilder/>
      </div>
    );
  }
}

export default App;
