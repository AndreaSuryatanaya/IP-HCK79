import { useState, useCallback, useEffect } from "react";
import axios from "../config/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentialResponse = useCallback(
    async (response) => {
      try {
        const { data } = await axios.post("/google-login", {
          googleToken: response.credential,
        });

        localStorage.setItem("access_token", data.access_token);
        navigate("/");
      } catch (err) {
        Swal.fire({
          text: err.response?.data?.message || "Google login failed",
          icon: "error",
        });
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/");
    }

    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "669631760957-inii3quob1hcarkmam76mud5pb3gmdak.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        {
          theme: "outline",
          size: "large",
        }
      );
      window.google.accounts.id.prompt();
    }
  }, [navigate, handleCredentialResponse]);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      Swal.fire({
        text: error.response?.data?.message || "Login failed",
        icon: "error",
      });
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right,rgb(255, 255, 255),rgb(77, 192, 209))",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          width: "350px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "#343a40",
            marginBottom: "10px",
          }}
        >
          Login
        </h1>
        <p>Welcome back! Please login to continue.</p>
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            // required
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ced4da",
              borderRadius: "5px",
              fontSize: "1rem",
              transition: "0.3s",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            // required
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ced4da",
              borderRadius: "5px",
              fontSize: "1rem",
              transition: "0.3s",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#007bff",
              border: "none",
              color: "white",
              fontSize: "1rem",
              borderRadius: "5px",
              marginTop: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            LOG IN
          </button>
        </form>
        <p style={{ marginTop: "15px", fontSize: "0.9rem", color: "#555" }}>
          Dont have an account?{" "}
          <a href="/register" style={{ color: "#007bff", fontWeight: "bold" }}>
            Create an account
          </a>
        </p>
        <div id="buttonDiv" style={{ marginTop: "15px" }}></div>
      </div>
    </div>
  );
}
