import { useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import CountDown from "../CountDown";
import { useOTP } from "../context/OtpContext";
import { useUserName } from "../context/UserNameContext";
const DialogSendOtp = ({
  onClose,
  onBack,
  show,
  setShow,
  showConfirmPassword,
}) => {
  // const [otp, setOTP] = useState(["", "", "", "", "", ""]); // init OTP
  const { otp, setOTP } = useOTP();
  const { userName } = useUserName();
  const [errorOtp, setErrorOtp] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const newOTP = [...otp];
    if (value.length > 1) {
      value = value.slice(0, 1); // Get only the first char
    }
    newOTP[index] = value;
    setOTP(newOTP);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus(); // Move focus to the next input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      return toast.error("missing otp");
    }
    try {
      const response = await axios.get(
        "https://dev-fe-exam.viajsc.com/ExamUser/validate-otp-change-password",
        {
          params: {
            userName,
            otpCode,
          },
        }
      );
      console.log(response.data);
      if (response?.data?.content) {
        setShow(!show);
        showConfirmPassword(true);
      } else {
        setErrorOtp(true);
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-TbackModal opacity-60"></div>
      <div className="bg-white w-[560px] h-[444px] p-[24px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
        <div className="flex justify-between items-center">
          <p className="font-semibold uppercase text-[19px] leading-6 text-Tblack">
            Nhập mã otp
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
        <div>
          {errorOtp ? (
            <ErrorOtp></ErrorOtp>
          ) : (
            <p className="mt-[24px] uppercase text-[16px] leading-5 font-semibold text-Tgreen text-center">
              mã otp đã được gửi tới số điện thoại/ email
            </p>
          )}
          <div className="flex justify-center items-center my-[32px]">
            {errorOtp ? <CountDown></CountDown> : <CountDown></CountDown>}
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className=" flex px-[40px] ml-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="number"
                  id="OPT_Input"
                  maxLength={1}
                  value={digit}
                  className="mr-4 font-extrabold text-Tgreen w-1/6-minus-16  text-[28px] leading-8 outline-none rounded-md py-[8px] px-[8px] text-center  border-solid border-Tgray border-[1.5px]"
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              ))}
            </div>
            {errorOtp ? null : (
              <p className="text-[18px] text-center font-normal leading-5 my-[32px]">
                Không nhận được mã OTP.{" "}
                <span className="text-Tblue">Gửi lại mã</span>
              </p>
            )}
            <div className=" my-[32px] flex justify-between px-[110px]">
              <button
                onClick={onBack}
                className=" px-[18px] py-[12px] text-Tblack bg-Tgray rounded-md"
              >
                trở về
              </button>
              <button
                type="submit"
                className="px-[18px] py-[12px] bg-Tyellow text-white rounded-md"
              >
                thay đổi mật khẩu
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

function ErrorOtp() {
  return (
    <div className="px-[75px]">
      <p className=" p-[10px]  bg-Tpink text-[18px] text-center font-normal leading-5 my-[32px]">
        Mã khôi phục không đúng. <span className="text-Tblue">Gửi lại mã</span>
      </p>
    </div>
  );
}

export default DialogSendOtp;
