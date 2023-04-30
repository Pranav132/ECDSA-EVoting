import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUserUsername, setCurrentUserUsername] = useState(null);
  const [currentUserName, setCurrentUserName] = useState(null)
  const [currentUserHasVoted, setCurrentUserHasVoted] = useState(null)
  const [loading, setLoading] = useState(true);

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

  const setVoted = () => {
    setCurrentUserHasVoted(true);
    localStorage.setItem("userHasVoted", true)
  }

  const isLoggedIn = () => {
    const check = currentUserUsername !== null
    setLoading(false);
    return check;
  };

  const hasVoted = () => {
    const check = currentUserHasVoted !== "false"
    setLoading(false);
    return check;
  }

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
    loading,
    hasVoted, 
    setVoted
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
