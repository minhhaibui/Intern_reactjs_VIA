"use client";
import { useState } from "react";
import axios from "axios";
import { validateRegister } from "../app/validate/validate_register";
import DialogRegister from "./dialog/DialogRegister";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [dialogSuccess, setDialogSuccess] = useState({
    message: "",
    error: false,
  });

  const [formData, setFormData] = useState({
    userName: "",
    shopName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    email: "",
    address: "",
    wards: "",
    district: "",
    province: "",
    acceptTerm: false,
  });
  // console.log(formData);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name, val) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };
  //register
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateRegister(formData)) {
      try {
        const response = await axios.post(
          "https://dev-fe-exam.viajsc.com/ExamUser/register-user",
          formData
        );
        // console.log(response.data);
        setShowDialog(true);
        setDialogSuccess({
          message: response.data.error,
          error: !response.data.success,
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const handleCloseDialog = () => {
    setFormData({
      userName: "",
      shopName: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      email: "",
      address: "",
      wards: "",
      district: "",
      province: "",
      acceptTerm: false,
    });
    setShowDialog(false);
  };

  const handleOnLogin = async () => {
    try {
      const response = await axios.post(
        "https://dev-fe-exam.viajsc.com/ExamUser/login",
        { userName: formData.userName, password: formData.password }
      );

      if (response?.data.success) {
        router.push("home");
        sessionStorage.setItem("userName", formData.userName);
        sessionStorage.setItem("logined", true);
        toast.success("login successfully");
      } else {
        toast.error(response?.data.error);
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleShowpassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmpassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // call api city
  const [check, setcheck] = useState(true);
  const [cityData, setCityData] = useState([]);
  if (check) {
    getData();
    setcheck(false);
  }

  async function getData() {
    const response = await axios.get(
      "https://api.mysupership.vn/v1/partner/areas/province"
    );
    let arrProvince = [...response.data.results];
    setCityData(arrProvince);
  }
  const [DistrictsData, setDistrictsData] = useState([]);
  const [WardsData, setWardsData] = useState([]);
  const handleSelectChangeAll = async (e, name, url, callbacksetdata) => {
    try {
      const arr = e.target.value.split(",");
      const selectedValueName = arr[1];
      const selectedValueCode = arr[0];
      const checkCityOption = document.getElementById(name);
      if (checkCityOption) {
        checkCityOption.textContent = selectedValueName;
      }
      if (url != null && callbacksetdata != null) {
        const response = await axios.get(url + selectedValueCode);
        let result = [...response.data.results];
        callbacksetdata(result);
      }
      handleSelectChange(name, selectedValueName);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className=" w-3/5">
        {showDialog ? (
          <DialogRegister
            error={dialogSuccess.error}
            message={dialogSuccess.message}
            onClose={handleCloseDialog}
            onLogin={handleOnLogin}
          ></DialogRegister>
        ) : (
          ""
        )}
        <div className="rounded-md">
          <p className=" uppercase text-center text-[25px] font-semibold text-Tyellow mb-[46px]">
            đăng kí tài khoản
          </p>
          <form
            id="form_register"
            onSubmit={handleSubmit}
            action=""
            className=""
          >
            {/* row 1 */}
            <div className="flex justify-between mb-[27px]">
              {/* userName */}
              <div className="flex flex-col w-1/4-minus-24">
                <label
                  className="text-Tblack mb-[4px] text-[16px] leading-5 font-normal"
                  htmlFor=""
                >
                  Tài khoản
                </label>
                <input
                  type="text"
                  placeholder="Nhập tài khoản..."
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="block  p-2 outline-none border-solid border-Tgray border-[1.5px] rounded-sm"
                />
              </div>

              {/* shopName */}
              <div className="flex flex-col w-1/4-minus-24">
                <label
                  className="text-Tblack mb-[4px] text-[16px] leading-5 font-normal"
                  htmlFor=""
                >
                  Tên cửa hàng
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên cửa hàng"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  className="block  p-2 outline-none border-solid border-Tgray border-[1.5px] rounded-sm"
                />
              </div>

              {/* phoneNumber */}
              <div className="flex flex-col w-1/4-minus-24">
                <label
                  className="text-Tblack mb-[4px] text-[16px] leading-5 font-normal"
                  htmlFor=""
                >
                  Số điện thoại
                </label>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại..."
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="block  p-2 outline-none border-solid border-Tgray border-[1.5px] rounded-sm"
                />
              </div>
              {/* email */}
              <div className="flex flex-col w-1/4-minus-24">
                <label
                  className="text-Tblack mb-[4px] text-[16px] leading-5 font-normal"
                  htmlFor=""
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Nhập email..."
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  className="block  p-2 outline-none border-solid border-Tgray border-[1.5px] rounded-sm"
                />
              </div>
            </div>

            {/* row 2 */}
            <div className="flex justify-between mb-[27px]">
              {/* password */}
              <div className="flex flex-col w-1/2-minus-24 relative">
                <label
                  className="text-Tblack mb-[4px] text-[16px] leading-5 font-normal"
                  htmlFor=""
                >
                  Mật Khẩu
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu..."
                  value={formData.password}
                  onChange={handleChange}
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
              <div className="flex flex-col w-1/2-minus-24 relative">
                <label
                  className="text-Tblack mb-[4px] text-[16px] leading-5 font-normal"
                  htmlFor=""
                >
                  Xác nhận mật khẩu
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Xác nhận mật khẩu..."
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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

            {/* row 3 */}
            <div className=" mb-[27px]">
              {/* address */}
              <div className="flex flex-col ">
                <label
                  className="text-Tblack mb-[4px] text-[16px] leading-5 font-normal"
                  htmlFor=""
                >
                  Địa chỉ
                </label>
                <input
                  type="text"
                  placeholder="Nhập số nhà, tòa nhà, tên đường..."
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="block  p-2 outline-none border-solid border-Tgray border-[1.5px] rounded-sm"
                />
              </div>
            </div>

            {/* row 4 */}
            <div className="flex flex-row-reverse justify-between mb-[27px]">
              {/* wards */}
              <div className="flex flex-col w-1/3-minus-24">
                <label
                  className="text-Tblack mb-[4px] text-[16px] leading-5 font-normal"
                  htmlFor=""
                >
                  Phường/Xã
                </label>
                <select
                  name="wards"
                  value={formData.wards}
                  onChange={(e) =>
                    handleSelectChangeAll(e, "wards", null, null)
                  }
                  className="block  p-2 outline-none border-solid border-Tgray border-[1.5px] rounded-sm"
                >
                  <option value="" id="wards">
                    Chọn phường/xã
                  </option>
                  {WardsData.map((option, index) => (
                    <option
                      key={index}
                      value={[option.code, option.name].toString()}
                    >
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* district */}
              <div className="flex flex-col w-1/3-minus-24">
                <label
                  className="text-Tblack mb-[4px] text-[16px] leading-5 font-normal"
                  htmlFor=""
                >
                  Quận/Huyện
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={(e) =>
                    handleSelectChangeAll(
                      e,
                      "district",
                      "https://api.mysupership.vn/v1/partner/areas/commune?district=",
                      setWardsData
                    )
                  }
                  className="block  p-2 outline-none border-solid border-Tgray border-[1.5px] rounded-sm"
                >
                  <option value="" id="district">
                    Chọn quận/huyện
                  </option>
                  {DistrictsData.map((option, index) => (
                    <option
                      key={index}
                      value={[option.code, option.name].toString()}
                    >
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* province */}
              <div className="flex flex-col w-1/3-minus-24">
                <label
                  className="text-Tblack mb-[4px] text-[16px] leading-5 font-normal"
                  htmlFor=""
                >
                  Tỉnh/Thành phố
                </label>
                <select
                  name="province"
                  // value={1}
                  onChange={(e) =>
                    handleSelectChangeAll(
                      e,
                      "province",
                      "https://api.mysupership.vn/v1/partner/areas/district?province=",
                      setDistrictsData
                    )
                  }
                  className="block  p-2 outline-none border-solid border-Tgray border-[1.5px] rounded-sm"
                >
                  <option value="" id="province">
                    Chọn tỉnh/thành phố
                  </option>
                  {cityData.map((option, index) => (
                    <option
                      key={index}
                      // value={{ key: option.code, name: option.name }}
                      value={[option.code, option.name].toString()}
                    >
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* row 5 */}
            <div className="flex justify-between mb-[27px]">
              <div className="mt-[10px]">
                <input
                  type="checkbox"
                  checked={formData.acceptTerm}
                  onChange={handleChange}
                  name="acceptTerm"
                  className="mr-[5px]"
                />
                <span className="text-Tblack text-[16px] leading-5 font-normal">
                  Tôi đã đọc và đồng ý với{" "}
                  <span className="text-Tyellow">
                    Chính sách bảo mật thông tin
                  </span>
                </span>
              </div>
              <button
                className="font-semibold text-white text-[16px] px-[18px] py-[12px] leading-5 bg-Tyellow rounded-sm"
                type="submit"
              >
                Đăng ký ngay
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
