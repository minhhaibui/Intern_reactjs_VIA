export default function Header() {
  return (
    <header className="header ">
      <div className="w-full h-2/5 relative">
        <img className="w-full" src="/images/bg.svg" alt="" />

        <div className=" w-[17%] h-[270px] absolute top-[-4.75rem] left-[3.5rem]">
          <img className="w-full" src="/images/logoheader.png" alt="" />
        </div>
      </div>
    </header>
  );
}
