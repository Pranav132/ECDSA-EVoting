import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUserUsername, setCurrentUserUsername] = useState(null);
  const [currentUserName, setCurrentUserName] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserUsername = localStorage.getItem("userUsername");
    const storedUserName = localStorage.getItem("userName");
    if (storedUserUsername) {
      setCurrentUserUsername(storedUserUsername);
      setCurrentUserName(storedUserName);
    }
  }, []);

  const login = (userUsername, userName) => {
    setCurrentUserUsername(userUsername);
    setCurrentUserName(userName);
    localStorage.setItem("userUsername", userUsername);
    localStorage.setItem("userName", userName);
    localStorage.setItem("userHasVoted", false);
  };

  const logout = () => {
    setCurrentUserUsername(null);
    setCurrentUserName(null);
    localStorage.removeItem("userUsername");
    localStorage.removeItem("userName");
    localStorage.removeItem("userHasVoted");
  };

  const setVoted = () => {
    localStorage.setItem("userHasVoted", true)
  }

  const isLoggedIn = () => {
    const check = currentUserUsername !== null
    setLoading(false);
    return check;
  };

  const userData = {
        username: currentUserUsername,
        name: currentUserName,
        has_voted: localStorage.getItem("userHasVoted")
    }

  const value = {
    userData,
    login,
    logout,
    isLoggedIn,
    loading,
    setVoted
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
