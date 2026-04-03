import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { axiosInstance } from "../config/axiosInstance";

const Register = ({ settoggle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("auth/register", data, {
        withCredentials: true,
      });
      if (res) console.log(res);
    } catch (error) {
      console.log("Error in registration", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ---------------- LEFT IMAGE ---------------- */}
      <div className="w-full md:w-1/2 h-64 md:h-auto relative">
        <img
          src="https://plus.unsplash.com/premium_photo-1661274030066-09e7378fc470?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fHw%3D"
          alt="Fashion Illustration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Join the Community
          </h1>
          <p className="text-sm md:text-lg text-center">
            Create your account and start exploring
          </p>
        </div>
      </div>

      {/* ---------------- RIGHT FORM ---------------- */}
      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center bg-gray-100"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 md:p-12 m-6 md:m-0 border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Mobile
              </label>
              <input
                type="tel"
                placeholder="10 digit mobile"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                }`}
                {...register("mobile", {
                  required: "Mobile is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Mobile must be exactly 10 digits",
                  },
                })}
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="At least 6 characters"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-md"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>

            {/* Toggle Login */}
            <p className="text-sm text-center text-gray-600 mt-2">
              Already have an account?{" "}
              <span
                onClick={() => settoggle((prev) => !prev)}
                className="text-blue-600 font-medium cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;