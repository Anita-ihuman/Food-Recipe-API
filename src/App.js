import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';
import axios from 'axios'; // Import Axios

const App = () => {
  const APP_ID = '632955f6'; // Replace with your Edamam API ID
  const APP_KEY = 'e03ae22264ca62d19314d1ed6b93f166'; // Replace with your Edamam API Key

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        setRecipes(response.data.hits);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        // Handle errors gracefully, e.g., display an error message to the user
      }
    };

    fetchData();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))
        ) : (
          <p>No recipes found. Try a different search term.</p>
        )}
      </div>
    </div>
  );
};

export default App;