import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import instanceAxios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    //?store / handle this form shape and all the element data in state
    // name: "",
    // email: "",
    // address: {
    //   street: "",
    //   postalCode: "",
    // },

    //? JS object that represents the form
    //To dynamically create inputs, I need an array to loop through
    orderForm: {
      name: {
        elementType: "input",
        //elementConfig defines the configuration, the normal attributes I can set up for the chosen html tag.
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        //*the validity of element should be defined by some rules which it's set up in the order form.
        validation: {
          required: true,
        },
        valid: false,
        touched: false, // to take out invalid input from the beginning
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false, // to take out invalid input from the beginning
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false, // to take out invalid input from the beginning
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false, // to take out invalid input from the beginning
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false, // to take out invalid input from the beginning
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },

        //! Volta - check after a better option for this:
        // //I need to put a default value, or else the value passed to the server will be undefined
        // value: "fastest",
        // //* fix validation:{required: undefined}
        // validation: {
        //   required: false,
        // },
        // valid: false,

        value: "fastest",
        validation: {},
        valid: true,
      },
    },
    //!-----

    loading: false,
    //To turn off the order button if the form is invalid, I need to find out if my overall form is invalid
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault(); //I don't want to send the request automatically that would reload my page
    // this.setState({ loading: true });
    const formData = {}; //here I extract the value (of each element) from the state
    //Dynamically creates inputs
    //loop through my form - formElementIdentifier (email, country...)
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      //*redux - ingredients: this.props.ingredients,
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };

    this.props.onOrderBurger(order);

    instanceAxios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  //*Validation handler
  checkValidity(value, rules) {
    //? the flaw is to check the rules one after another:     let isValid = true;
    //to fix it, set isValid to true and add && isValid to every check
    let isValid = true;

    //* fix validation:{required: undefined}
    if (!rules) {
      return true;
    }

    if (rules.required) {
      //not equal to a empty stream
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  //? changed handler
  //*when ever the values change, so here in the inputChangedHandler, check if it's valid or not
  inputChangedHandler = (event, inputIdentifier) => {
    console.log(
      "!!!---input---!!!: ",
      event.target.value,
      "inputIdentifier: ",
      inputIdentifier
    );
    const updatedOrderForm = {
      ...this.state.orderForm,
      //! Volta - this does not create a deep clone - nested objects not included
    };
    //!!!!!!!!!!!!!! How to clone deeply - you take the updatedOrderForm (a clone of the original)
    //I access the input identifier, ex.: email, deliveryMethod and copy the updatedOrderForm
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    //here I go into the nested elements
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    //*make sure that I only check the validity if the element was touched, otherwise I don't want to check the validity,
    updatedFormElement.touched = true;

    updatedOrderForm[inputIdentifier] = updatedFormElement;

    //*check if all elements are valid right now and if they are all valid, I'll set this FormIsValid state to valid.
    //* let formIsValid = false; - it runs into the problem that only the last check is the one determining the value of FormIsValid
    let formIsValid = true;
    //to check all inputs for their validity.
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    console.log("check if form is valid: ", formIsValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };
  //!!!!!!!!!!!!!!!!!

  render() {
    // pass props into Input component
    //? To dynamically create inputs, I need an array to loop through
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      //better to use onSubmit on the form, than on the button
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid} //reverse valid
            shouldValidate={formElement.config.validation} //fix deliveryMethod with options and no validation (so it does not appear as red always) - should only be true if my object in the orderForm has a validation object. Delivery method which is the dropdown in the end hasn't so it shouldn't validate at all.
            //*make sure that I only check the validity if the element was touched, otherwise I don't want to check the validity,
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        {/* //button isn't really updated with the state of our form,
    //because I use our own button element and there, it doesn't know a disabled property.
    I need to set the disable property on my Button component
            disabled={props.disabled} */}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    //We need to handle that loading state in our redux store therefore, because we put the whole process of ordering into redux.
    // if (this.state.loading) {
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) =>
      dispatch(orderActions.purchaseBurger(orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, instanceAxios));
