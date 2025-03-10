const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const AddRecipe = require('./models/AddRecipe');
const cors = require('cors');

const app = express();
const PORT = 3007;

app.use(express.json());

// ✅ Correct CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Homepage
app.get('/', (req, res) => {
    res.send('Welcome to the Foodokii API');
});

// Register User
app.post('/register', async (req, res) => {
    console.log("Received registration request:", req.body);

    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        console.log("User saved to database:", user);
        res.json({ message: "User Registered Successfully" });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Login User
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        res.json({ message: "Login Successful", username: user.username });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Add Recipe
app.post('/add', async (req, res) => {
    const { Recipe_title, Ingredients, Instructions, Cooking_time } = req.body;
    try {
        const addrecipe = new AddRecipe({ Recipe_title, Ingredients, Instructions, Cooking_time });
        await addrecipe.save();
        res.json({ message: "Recipe Added Successfully" });
        console.log("Recipe added Successfully");
    } catch (err) {
        console.error("Error adding recipe:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Fetch all recipes
app.get('/recipes', async (req, res) => {
    try {
        const recipes = await AddRecipe.find();
        res.json(recipes);
    } catch (err) {
        console.error("Error fetching recipes:", err);
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('✅ DB connected successfully');
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
    });

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
