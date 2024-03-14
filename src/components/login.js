"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  validateUserName,
  validatePassword,
} from "../app/validate/validate_form";
import DialogChangePassword from "./dialog/DialogChangePassword";
import DialogSendOtp from "./dialog/DialogSendOtp";
import DialogConfirmPassword from "./dialog/DialogConfirmPassword";
import DialogSuccessChangePassword from "./dialog/DialogSuccessChangePassword";
import { useOTP } from "./context/OtpContext";

export default function Login() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showDialogChangePassword, setShowDialogChangePassword] =
    useState(false);
  const [showDialogOtp, setShowDialogOtp] = useState(false);
  const [showDialogConfirmPassword, setshowDialogConfirmPassword] =
    useState(false);
  const [showDialogSuccessChangePassword, setShowDialogSuccessChangePassword] =
    useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const { otp, setOTP } = useOTP();

  const handleShowpassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUserName(userName)) {
      toast.error("Invalid username");
      return;
    }
    if (!validatePassword(password)) {
      toast.error("Invalid password");
      return;
    }
    try {
      const response = await axios.post(
        "https://dev-fe-exam.viajsc.com/ExamUser/login",
        { userName, password }
      );
      if (response?.data.success) {
        router.push("home");
        toast.success("login successfully");
        sessionStorage.setItem("userName", userName);
        sessionStorage.setItem("logined", true);
      } else {
        toast.error(response?.data.error);
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseDialog = () => {
    setShowDialogChangePassword(false);
    setShowDialogOtp(false);
    setshowDialogConfirmPassword(false);
  };
  const handleOnBack = () => {
    setOTP(["", "", "", "", "", ""]);
    setShowDialogOtp(false);
    setShowDialogChangePassword(true);
  };
  return (
    <>
      {showDialogChangePassword ? (
        <DialogChangePassword
          showOTP={setShowDialogOtp}
          onClose={handleCloseDialog}
          show={showDialogChangePassword}
          setShow={setShowDialogChangePassword}
        ></DialogChangePassword>
      ) : (
        ""
      )}
      {showDialogOtp ? (
        <DialogSendOtp
          onClose={handleCloseDialog}
          showConfirmPassword={setshowDialogConfirmPassword}
          show={showDialogOtp}
          setShow={setShowDialogOtp}
          onBack={handleOnBack}
        ></DialogSendOtp>
      ) : null}

      {showDialogConfirmPassword ? (
        <DialogConfirmPassword
          onClose={handleCloseDialog}
          show={showDialogConfirmPassword}
          setShow={setshowDialogConfirmPassword}
          showDialogSuccessChangePassword={setShowDialogSuccessChangePassword}
        ></DialogConfirmPassword>
      ) : null}

      {showDialogSuccessChangePassword ? (
        <DialogSuccessChangePassword
          show={showDialogSuccessChangePassword}
        ></DialogSuccessChangePassword>
      ) : null}
      <span className="block text-white title font-semibold text-lg leading-6 mb-4 uppercase">
        Đăng Nhập ngay!
      </span>
      <div className=" bg-white h-[130px] p-6 rounded-md">
        <form
          id="form_login"
          action=""
          onSubmit={handleSubmit}
          className="flex justify-evenly "
        >
          <div className="flex flex-col w-[35%]">
            <label
              className="text-Tblack mb-[4px] text-[16px] leading-5 font-normal"
              htmlFor=""
            >
              Tài khoản
            </label>
            <input
              type="text"
              placeholder="Nhập tài khoản..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              name="userName"
              className="block p-2 outline-none border-solid border-Tgray border-[1.5px] rounded-sm"
            />
          </div>
          <div className="flex flex-col w-[35%] relative">
            <label
              className="text-Tblack mb-[4px] text-[16px] leading-5 font-normal"
              htmlFor=""
            >
              Mật Khẩu
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="block p-2 outline-none border-solid border-Tgray border-[1.5px] rounded-sm"
            />
            <Image
              onClick={handleShowpassword}
              className=" absolute top-[30px] right-[7px] cursor-pointer"
              alt="icon"
              height={30}
              width={30}
              src={showPassword ? "/images/seeon.png" : "/images/seepw.png"}
            ></Image>
          </div>

          <button
            className=" w-[15%] font-semibold text-white text-[16px] px-4 py-[8px] bg-Tyellow mt-[23px] rounded-sm"
            type="submit"
          >
            đăng nhập
          </button>
        </form>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setShowDialogChangePassword(true)}
          className="block text-white title font-normal text-lg leading-6 mt-4 "
        >
          Quên mật khẩu
        </button>
      </div>
    </>
  );
}
