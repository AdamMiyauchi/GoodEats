import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Homepage from './Components/homepage.jsx'
import Login from './Components/login.jsx'
import Signup from './Components/signup.jsx'
import CreateRecipe from './Components/createRecipe.jsx'
import Recipe from './Components/recipe.jsx'
import EditRecipe from './Components/editRecipe';

function App() {
  return (
    <Router login={Login}>
          <Routes>
              <Route path = "/" exact element={<Homepage/>} />
              <Route path = "/login" exact element={<Login/>} />
              <Route path = "/signup" exact element={<Signup/>} />
              <Route path = "/createRecipe" exact element={<CreateRecipe/>} />
              <Route path = "/editRecipe" exact element={<EditRecipe/>} />
              <Route path = "/recipe/:recipe_id" exact element={<Recipe/>} />
          </Routes>
      </Router>

  );
}

export default App;
