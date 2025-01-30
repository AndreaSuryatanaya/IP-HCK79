import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from "react-dom/client";
import AuthLayout from "./pages/AuthLayout";
import NoAuthLayout from "./pages/NoAuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import GeminiTalk from "./pages/Gemini";
import Favorite from "./pages/Favorite";
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route element={<NoAuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/talk" element={<GeminiTalk />} />
          <Route path="/favorite" element={<Favorite />} />
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
