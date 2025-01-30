import { useState } from "react";
import Swal from "sweetalert2";
import axios from "../config/axiosInstance";
import { useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/register", {
        fullName,
        email,
        password,
      });
      console.log(data);
      navigate("/login");
    } catch (error) {
      Swal.fire({
        text: error.response?.data?.message || "Registration failed",
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
        background:
          "linear-gradient(to right,rgb(255, 255, 255),rgb(77, 192, 209))",
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
          Register
        </h1>
        <p>Lets explore your AnimeList !</p>
        <form
          onSubmit={handleRegister}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
            required
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
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
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
            required
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
            REGISTER
          </button>
        </form>
        <p style={{ marginTop: "15px", fontSize: "0.9rem", color: "#555" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#007bff", fontWeight: "bold" }}>
            Login now
          </a>
        </p>
      </div>
    </div>
  );
}
