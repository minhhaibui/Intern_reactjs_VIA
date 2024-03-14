export default function Header() {
  return (
    <header className="header ">
      <div className="w-full h-[415px] relative">
        <img className="w-full" src="/images/bg.svg" alt="" />

        <div className=" w-[300px] h-[270px] absolute top-1 left-[3.5rem]">
          <img className="w-full" src="/images/logo.png" alt="" />
        </div>
      </div>
    </header>
  );
}
