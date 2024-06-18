import { createContext, useEffect, useState } from 'react'

export const DataContext = createContext();
export const FunctionsContext = createContext();

export function TokenProvider({ children }){
  const [loginState, setLoginState] = useState({
    login: false,
    token: null
  });
  useEffect( ()=> {
    if(JSON.parse(localStorage.getItem("loginState"))?.login){
      setLoginState(()=> JSON.parse(localStorage.getItem("loginState")));
    }
  }, []);
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("Ar");

  function changeToken(e, state) {
      // setLoginState(() => ({
      //   'login': state,
      //   'token': e
      // }));
      localStorage.setItem("loginState", JSON.stringify({
        'login': state,
        'token': e
      }));

      setLoginState(()=> JSON.parse(localStorage.getItem("loginState")));

      console.log("local: ", JSON.parse(localStorage.getItem("loginState")));
  }

  function changeLang(lang){
    setLang(lang);
  }
  function changeDarkMode(isDark){
    setDarkMode(isDark);
  }

  return (
    <DataContext.Provider value={{ loginState, darkMode, lang }}>
      <FunctionsContext.Provider value={{changeToken, changeLang, changeDarkMode}}>
        {children}
      </FunctionsContext.Provider>
    </DataContext.Provider>
  )
};

