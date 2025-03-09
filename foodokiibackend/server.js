
const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const User=require('./models/User')
const bcrypt=require('bcryptjs')
const AddRecipe=require('./models/AddRecipe')
const app=express()
const PORT=3007

app.use(express.json());
const cors = require('cors');
app.use(cors());


app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from frontend
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type'
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



//homepage
app.get('/',(req,res)=>{
    res.send('')
})

//register
app.post('/register', async (req, res) => {
    console.log("Received registration request:", req.body); // Debugging log

    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        console.log("User saved to database:", user); // Debugging log
        res.json({ message: "User Registered.." });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: "Server error" });
    }
});

//login
app.post('/login',async(req,res)=>{
    const {email,password}=req.body 
    try{
        const user=await User.findOne({email});
        if(!user || !(await bcrypt.compare(password,user.password)))
        {
            return res.status(400).json({message:"Invalid Credentials"});
        }
    res.json({message:"Login Successfull",Username:user.username});

    }
    catch(err)
    {
      console.log(err)
    }
})
    //AddRecipe
    app.post('/add',async(req,res)=>{
        const {Recipe_title,Ingredients,Instructions,Cooking_time}=req.body
        try{
            const addrecipe=new AddRecipe({Recipe_title,Ingredients,Instructions,Cooking_time})
            await addrecipe.save()
            res.json({message:"Recipe Added"})
            console.log("Recipe added Successfully")
        }
        catch(err){
            console.log(err)

        }

    
})
// Fetch all recipes
app.get('/recipes', async (req, res) => {
    try {
        const recipes = await AddRecipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
});



mongoose.connect(process.env.MONGO_URL).then(
()=>console.log('DB connected ')
).catch(
    (err)=>console.log(err)
)
app.listen(PORT,(err)=>{
    if(err)
    {
        console.log(err)
    }
    console.log("server is running on port:"+PORT)
})