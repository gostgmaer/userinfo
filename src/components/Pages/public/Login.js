"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PasswordField from "@/components/global/fields/PasswordField";
import { post } from "@/utils/http";
import { useAuthContext } from "@/context/authContext";
const Login = () => {
  // @ts-ignore
  const {handleLoginAuth,user,userId} = useAuthContext()
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // setResume({ ...resume, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = {
      email: formData.email,
      password: formData.password
    };

   try {
     await handleLoginAuth(body);
   
   } catch (error) {
   }
  };
  const handleGoogleLogin = async () => {};

  const responseFacebook = (response) => {
    console.log(response);
  };

  useEffect(() => {
    if (userId) {
      router.push('/profile')
    }
  }, [userId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-black">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin} action="post">
          <div className="mb-4 text-black">
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
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 text-black">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold"
            >
              Password
            </label>
            <PasswordField
              value={formData.password}
              handleChange={handleChange}
              placeholder={"Enter Your password"}
              name={"password"}
            />
          </div>
          <div className="mb-4 mt-10">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-2 mt-5">
          <h3>Login with </h3>
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
          Don t have an account?{" "}
          <Link href={"/register"} className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
