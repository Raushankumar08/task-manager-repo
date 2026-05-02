import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Signup() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const signup = async () => {
    if (!form.name || !form.email || !form.password) {
      return alert("All fields are required");
    }

    try {
      setLoading(true);

      await API.post("/auth/signup", form);

      alert("Account created successfully ✅");
      nav("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-gray-900 to-black">

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8 w-96 text-white">

        <h2 className="text-3xl font-bold text-center mb-6">
          🚀 Create Account
        </h2>

        {/* NAME */}
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full mb-4 p-3 rounded-lg bg-white/10 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full mb-4 p-3 rounded-lg bg-white/10 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full mb-4 p-3 rounded-lg bg-white/10 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* BUTTON */}
        <button
          onClick={signup}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded-lg font-semibold"
        >
          {loading ? "Creating..." : "Signup"}
        </button>

        {/* LINK */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-purple-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}