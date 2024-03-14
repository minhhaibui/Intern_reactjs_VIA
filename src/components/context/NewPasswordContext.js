"use client";
import React, { createContext, useState, useContext } from "react";

const NewPasswordContext = createContext();

export const useNewPasswordContext = () => useContext(NewPasswordContext);

export const NewPasswordProvider = ({ children }) => {
  const [newPassword, setNewPassword] = useState("");

  return (
    <NewPasswordContext.Provider value={{ newPassword, setNewPassword }}>
      {children}
    </NewPasswordContext.Provider>
  );
};
