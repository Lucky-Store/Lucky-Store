import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { useSignup } from "../hooks/useSignup";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const { signup, error, isLoading } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[500px] h-[550px] bg-[#EFBD48] rounded-xl p-8 relative">
        <p className="text-6xl text-center mb-12">Sign Up</p>
        <p className="text-left">Email</p>
        <input
          type="text"
          placeholder="Enter your user name!"
          className="w-full h-12 my-4 rounded-lg p-2 outline-none"
          value={email}
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-left mt-8">Password</p>
        <input
          type={passwordType}
          placeholder="Enter your password!"
          className="w-full h-12 my-4 rounded-lg p-2 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <div className="w-[80%] h-[30px] m-auto rounded-md bg-red-600 text-black flex justify-center items-center">
            {error}
          </div>
        )}
        <Link to="/login">
          <p className="text-right text-xs mt-4 mb-8">
            Already have an account? Log In!
          </p>
        </Link>
        <div className="w-full flex justify-around">
          <button
            className="text-lg p-4 rounded-lg bg-yellow-300 outline-none"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </button>
          <button
            className="text-lg p-4 rounded-lg bg-yellow-300 outline-none"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {passwordType == "password" && (
          <AiFillEye
            className="absolute right-[40px] bottom-[200px] cursor-pointer"
            onClick={() => setPasswordType("text")}
          />
        )}
        {passwordType == "text" && (
          <AiFillEyeInvisible
            className="absolute right-[40px] bottom-[200px] cursor-pointer"
            onClick={() => setPasswordType("password")}
          />
        )}
      </div>
    </div>
  );
};

export default SignUp;
