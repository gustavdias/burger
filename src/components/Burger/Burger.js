import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  //Here you transform the object into an array, so you can use map
  //Object.keys gets the keys of the object and put them into a array
  //igKey for ingredient key
  const transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
    //transform this string value into an array with as many elements as we have ingredients for a given ingredient.
    //Array method Array(3) gives you a array with 3 empty spaces. the length is the amount of ingredients
    //the length should be the amount of the given ingredient.
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />;
    });

    //you don't care about the element itself_, just about its index
  });
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      {console.log("transformedIngredients: ", transformedIngredients)}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
