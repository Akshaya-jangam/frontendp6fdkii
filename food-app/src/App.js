import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import  Axios  from 'axios';
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import Login from "./Login";
import Register from "./Register";

import Home from "./pages/Home";
import AddRecipe from './AddRecipe';
//import Save from "./pages/Save";
import Recipes from "./pages/Recipes";
import Settings from "./pages/Settings";
import './App.css';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}


export default App;
