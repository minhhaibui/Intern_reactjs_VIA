"use client";
import { createContext, useContext, useState } from "react";

const UserNameContext = createContext();

export const UserNameProvider = ({ children }) => {
  const [userName, setUserName] = useState("");

  return (
    <UserNameContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserNameContext.Provider>
  );
};

export const useUserName = () => useContext(UserNameContext);
