import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/AuthSlice";
import { axiosInstance } from "../config/axiosInstance";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = ({ settoggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(
        "auth/login",
        { email: data.email, password: data.password },
        { withCredentials: true }
      );

      if (res.data) {
        dispatch(setUser(res.data.user));
        navigate("/home");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ---------------- LEFT SIDE IMAGE ---------------- */}
      <div className="w-full md:w-1/2 h-full md:h-auto relative">
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fHw%3D"
          alt="Fashion Illustration"
          className="w-full h-[800px] object-cover object-center"
        />
        {/* Overlay for text */}
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-sm md:text-lg text-center">
            Sign in to continue exploring fashion trends
          </p>
        </div>
      </div>

      {/* ---------------- RIGHT SIDE FORM ---------------- */}
      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center bg-gray-100"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 md:p-10 m-6 md:m-0">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-md"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            {/* Toggle Register */}
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={() => settoggle((prev) => !prev)}
                className="text-blue-600 font-medium cursor-pointer hover:underline"
              >
                Register here
              </span>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;