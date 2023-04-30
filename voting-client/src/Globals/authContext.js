import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUserUsername, setCurrentUserUsername] = useState(null);
  const [currentUserName, setCurrentUserName] = useState(null)
  const [currentUserHasVoted, setCurrentUserHasVoted] = useState(null)

  useEffect(() => {
    const storedUserUsername = localStorage.getItem("userUsername");
    const storedUserName = localStorage.getItem("userName");
    const storedUserHasVoted = localStorage.getItem("userHasVoted");
    if (storedUserUsername) {
      setCurrentUserUsername(storedUserUsername);
      setCurrentUserName(storedUserName);
      setCurrentUserHasVoted(storedUserHasVoted)
    }
  }, []);

  const login = (userUsername, userName, userHasVoted) => {
    setCurrentUserUsername(userUsername);
    setCurrentUserName(userName);
    setCurrentUserHasVoted(userHasVoted)
    localStorage.setItem("userUsername", userUsername);
    localStorage.setItem("userName", userName);
    localStorage.setItem("userHasVoted", userHasVoted);
  };

  const logout = () => {
    setCurrentUserUsername(null);
    setCurrentUserName(null);
    setCurrentUserHasVoted(null);
    localStorage.removeItem("userUsername");
    localStorage.removeItem("userName");
    localStorage.removeItem("userHasVoted");
  };

  const isLoggedIn = () => {
    return currentUserUsername !== null;
  };

  const userData = () => {
    return {
        username: currentUserUsername,
        name: currentUserName,
        has_voted: currentUserHasVoted
    }
  }

  const value = {
    userData,
    login,
    logout,
    isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
