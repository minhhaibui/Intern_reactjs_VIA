"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
export default function Avatar() {
  const [userName, setUserName] = useState("");
  const router = useRouter();
  useEffect(() => {
    const userNameFromSession = sessionStorage.getItem("userName");
    if (userNameFromSession) {
      setUserName(userNameFromSession);
    }
  }, []);

  const handleLogin = () => {
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("logined");

    router.push("/");
  };
  return (
    <>
      <div className="flex flex-col justify-evenly gap-2 items-center">
        <span className="text-[16px] font-semibold leading-3 text-white">
          Xin chào bạn
        </span>
        <span className="my-[14px] text-[16px] font-semibold leading-3 text-white uppercase">
          {userName}
        </span>
        <div>
          <Image
            alt="avatr"
            width={102}
            height={107}
            src={"/images/avatar.png"}
          ></Image>
        </div>
        <button
          className="font-semibold text-white text-[16px] px-4 py-[8px] bg-Tyellow mt-[18px] rounded-sm"
          onClick={handleLogin}
        >
          Thoát
        </button>
      </div>
    </>
  );
}
