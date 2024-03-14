import Services from "@/components/Services";
import Login from "@/components/login";
import Register from "@/components/register";
export default function RootPage() {
  return (
    <div>
      <header className="absolute top-[4.75rem] right-[3.5rem] w-[57%]">
        <Login></Login>
      </header>
      <main>
        <div className="mx-[80px] mt-[60px]">
          <div className="flex  gap-x-[130px]">
            <Register></Register>
            <div className="mt-[90px] flex-1 flex justify-end">
              <Services></Services>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
