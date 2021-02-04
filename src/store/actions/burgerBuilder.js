import * as actionTypes from "./actionTypes";
import instanceAxios from "../../axios-orders";

//? Action Creators
//naming my actionCreators with the same name as the identifiers, but with camel case
export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients, //payload
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};
export const initIngredients = () => {
  return (dispatch) => {
    instanceAxios
      .get(
        "https://gd-burger-builder-react-app-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json"
      )
      .then((response) => {
        dispatch(setIngredients(response.data)); //dispatch response data here on an axios response, the data property holds the data which will be the javascript object we want to use.
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};



    // //spinner
    // loading: false,
    // error: false,