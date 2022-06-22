import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import { fetchDrinkRecipe, fetchDrinkCategory,
  fetchDrinkByCategory } from '../services/API';

const Drinks = () => {
  const { recipesDrinks, setRecipesDrinks,
    categoriesDrinks, setCategoriesDrinks,
    isdisabledFilterDrinks, setIsdisabledFilterDrinks,
    filterDrinks, setFilterDrinks } = useContext(Context);
  // console.log(recipesDrinks);

  const getRecipesDrinks = async () => {
    const MAX_N_RECIPES = 12;
    const data = await fetchDrinkRecipe();
    // console.log(data);
    // console.log(data.slice(0, MAX_N_RECIPES));
    setRecipesDrinks(data.slice(0, MAX_N_RECIPES));
    return data.slice(0, MAX_N_RECIPES);
  };

  useEffect(() => {
    getRecipesDrinks();
  }, []);

  const getCategory = async () => {
    const MAX_N_CATEGORIES = 5;
    const data = await fetchDrinkCategory();
    // console.log(data);
    // console.log(data.slice(0, MAX_N_CATEGORIES));
    setCategoriesDrinks(data.slice(0, MAX_N_CATEGORIES));
    return data.slice(0, MAX_N_CATEGORIES);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const filterByCategory = async ({ target }) => {
    const MAX_N_CATEGORIES = 12;
    // console.log('works');
    // console.log(target.innerHTML);
    const getCategoryName = target.innerHTML;
    const data = await fetchDrinkByCategory(getCategoryName);
    const dataSlice = data.slice(0, MAX_N_CATEGORIES);
    // console.log(dataSlice);
    setFilterDrinks(dataSlice);
    setIsdisabledFilterDrinks(true);
    return data;
  };

  return (
    <div>
      <Header />
      {isdisabledFilterDrinks === false && recipesDrinks !== null
      && recipesDrinks.map((recipeDrink, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            src={ recipeDrink.strDrinkThumb }
            alt={ recipeDrink.strDrink }
            data-testid={ `${index}-card-img` }
          />

          <p data-testid={ `${index}-card-name` }>
            {recipeDrink.strDrink}
          </p>
        </div>
      ))}

      {isdisabledFilterDrinks && filterDrinks.length > 0
      && filterDrinks.map((filterDrink, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            src={ filterDrink.strDrinkThumb }
            alt={ filterDrink.strDrink }
            data-testid={ `${index}-card-img` }
          />

          <p data-testid={ `${index}-card-name` }>
            {filterDrink.strDrink}
          </p>
        </div>
      ))}

      {categoriesDrinks.map((categoryDrink, index) => (
        <div key={ index }>
          <button
            type="button"
            data-testid={ `${categoryDrink.strCategory}-category-filter` }
            onClick={ filterByCategory }
          >
            {categoryDrink.strCategory}
          </button>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default Drinks;
