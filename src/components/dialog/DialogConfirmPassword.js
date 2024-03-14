import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import { useOTP } from "../context/OtpContext";
import { useRouter } from "next/navigation";
import { validatePassword } from "../../app/validate/validate_form";
import { useUserName } from "../context/UserNameContext";
import { useNewPasswordContext } from "../context/NewPasswordContext";

export default function DialogConfirmPassword({
  onClose,
  show,
  setShow,
  showDialogSuccessChangePassword,
}) {
  const router = useRouter();
  const { newPassword, setNewPassword } = useNewPasswordContext();
  const [confirmPassword, setConfirmPassword] = useState("");
  const { otp } = useOTP();
  const { userName } = useUserName();
  const otpCode = otp.join("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(newPassword)) {
      return toast.error("Invalid password");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Password and confirmPassword do not match");
    }
    try {
      const response = await axios.post(
        "https://dev-fe-exam.viajsc.com/ExamUser/change-password",
        { userName, otpCode, password: newPassword, confirmPassword }
      );
      console.log(response.data);
      if (response?.data.success) {
        setShow(!show);
        showDialogSuccessChangePassword(true);
        sessionStorage.setItem("userName", userName);
        sessionStorage.setItem("logined", true);
      } else {
        return toast.error(response?.data.error);
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowpassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmpassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-TbackModal opacity-60 z-10"></div>
      <div className="bg-white w-[560px] h-[385px] p-[24px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md z-50">
        <div className="flex justify-between items-center mb-6">
          <p className="font-semibold text-[19px] leading-6 text-Tblack">
            thiết lập mật khẩu mới
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
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-between mb-[27px]">
            {/* password */}
            <div className="flex flex-col mt-6 mb-7 relative">
              <label
                className="text-Tblack mb-[4px] text-[16px] leading-5 font-normal"
                htmlFor=""
              >
                Mật Khẩu mới
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nhập mật khẩu..."
                name="password"
                className="block  p-2 outline-none border-solid border-Tgray border-[1.5px] rounded-sm"
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
            {/* confirmPassword */}
            <div className="flex flex-col relative">
              <label
                className="text-Tblack mb-[4px] text-[16px] leading-5 font-normal"
                htmlFor=""
              >
                Xác nhận mật khẩu mới
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Xác nhận mật khẩu..."
                name="confirmPassword"
                className="block  p-2 outline-none border-solid border-Tgray border-[1.5px] rounded-sm"
              />
              <Image
                onClick={handleShowConfirmpassword}
                className=" absolute top-[30px] right-[7px] cursor-pointer"
                alt="icon"
                height={30}
                width={30}
                src={
                  showConfirmPassword
                    ? "/images/seeon.png"
                    : "/images/seepw.png"
                }
              ></Image>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="outline-none rounded-md text-[16px font-semibold leading-6 px-[18px] py-[12px] bg-Tyellow"
            >
              đăng nhập
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
