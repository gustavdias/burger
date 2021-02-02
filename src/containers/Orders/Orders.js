import React, { Component } from "react";

import Order from "../../components/Order/Order";
import instanceAxios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [], //after I need to check how to handle asynchronous code in redux
    loading: true,
  };

  componentDidMount() {
    instanceAxios
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
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            // Number.parseFloat or "+" (+order.price)to convert string into number

            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, instanceAxios);
