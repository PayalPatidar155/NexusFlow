import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email aur password dono bharo");
      return;
    }

    setError("");
    // Dummy login. Week 3 mein yahan backend API call aayegi.
    navigate("/");
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account"
      footerText="Account nahi hai?"
      footerLink="/register"
      footerLinkText="Register"
    >
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-sm text-red-400 mb-3">{error}</p>}

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </AuthLayout>
  );
}