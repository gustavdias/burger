import React, { Component } from "react";

import Order from "../../components/Order/Order";
import instanceAxios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class Orders extends Component {
  state = {
    orders: [], //after I need to check how to handle asynchronous code in redux
    loading: true,
  };

  //*fetching orders via Redux - code went into oder action
  componentDidMount() {
    /*  instanceAxios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders = [];
        //getting each order by key
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        this.setState({ loading: false });
      }); */
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          // Number.parseFloat or "+" (+order.price)to convert string into number

          price={order.price}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token, //!volta - pass token to server
    userId: state.auth.userId, //!Displaying user specific orders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //!volta - pass token to server
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, instanceAxios));
