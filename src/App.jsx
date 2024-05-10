import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "./components/Context";

import './App.css'
import NavBar from './components/Navbar/NavBar'
//pages
import Home from './pages/Home/Home';
import Buy from './pages/Buy/Buy';
import Rent from './pages/Rent/Rent';
import User from "./pages/User/User";
import NotFound from './pages/NotFound';
import { TokenProvider } from "./components/Context";
import CardsViewer from "./components/CardsViewer/CardsViewer";


function App() {
  console.log("app");
  const auth = useContext(DataContext).loginState;
  console.log(auth);
  const [marketData, setMarketData] = useState({ rent: [], sell: [] });
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/rent" element={<Rent/>}/>
          <Route path="/buy" element={<Buy/>}/>
          <Route path="/user" element={auth.login ? <User/> : <Home notAuth={true}/>}/>
          <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
