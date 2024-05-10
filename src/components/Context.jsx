import { createContext, useState } from 'react'

export const DataContext = createContext();
export const FunctionsContext = createContext();

export function TokenProvider({ children }){
  const [loginState, setLoginState] = useState({
    login: false,
    token: null
  });
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("Ar");

  function changeToken(e, state) {
    if(state === 200){
      setLoginState(prev => ({
        'login': true,
        'token': e
      }));
    }
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

