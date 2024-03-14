import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

import { useUserName } from "../context/UserNameContext";
import { useNewPasswordContext } from "../context/NewPasswordContext";

export default function DialogSuccessChangePassword() {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-TbackModal opacity-60"></div>
      <div className="bg-white w-[660px] h-[280px] p-[24px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
        <div className="flex justify-center items-center my-[26px]">
          <Image
            alt="icon"
            width={50}
            height={50}
            src={"/images/shieldSuccess.svg"}
          ></Image>
        </div>
        <p className="text-[23px] font-semibold leading-5 text-center text-Tgreen uppercase">
          mât khẩu đã được thiết lật thành công
        </p>
        <p className="my-[24px] text-[16px] font-normal leading-5 text-center">
          Bạn vui lòng ghi nhớ mật khẩu !
        </p>
        <div className="flex justify-center items-center">
          {" "}
          <CountDown></CountDown>
        </div>
      </div>
    </div>
  );
}

const CountDown = () => {
  const [count, setCount] = useState(5);
  const { newPassword } = useNewPasswordContext();
  const [calledLogin, setCalledLogin] = useState(false);
  const { userName } = useUserName();
  const router = useRouter();

  useEffect(() => {
    let timer;
    const updateCountdown = () => {
      setCount((prevCount) => {
        if (prevCount > 0) {
          return prevCount - 1;
        } else {
          clearInterval(timer);
          return prevCount;
        }
      });
    };
    timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  async function handleLoginAfterChangePassword() {
    try {
      const response = await axios.post(
        "https://dev-fe-exam.viajsc.com/ExamUser/login",
        { userName, password: newPassword }
      );
      if (response?.data.success) {
        router.push("home");
        toast.success("login successfully");
      } else {
        toast.error(response?.data.error);
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    if (count === 0 && !calledLogin) {
      handleLoginAfterChangePassword();
      setCalledLogin(true);
    }
  }, [count, calledLogin]);

  return (
    <span>
      {count > 0 ? (
        <span className="inline-block text-Tyellow text-[18px] font-normal leading-5">
          {`Tự động đăng nhập sau ${count} giây `}
        </span>
      ) : null}
    </span>
  );
};
