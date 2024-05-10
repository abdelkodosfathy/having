import { useRef,useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FunctionsContext, DataContext } from '../Context';
import './NavBar.css'
import AuthForm from '../Login/AuthForm';
import SelectList from '../SelectList/SelectList';
// import { useEffect } from 'react';
const NavBar = () => {
  const navigate = useNavigate();
  const x = useContext(DataContext);
  const dark = useContext(DataContext).darkMode;
  const darkModeChanger = useContext(FunctionsContext).changeDarkMode;
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
        }else {
          console.log("list clicked ?");
        }
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  function handleLogout(){

  }

  const AuthModal = useRef();
  function handleAuthInClick(){
    AuthModal.current.open();
  }
  return (
    <>
    <AuthForm ref={AuthModal}></AuthForm>
    <nav className='navbar'>
      <div className="logo">
        <h1><i className="fa-solid fa-city"></i> HAVING</h1>
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
        <button
        className={`dark-mood ${dark ? "fa-solid" : "fa-regular"} fa-eye`}
        onClick={darkMode} />
        { x.loginState.login ? 
        <>
        <div className="user-icon">
        <i ref={userIconRef} className="fa-solid fa-user" onClick={handelUserList}></i>
        {
          userList && 
          <ul ref={userListRef} className='list-items'>
            <li>Profile</li>
            <li onClick={() => navigate("/user")}>
              Dashboard
            </li>
            <li>
            <i className="fa-solid fa-right-from-bracket"></i>
            </li>
          </ul>
        }
        </div>
        </>:
        <button onClick={handleAuthInClick}>
          <i className="fa-solid fa-right-to-bracket"></i>
        </button>
        }
        {/* <div className="user-icon">
          {
            x.loginState.login ?
            <>
            <ul className="list-items">
              <li>one</li>
              <li>two</li>
              <li>
              <i 
                onClick={handleAuthInClick}
                class="fa-solid fa-right-to-bracket"></i>
              </li>
            </ul></> :
            <>
            <Link to={"/user"}>
              <i
              onClick={handleAuthInClick}
              class="fa-solid fa-right-from-bracket"
              style={{coloe: "white"}}></i>
            </Link>
          </>
          }
        </div> */}
        <SelectList />
      </div>
    </nav>
    </>
  )
}

export default NavBar