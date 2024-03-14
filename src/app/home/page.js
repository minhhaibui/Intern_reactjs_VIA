"use client";
import { useState, useEffect } from "react";

import SearchForm from "./SearchForm";
import Avatar from "./Avatar";
import withAuth from "../../middleware/Auth";
import Services from "@/components/Services";

function Home() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const userNameFromSession = sessionStorage.getItem("userName");
    if (userNameFromSession) {
      setUserName(userNameFromSession);
    }
  }, []);
  return (
    <div>
      <div className="absolute w-[50%] top-[4.75rem] right-[22.5rem]">
        <SearchForm></SearchForm>
      </div>
      <div className="absolute w-[135px] top-[4rem] right-[5.5rem]">
        <Avatar></Avatar>
      </div>
      <main className="h-[482px] flex justify-between mt-[90px]  pr-[50px]">
        <div className="flex justify-center items-center flex-col w-3/5">
          <p className="text-[25px] uppercase font-semibold text-Tyellow mb-[52px]">
            bạn đã đăng nhập thành công
          </p>
          <p className="text-4 font-bold leading-5 ">
            chào mừng <span className="text-Tyellow">{userName}</span> đã quay
            lại hệ thống
          </p>
        </div>
        <div className="w-[32%]">
          <Services></Services>
        </div>
      </main>
    </div>
  );
}

export default withAuth(Home);
