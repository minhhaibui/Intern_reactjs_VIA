export default function SearchForm() {
  return (
    <>
      <span className="block text-white title font-semibold text-lg leading-6 mb-4 uppercase">
        Tìm kiếm nội dung
      </span>
      <div className=" bg-white h-[130px] p-6 rounded-md">
        <form id="form_login" action="" className="flex justify-between">
          <div className="flex flex-col flex-1 ">
            <label
              className="text-Tblack mb-[4px] text-[16px] leading-5 font-normal"
              htmlFor=""
            >
              Nhập thông tin cần tìm kiếm
            </label>
            <input
              type="text"
              placeholder="Tên người dùng, số điện thoại hoặc email"
              name="search"
              className="block p-2 outline-none border-solid border-Tgray border-[1.5px] rounded-sm"
            />
          </div>
          <button
            className="ml-[21px] font-semibold text-white text-[16px] px-4 py-[8px] bg-Tyellow mt-[23px] rounded-sm"
            type="submit"
          >
            Tìm
          </button>
        </form>
      </div>
    </>
  );
}
