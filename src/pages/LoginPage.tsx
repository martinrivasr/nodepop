import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Message from "../components/message";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = await loginApi({ email, password });
      setMessage({ type: "success", text: "Inicio de sesión exitoso. Redirigiendo..." });
      console.log("Token recibido:", token); 
      login(token);
      localStorage.setItem("token", token); 
      navigate("/adverts"); 
      console.log("Redirección a /adverts ejecutada");

    } catch (error) {
      setMessage({ type: "error", text: "Credenciales incorrectas. Intenta nuevamente." });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "24rem" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold">Sign in to your account</h2>
          <p className="text-muted">Or start your 14-day free trial</p>
        </div>
        {message && <Message type={message.type} text={message.text} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                id="rememberMe"
                className="form-check-input"
              />
              <label htmlFor="rememberMe" className="form-check-label">
                Remember me
              </label>
            </div>
            <a href="#" className="text-decoration-none text-primary">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign in
          </button>
        </form>
        <div className="text-center">
          <span className="text-muted">Or continue with</span>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-outline-secondary w-45">Google</button>
          <button className="btn btn-outline-secondary w-45">GitHub</button>
        </div>
        <div className="text-center mt-3">
          <p className="mb-0">
            Not a member?{" "}
            <Link to="/signup" className="text-decoration-none text-primary">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
