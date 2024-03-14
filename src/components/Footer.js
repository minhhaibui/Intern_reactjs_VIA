import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" pt-10 ">
      <div className=" h-[255px] bg-BgGray py-[48px] px-[82px]">
        <h2 className="text-[28px] text-center font-semibold leading-5 text-Tyellow ">
          khách hàng tiêu biểu
        </h2>
        <div className="grid grid-cols-6 gap-6 place-items-center ">
          <img src="/images/tiktok.png" alt="" />
          <img src="/images/upos.png" alt="" />
          <img src="/images/shoppe.png" alt="" />
          <img src="/images/oppo.png" alt="" />
          <img src="/images/tiki.png" alt="" />
          <img src="/images/thegioididong.png" alt="" />
        </div>
      </div>

      <div className="bg-Tfooter h-[380px] text-[18px] text-white px-[86px] pt-[48px]">
        <div className=" flex justify-between items-center">
          <div>
            <img className="w-[195px]" src="/images/logo.png" alt="icon" />
            <p>CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ PHÁT TRIỂN ỨNG DỤNG THÔNG MINH VIỆT</p>
            <p>Mã Số Thuế: 0106494214</p>
            <p>Ngày hoạt động: 27/03/2014</p>
          </div>
          <div>
            <p>liên hệ</p>
            <p>1900 9999</p>
            <p>16, Ngõ 204, Trần Duy Hưng, Trung Hòa, Cầu Giấy, HN </p>
          </div>
          <div className="">
            <p>tải ứng dụng</p>
            <div className="flex justify-between items-center gap-7">
              <img className="w-[80px] h-[80px]" src="/images/qr.jpg" alt="" />
              <div className="flex flex-col justify-between items-center">
                <img
                  className="w-[70px] h-[30px] mb-[10px]"
                  src="/images/appstore.png"
                  alt=""
                />
                <img
                  className="w-[70px] h-[30px]"
                  src="/images/ggplay.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-white mt-8">
          <h1 className="font-semibold">CHÍNH SÁCH BẢO MẬT</h1>
          <h2 className="text-sm">
            Copyright © 2021 VIA JSC. All rights reserved.
          </h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
