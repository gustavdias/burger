import * as actionTypes from "./actionTypes";
import instanceAxios from "../../axios-orders";

//Action Creators
//id from the newly creator order on the backend
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};
//action to actually add the order to our orders array = id + orderData

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

//!to post the new order and token for purchaseBurger
//!Displaying user specific orders
//*when a user purchases a burger, I want to pass the user id onto the backend - it should be part of the orderData
export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    instanceAxios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

//? redirection with redux - will be dispatched whenever we load the checkout page
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

//*fetching orders via Redux
export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

//!Displaying user specific orders
export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart()); //to set loading to true
    //!pass more query parameters to fetch filtered data related only to the auth user
    //* &orderBy= is query parameter understood by firebase which allows us to order our data.
    //* '&orderBy="userId - order by my user ID property
    //* &equalTo= - this always refers to the key you're ordering by.
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';

    //instanceAxios
    //.get("/orders.json?auth=" + token) //!volta - pass token to server - make sure that we can still reach orders if we are authenticated and have a token.
    instanceAxios
      .get("/orders.json" + queryParams)
      .then((res) => {
        //!where do we transform data?
        //I do it here because I'm transforming the data I'm getting back, I don't want to put this into the reducer because if I ever change my backend data, I would have to change my reducer and in this case, I have to change my action creator I guess, but still it feels more natural for me to have a reducer where I get the data in the format I want to store it,
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        //won't call set state though, instead I here want to dispatch my other actions so dispatch fetch orders success
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
