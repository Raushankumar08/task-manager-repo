import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Signup() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", form);

      alert("Signup successful ✅");
      nav("/");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.msg || "Signup failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl w-96 shadow">

        <h1 className="text-xl text-white mb-6 text-center">
          Create Account 🚀
        </h1>

        <input
          placeholder="Name"
          className="w-full mb-3 px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* 🔥 IMPORTANT FIX */}
        <select
          className="w-full mb-4 px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleSignup}
          className="w-full bg-green-500 py-2 rounded text-white"
        >
          Signup
        </button>

      </div>
    </div>
  );
}