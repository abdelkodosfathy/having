import { useContext } from 'react'
import { FunctionsContext } from '../Context'
import axios from 'axios';

import styles from "./Styles.module.scss";
import {createPortal} from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { forwardRef, useState, useRef, useImperativeHandle } from "react";

const AuthForm = forwardRef(({}, ref) => {
  const navigate = useNavigate();
  const mainURL  = "https://app.having.market/api/";
  const dialog = useRef();
  const [panel, setPanel] = useState(false);
  const tokenChanger = useContext(FunctionsContext).changeToken;
  
  const [verfied, setVerified] =  useState(false);

// for login proccess
  function handleLogSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password')
    };
    console.log(data);
    axios.post("https://app.having.market/api/login", data).then((e)=>{
      if(e.status === 200){
        const resToken = e.data.data.token
        console.log(e);
        tokenChanger(resToken, 200);
        LoginSuccessfully();
        navigate("/buy");
      }
    }).catch(function (error) {
      if (error.response.status === 401) {
        alert("Unauthorized: Wrong password or account");
      } else {
        alert("there is somthing wrong in data you entered..");
        // console.log("An error occurred:", error.message);
      }
    });
  }
  // for registeration proccess
  function handleRegSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      password: formData.get('password'),
      password_confirmation: formData.get('password_confirmation')
    };
    axios.post(mainURL+"register",data)
    .then(res => {
      console.log(res);
      const resToken = res.data.data.token;
      tokenChanger(resToken, 200);
      navigate("/buy");
      if(e.status === 200){
        const resToken = e.data.data.token
        console.log(e);
        tokenChanger(resToken, 200);
      }
      setVerified("in progress");
      function checkVerify(){
        axios(mainURL+"user", {
          headers: {
            // 'Accept': 'application/vnd.api+json',
            // 'Content-Type': 'application/vnd.api+json',
            'Authorization': `Bearer ${res.data.data.token}`
          },
        }).then(e => {
          // console.log(e);

          if(e.data.email_verified_at !== null){
            clearInterval(interval);
            setVerified(true);
            navigate("/buy");
            LoginSuccessfully();
          }
        })
      }
      const interval = setInterval(checkVerify, 2000);
    })
    .catch(err => {
      alert("there is somthing wrong in data you entered..");
      // console.log(err)
    });
    const vpanel = dialog.current.querySelector("div.panel");
    console.log("reg: ", vpanel);
    

  }
  
  // for oppeining and closing the dialog
  
  function handelSignInPanel() {
    setPanel((prev) => {
      return !prev;
    });
  }
  function LoginSuccessfully(){
    dialog.current.close();
    
  }
  useImperativeHandle(ref , () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      }
    };
  })
  function handleClose(){

    dialog.current.close();
  }
  return createPortal(
    <dialog ref={dialog}
      className={`${styles.container} ${panel && styles.rightPanelActive}`}
      id="container"
    >
      <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
        <form onSubmit={handleRegSubmit} >
        <i className={`fa-solid fa-xmark ${styles.close}`} onClick={handleClose}></i>
          <h1>Create Account</h1>
          <div className={styles.socialContainer}>
            <a href="#" className="">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="">
              <i className="fab fa-google-plus-g"></i>
            </a>
          </div>
          <span>or use your email for registration</span>
          <input required type="text" placeholder="Name" name='name'/>
          <input required type="email" placeholder="Email" name='email'/>
          <input required type="number" placeholder="phone" name='phone'/>
          <input required type="password" placeholder="Password" name='password'/>
          <input required type="password" placeholder="confirm password" name='password_confirmation'/>
          <button className={styles.signUpButton}>Sigsn Up</button>
        </form>
      </div>
      <div className={`${styles.formContainer} ${styles.signInContainer}`}>
        <form onSubmit={handleLogSubmit} >
        <i className={`fa-solid fa-xmark ${styles.close}`} onClick={handleClose}></i>
          <h1>Sign in</h1>
          <div className={styles.socialContainer}>
            <a href="#" className="">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="">
              <i className="fab fa-google-plus-g"></i>
            </a>
          </div>
          <span>or use your account</span>
          <input required type="email" placeholder="Email" name='email' />
          <input required type="password" placeholder="Password" name='password'/>
          <a href="#">Forgot your password?</a>
          <button>Sign In</button> 
          {/* <dotlottie-player 
          src="https://lottie.host/a59f5b57-f547-477e-9873-dbcee063026d/z5KjHWBpnc.json"
          background="transparent"
          speed="1"
          style={{width: "300px", height: "300px"}}
          
          autoplay>
          </dotlottie-player>
          <h3>Login Successfully</h3> */}
        </form>
      </div>
      <div className={styles.overlayContainer + " panel " + 
`${verfied === "in progress" || verfied === true ? styles.verification :''}`
    }>
        <div className={styles.overlay}>
          <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>

            {verfied === "in progress" ? 
            <>
            <dotlottie-player 
              src="https://lottie.host/1cdf1cf5-8a69-4b48-9ce9-21fd8ec03cbb/HetkZGBD4S.json"
              background="transparent"
              speed="1"
              style={{width: "300px", height: "300px"}}
              loop
              autoplay>
            </dotlottie-player>
            <h3>Waiting for account verification</h3>
            <p>please check your mail</p>
            </>
            :
            verfied === true ? <>
            <h3>Verfied Successfully</h3>
            </>
              :           
            <>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className={styles.buttonGhost}
                id="signIn"
                onClick={handelSignInPanel}
              >
                Sign In
              </button>

            </>
            }
          </div>
          <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button
              className={styles.buttonGhost}
              id="signUp"
              onClick={handelSignInPanel}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      
    </dialog>, 
    document.getElementById("modal-root")
  );
})

export default AuthForm;
