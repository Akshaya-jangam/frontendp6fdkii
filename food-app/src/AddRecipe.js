import React, { useState, useEffect } from "react";
import "./AddRecipe.css";

const AddRecipe = () => {
    const [recipe, setRecipe] = useState({
        Recipe_title: "",
        Ingredients: "",
        Instructions: "",
        Cooking_time: "",
    });

    const [recipes, setRecipes] = useState([]);
    const token = localStorage.getItem("token"); // Get token from storage

    const handleChange = (e) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3007/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token, // Send token in request header
                },
                body: JSON.stringify(recipe),
            });

            const data = await response.json();
            alert(data.message);
            setRecipe({ Recipe_title: "", Ingredients: "", Instructions: "", Cooking_time: "" });

            fetchRecipes(); // Refresh recipes after adding
        } catch (error) {
            console.error("Error adding recipe:", error);
        }
    };

    const fetchRecipes = async () => {
        try {
            const response = await fetch("http://localhost:3007/recipes", {
                headers: { "Authorization": token }, // Send token
            });
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <div className="container">
            <div className="form-container">
                <h2>Add Recipe</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Recipe Title:</label>
                        <input type="text" name="Recipe_title" value={recipe.Recipe_title} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Ingredients:</label>
                        <textarea name="Ingredients" value={recipe.Ingredients} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Instructions:</label>
                        <textarea name="Instructions" value={recipe.Instructions} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Cooking Time (mins):</label>
                        <input type="number" name="Cooking_time" value={recipe.Cooking_time} onChange={handleChange} required />
                    </div>

                    <button type="submit" className="submit-btn">Add Recipe</button>
                </form>
            </div>

            <div className="recipe-list">
                <h2>Your Recipes</h2>
                {recipes.length > 0 ? (
                    recipes.map((rec, index) => (
                        <div className="recipe-card" key={index}>
                            <h3>{rec.Recipe_title}</h3>
                            <p><strong>Ingredients:</strong> {rec.Ingredients}</p>
                            <p><strong>Instructions:</strong> {rec.Instructions}</p>
                            <p><strong>Cooking Time:</strong> {rec.Cooking_time} mins</p>
                        </div>
                    ))
                ) : (
                    <p>No recipes yet. Add your first recipe!</p>
                )}
            </div>
        </div>
    );
};

export default AddRecipe;
