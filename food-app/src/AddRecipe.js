import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  Axios  from 'axios';
const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: [''],
    instructions: '',
    cookingTime: '',
    difficulty: 'easy'
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result =await Axios.post("https://foodokiibackend.onrender.com")
    console.log('Recipe Submitted:', recipe);
    navigate('/');
  };

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setRecipe({ 
      ...recipe, 
      ingredients: [...recipe.ingredients, ''] 
    });
  };

  return (
    <div className="form-container">
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Recipe Title:</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ingredients:</label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-input">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                required
              />
            </div>
          ))}
          <button 
            type="button" 
            onClick={addIngredient}
            className="add-button"
          >
            Add Ingredient
          </button>
        </div>

        <div className="form-group">
          <label>Instructions:</label>
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
            rows="5"
          />
        </div>

        <div className="form-group">
          <label>Cooking Time (minutes):</label>
          <input
            type="number"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Difficulty:</label>
          <select
            name="difficulty"
            value={recipe.difficulty}
            onChange={handleChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Submit Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;