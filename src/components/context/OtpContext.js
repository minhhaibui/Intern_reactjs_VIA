"use client";
import { createContext, useContext, useState } from "react";

const OTPContext = createContext();

export const OTPProvider = ({ children }) => {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);

  return (
    <OTPContext.Provider value={{ otp, setOTP }}>
      {children}
    </OTPContext.Provider>
  );
};

export const useOTP = () => useContext(OTPContext);
