import { BrowserRouter, useNavigate, Routes, Route} from "react-router-dom";
import { useContext, lazy, Suspense, useEffect } from "react";
import { DataContext, FunctionsContext } from "./components/Context";

import './App.css'
import NavBar from './components/Navbar/NavBar'
import Profile from "./pages/Profile/Profile";
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

  const auth = useContext(DataContext).loginState;
  const tokenChanger = useContext(FunctionsContext).changeToken;

  console.log(auth);


  const url = new URL(window.location.href);
  const tok = url.searchParams.get('token');
  
  if(tok){
    useEffect(()=> {
      console.log("token: ",tok);
      tokenChanger(tok, true);
    }, [tok])
  }
  return (
    <BrowserRouter>
      <NavBar/>
      <Suspense fallback={<h1>Loading..</h1>}>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/rent" element={<Rent/>}/>
            <Route path="/buy" element={<Buy/>}/>
            <Route path="/profile" element={auth.login ? <Profile token={auth.token}/> : <Home notAuth={true}/>}/>
            {/* <Route path="/profile" element={<Profile token={auth.token}/>}/> */}
            <Route path="/user" element={auth.login ? <User/> : <Home notAuth={true}/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
