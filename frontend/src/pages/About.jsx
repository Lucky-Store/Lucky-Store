import React from "react";
import { CustomButton } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import state from "../store";

const About = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { logout } = useLogout();
  return (
    <main className="w-screen py-10 min-h-screen bg-yellow-100 about">
      <div className="flex mb-10 w-8/12 mx-auto items-center justify-between">
        <Link to="/">
          <img
            src="./logo.jpg"
            alt="logo"
            className="w-24 h-24 object-contain rounded-full"
          />
        </Link>
        <div className="flex justify-between w-[550px]">
          <Link to="/">
            <div className="flex w-[100px]">
              <CustomButton type="filled" title="Home" />
            </div>
          </Link>
          <Link to="/store">
            <div className="flex w-[100px]">
              <CustomButton type="filled" title="Store" />
            </div>
          </Link>
          <Link to="/about">
            <div className="flex w-[100px]">
              <CustomButton type="filled" title="About Us" />
            </div>
          </Link>
          <Link to="/contact">
            <div className="flex w-[100px]">
              <CustomButton type="filled" title="Contact" />
            </div>
          </Link>
          <div className="flex w-[100px]">
            <CustomButton
              type="filled"
              title="Cart"
              handleClick={() => {
                if (!user) {
                  navigate("/login");
                } else {
                  navigate("/");
                  state.intro = false;
                }
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-evenly w-[300px]">
          {user && (
            <>
              <p>Welcome {user.email.split("@")[0]}</p>
              <div className="flex w-[100px]">
                <CustomButton
                  type="filled"
                  title="Log Out"
                  handleClick={() => {
                    logout();
                  }}
                />
              </div>
            </>
          )}
          {!user && (
            <>
              <Link to="/login">
                <div className="flex w-[100px]">
                  <CustomButton type="filled" title="Log In" />
                </div>
              </Link>
              <Link to="/signup">
                <div className="flex w-[100px]">
                  <CustomButton type="filled" title="Sign Up" />
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="w-[1150px] h-[750px] m-auto">
        <p className="text-4xl text-center text-gray-200">
          Welcome to our sportswear store! We are passionate about providing athletes, fitness enthusiasts, and active individuals with high-quality sportswear that combines style, comfort, and performance. At our store, we believe that sportswear should not only enhance your performance but also reflect your unique personality. That's why we curate a wide range of sport clothing options from top brands, ensuring that you'll find the perfect fit for your active lifestyle. Our team is dedicated to staying up-to-date with the latest trends and technologies in sportswear, bringing you innovative designs, eco-friendly materials, and advanced features to optimize your athletic endeavors. We strive to offer a seamless online shopping experience, with user-friendly navigation, detailed product descriptions, and helpful sizing guides to assist you in finding the perfect gear.
        </p>
      </div>
    </main>
  );
};

export default About;
