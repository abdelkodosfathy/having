import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState, useContext, lazy, Suspense } from "react";
import { DataContext } from "./components/Context";

import './App.css'
import NavBar from './components/Navbar/NavBar'
//pages
// import Home from './pages/Home/Home';
// import Buy from './pages/Buy/Buy';
// import Rent from './pages/Rent/Rent';
// import User from "./pages/User/User";
// import NotFound from './pages/NotFound';

const Home = lazy(() => import("./pages/Home/Home"));
const Buy = lazy(() => import("./pages/Buy/Buy"));
const Rent = lazy(() => import("./pages/Rent/Rent"));
const User = lazy(() => import("./pages/User/User"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  console.log("app");
  const auth = useContext(DataContext).loginState;
  console.log(auth);
  return (
    <BrowserRouter>
      <NavBar/>
      <Suspense fallback={<h1>Loading..</h1>}>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/rent" element={<Rent/>}/>
            <Route path="/buy" element={<Buy/>}/>
            <Route path="/user" element={auth.login ? <User/> : <Home notAuth={true}/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
