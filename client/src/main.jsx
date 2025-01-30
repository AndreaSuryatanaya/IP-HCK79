import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from "react-dom/client";
import AuthLayout from "./pages/AuthLayout";
import NoAuthLayout from "./pages/NoAuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<NoAuthLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/clubs/:id" element={<ClubsId />} />
      <Route path="/myclubs" element={<MyClubs />} />
      <Route path="/myclubs/:ClubId" element={<MyClubsId />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
);
