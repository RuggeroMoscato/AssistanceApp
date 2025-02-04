import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  setInterval(() => {
    
    const checkAuth = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/auth",
          {},
          { withCredentials: true }
        );
        if (res.status === 200) {
          setIsLogged(true);
        }
      } catch (error) {
        setIsLogged(false);
      }
    };
    checkAuth();
  },60000);
// Rifai l'auth usando firebase
  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
