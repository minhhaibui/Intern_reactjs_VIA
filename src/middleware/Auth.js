// withAuth.js
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();
    useEffect(() => {
      const logined = sessionStorage.getItem("logined");
      if (!logined) {
        toast.error("Unauthorized");
        router.push("/");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
