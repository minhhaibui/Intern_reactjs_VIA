import Image from "next/image";

export default function DialogRegister({ error, message, onClose }) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-TbackModal opacity-60"></div>
      <div className="bg-white w-[560px] h-[329px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
        <div className="flex justify-center items-center my-6">
          <Image
            src={
              error ? "/images/shieldError.svg" : "/images/shieldSuccess.svg"
            }
            alt="icon"
            width={48}
            height={58}
          ></Image>
        </div>

        <p
          className={`text-center my-6 text-[26px] font-semibold leading-[34px] uppercase ${
            error ? " text-Tred " : "text-Tgreen "
          }`}
        >
          {error ? "Đăng ký không thành công" : "Đăng ký thành công"}
        </p>
        <p className="px-[90px] text-center text-[18px] font-normal leading-5">
          {error
            ? message
            : " để sử dụng dịch vụ thu hộ,bạn có muốn Ký kết hợp đồng điện tử ngay"}
        </p>
        <div className="flex justify-between my-6 px-[126px]">
          <button
            onClick={onClose}
            className=" bg-Tgray text-4 font-sans px-[18px] py-[12px] rounded-sm leading-5 text-Tblack"
          >
            {error ? "< Bỏ qua đăng ký" : "Đăng nhập"}
          </button>
          <button
            onClick={onClose}
            className="bg-Tgreen text-4 font-sans px-[18px] py-[12px] rounded-sm leading-5 text-white"
          >
            {error ? "Thử lại" : "ký kết hợp đồng"}
          </button>
        </div>
      </div>
    </>
  );
}
