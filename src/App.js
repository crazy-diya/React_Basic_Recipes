import React, { useEffect, useState } from 'react';
import './App.css';
import Recipes from './Recipes';

const App = () => {


  const APP_ID = "ec50f458";
  const APP_KEY = "37639cc59edca7ebc3f006848af42bee";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response =
      await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-bar" value={search} onChange={updateSearch} />
        <button type="submit" className="search-button">Search</button>
      </form>
        <div className="recipies">
        {recipes.map(recipes => (
        <Recipes
          title={recipes.recipe.label}
          calories={recipes.recipe.calories}
          image={recipes.recipe.image}
          ingredients={recipes.recipe.ingredients}
          key={recipes.recipe.label}
        />
      ))}
        </div>
    </div>
  );














  // // const increment = () => {
  // //   setCounter(counter + 1);
  // // }

  // useEffect(() => {
  //   console.log("Effect has been Run!");
  // });

  // return (
  //   <div>
  //     <button onClick={() => setCounter(counter + 1)} /*onClick={increment} */>
  //       clickMe!
  //     </button>
  //     <h1>
  //       {console.log(counter), counter}
  //     </h1>
  //   </div>
  // );

}

export default App;
