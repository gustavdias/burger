import React from "react"; //Since components were imported for the shallow rendering, I need to import React for the JSX rendering

//! enzyme
import { configure, shallow } from "enzyme"; // shallow is the most popular or the best way of rendering react components in many circumstances
//? connect enzyme to react
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

// pass components as a react element
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

//*execute configure and pass a javascript object to configure. There we should set up an adapter property and assign new adapter as a constructor function
configure({ adapter: new Adapter() });
//this adapter is instantiated with new adapter

//! describe test method for jest
//you don’t need to import (create-react-app does it automatically).
//takes two arguments.
// 1st: a string, a description which will appear in the console - name and description of what it should do.
// 2nd: testing arg.: function describing the actual test, a normal javascript function -
describe("<NavigationItems />", () => {
  let wrapper;
//-------------
//* helper method we can use inside the described function here. It's the beforeEach function
//! a function which will automatically be executed but for each of your tests
  beforeEach(() => {
    //   render a navigation items component and then look into it
    //render this component with the shallow function and store it in this wrapper variable.
    wrapper = shallow(<NavigationItems />); // pass components as a react element
    //? one thing shallow does is it renders the component with all its content but the content isn't deeply rendered.
  });
//-------------
  //* It describes or allows you to write one individual test, it also takes two arguments.
  //*1st is a string for description
  it("should render two <NavigationItem /> elements if not authenticated", () => {
    //we want to create an instance of this component as it would be rendered to the dom
    //   /look into the rendered component and see what was rendered for the case that the isAuthenticated prop is false
    // /for this, we obviously need to render the entire react application because navigation items is just one tiny piece in the entire react application
    //! use enzyme to solve the problem - Enzyme allows us to just render this navigation items component standalone independent of the entire react application
    //? Enzyme allows us to write unit tests, isolated tests, tests where we don't need to render the complete react app.

    //*2nd is a a testing function describing the actual test:
    // Inside expect, we define our, the thing we want to check so here I want to check if the wrapper contains a certain element.
    expect(wrapper.find(NavigationItem)).toHaveLength(2); //expect to find the navigationItem two times if we're not authenticated,
    //find method - enzyme utility function - allows us to look into the wrapper and see if it contains a certain content
  });
//-------------
  it("should render three <NavigationItem /> elements if authenticated", () => {
    // wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true });// setProps from enzyme gives a alternative to the code above
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should an exact logout button", () => {
    wrapper.setProps({ isAuthenticated: true });
  //logout component which is only there if we are authenticated - boolean 
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});

