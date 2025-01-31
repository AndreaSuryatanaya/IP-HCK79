import { Navigate, Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function AuthLayout() {
  const isAuth = localStorage.access_token;
  //   console.log(isAuth);

  if (isAuth) {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  }

  return <Navigate to={"/login"} />;
}
