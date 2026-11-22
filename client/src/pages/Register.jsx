import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("Saare fields bharo");
      return;
    }
    if (form.password.length < 6) {
      setError("Password kam se kam 6 characters ka ho");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords match nahi kar rahe");
      return;
    }

    setError("");
    // Week 3 mein yahan backend API call aayegi.
    navigate("/login");
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start monitoring your IoT devices"
      footerText="Pehle se account hai?"
      footerLink="/login"
      footerLinkText="Login"
    >
      <form onSubmit={handleSubmit}>
        <Input id="name" name="name" label="Full Name" placeholder="Your name" value={form.name} onChange={handleChange} />
        <Input id="email" name="email" label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
        <Input id="password" name="password" label="Password" type="password" placeholder="Min 6 characters" value={form.password} onChange={handleChange} />
        <Input id="confirmPassword" name="confirmPassword" label="Confirm Password" type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={handleChange} />

        {error && <p className="text-sm text-red-400 mb-3">{error}</p>}

        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </AuthLayout>
  );
}