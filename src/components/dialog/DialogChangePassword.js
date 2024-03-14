import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import { useUserName } from "../context/UserNameContext";

const DialogChangePassword = ({ onClose, show, setShow, showOTP }) => {
  const { userName, setUserName } = useUserName();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName) return toast.error("missing input");
    // sessionStorage.setItem("userName", userName);
    try {
      const response = await axios.get(
        "https://dev-fe-exam.viajsc.com/ExamUser/get-otp-change-password",
        {
          params: {
            userName,
          },
        }
      );
      if (response?.data.errorCode === 200) {
        setShow(!show);
        showOTP(true);
      } else {
        return toast.error(response?.data?.error);
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-TbackModal opacity-60"></div>
      <div className="bg-white w-[560px] h-[329px] p-[24px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[19px] leading-6 text-Tblack">
            yêu cầu thay đổi mật khẩu
          </p>
          <div>
            <Image
              onClick={onClose}
              width={30}
              height={30}
              className="cursor-pointer"
              src="/images/iconClose.svg"
              alt="iconClose"
            ></Image>
          </div>
        </div>
        <form
          id=""
          action=""
          onSubmit={handleSubmit}
          className="mt-[24px] py-[24px]"
        >
          <div className="flex flex-col">
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
              className="block  p-2 outline-none border-solid border-Tgray border-[1.5px] rounded-sm"
            />
          </div>
          <p className="px-[77px] text-center text-[16px] my-[24px] font-normal leading-5 text-Tblack">
            bạn vui lòng kiểm tra hòm thư đến hoặc mục tin nhắn trên điện thoại
            để lấy mã otp
          </p>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="outline-none rounded-md text-[16px font-semibold leading-6 px-[18px] py-[12px] bg-Tyellow"
            >
              gửi yêu cầu
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DialogChangePassword;
