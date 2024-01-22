// Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "./Authenticate";
import { auth } from "../../model/data/firebase/Firebase_config";

const authService = new AuthService(auth);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const user = await authService.signIn(email, password);
      if (user) {
        navigate("/senecaadmin/getallparticipant"); 
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);

    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
