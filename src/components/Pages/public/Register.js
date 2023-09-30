"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();
  };

  const handleGoogleLogin = async () => {};

  const responseFacebook = (response) => {
    console.log(response);
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-black">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleRegistration} className="text-black">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-2">
          <h3>Register with Social media</h3>
          <div className="mb-4 flex gap-2">
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
            >
              Google
            </button>
            <button className="w-full bg-blue-800 text-white font-semibold py-2 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-900">
              {" "}
              Facebook
            </button>
          </div>
        </div>

        <p className="text-gray-700">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
