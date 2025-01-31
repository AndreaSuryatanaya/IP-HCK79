import { Navigate, Outlet } from "react-router";

export default function NoAuthLayout() {
  const isAuth = localStorage.access_token;

  if (!isAuth) {
    return (
      <>
        <Outlet />
      </>
    );
  }
  return <Navigate to={"/"} />;
}
