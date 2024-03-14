import Login from "@/components/login";
import Register from "@/components/register";
export default function RootPage() {
  return (
    <div>
      <header className="absolute top-[4.75rem] right-[3.5rem]">
        <Login></Login>
      </header>
      <main>
        <div className="mx-[80px] mt-[60px]">
          <Register></Register>
        </div>
      </main>
    </div>
  );
}
