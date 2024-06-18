import { useRef,useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FunctionsContext, DataContext } from '../Context';
import './NavBar.css'
import AuthForm from '../Login/AuthForm';
import SelectList from '../SelectList/SelectList';
import axios from 'axios';
// import { useEffect } from 'react';
const NavBar = () => {
  const [menuState, setMenuState] = useState(false);
  const navMenu = useRef();
  const navigate = useNavigate();
  const x = useContext(DataContext);
  const dark = useContext(DataContext).darkMode;
  const darkModeChanger = useContext(FunctionsContext).changeDarkMode;
  const tokenChanger = useContext(FunctionsContext).changeToken;

  const [userList, setUserList] = useState();

  function darkMode() {
    if(dark){
      darkModeChanger(false);
    }else {
      darkModeChanger(true);
    }
  }
  function handelUserList(){
    setUserList(prev => !prev);
  }

//click out side the element
const userIconRef = useRef(null);
const userListRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userIconRef.current && !userIconRef.current.contains(event.target)) {
        if(userListRef.current && !userListRef.current.contains(event.target)){
          console.log('Clicked outside the element');
          setUserList(false)
        }
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  function handleLogout(){
    const token = x.loginState.token;
    console.log("log out: ", token);
    axios("https://app.having.market/api/logout", {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      method: "post",
    }).then(e => {
      if(e.status === 200){
        tokenChanger(null, false)
        console.log("loged out: ",e);
      }

    })
  }

  const AuthModal = useRef();
  function handleAuthInClick(){
    AuthModal.current.open();
  }
  function openMenu(){
    const page = document.querySelector("#root").lastElementChild;
    const body = document.querySelector("body")
    if(menuState) {
      console.log("openn");
      navMenu.current.style.left = "-300px";
      setMenuState(false); 
      page.style.pointerEvents = "auto";
      page.classList.remove("blured");
      body.style.overflow="auto"
    }else {
      window.scrollTo(0,0)
      body.style.overflow="hidden"
      navMenu.current.style.left = 0
      page.style.pointerEvents = "none";
      page.classList.add("blured");
      
      // .style.pointerEvents = "none";
      // cardViewer.classList.add("blured");
      setMenuState(true); 
    }
  }
  return (
    <>
    <AuthForm ref={AuthModal}></AuthForm>
    <nav className='navbar'>
      <div className="burger-icon" >
        <i className="fa-solid fa-bars" onClick={openMenu}></i>
      </div>
      <div className="logo">
        <h1>
          
          <i className="fa-solid fa-city"></i> HAVING</h1>
      </div>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/buy"}>Buy</Link>
        </li>
        <li>
          <Link to={"/rent"}>Rent</Link>
        </li>
      </ul>
      <div className="actions">
        {/* dark mode button */}
        <button
        className={`dark-mood ${dark ? "fa-solid" : "fa-regular"} fa-eye`}
        onClick={darkMode} />
        {/* user list button */}
        { x.loginState.login ? 
        <>
        <div className="user-icon">
        <i ref={userIconRef} className="fa-solid fa-user" onClick={handelUserList}></i>
        {
          userList && 
          <ul ref={userListRef} className='list-items'>
            <li onClick={() => {
              navigate("/profile")
              handelUserList();
            }}>Profile</li>
            <li onClick={() => {
              navigate("/user")
              handelUserList();
            }}>
              Dashboard
            </li>
            <li onClick={() => {
              handleLogout();
              handelUserList();
            }}>
            <i className="fa-solid fa-right-from-bracket" ></i>
            </li>
          </ul>
        }
        </div>
        </>:
        <button onClick={handleAuthInClick}>
          <i className="fa-solid fa-right-to-bracket"></i>
        </button>
        }
        {/* lang button */}
        {/* <SelectList /> */}
      </div>
      <div className="side-nav" ref={navMenu}>
        <ul>
        <li onClick={()=>{
                navigate("/");
                openMenu()
              }}>
                Home
              {/* <Link onClick={openMenu} to={"/"}>Home</Link> */}
            </li>
            <li onClick={()=>{
                navigate("/buy");
                openMenu()
              }}>
                Buy
              {/* <Link onClick={openMenu} to={"/buy"}>Buy</Link> */}
            </li>
            <li onClick={()=>{
                navigate("/rent");
                openMenu()
              }}>
                Rent
              {/* <Link onClick={openMenu} to={"/rent"}>Rent</Link> */}
            </li>
            {
              x.loginState.login ?
              <>
              <li onClick={()=>{
                navigate("/profile");
                openMenu()
              }}>
                {/* <Link onClick={openMenu} to={"/profile"}> */}
                  Profile
                {/* </Link> */}
              </li>
              <li onClick={() => {
                navigate("/user");
                openMenu();
                // handelUserList();
              }}>
                {/* <Link to={"/user"}> */}
                Dashboard
                {/* </Link> */}
              </li>
              <li onClick={() => {
                handleLogout();
                // handelUserList();
                openMenu();
              }}>
              {/* <i className="fa-solid fa-right-from-bracket" ></i> */}
              Logout
              </li>
              </>
              :
              <button onClick={handleAuthInClick}>
              <i className="fa-solid fa-right-to-bracket"></i>
            </button>
            } 
          </ul>
      </div>
    </nav>
    </>
  )
}

export default NavBar