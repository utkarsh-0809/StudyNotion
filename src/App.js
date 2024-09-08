import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import NavBar from "./components/core/NavBar";
function App() {
  
  return (
    <div>
      <NavBar>

      </NavBar>
      <Routes>
        <Route path="/" element={<Home></Home>} ></Route>
      </Routes>
      
    </div>
  )
}

export default App;
