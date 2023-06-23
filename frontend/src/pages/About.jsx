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
      <div className="w-[1000px] h-[600px] m-auto">
        <p className="text-4xl text-center text-gray-200">
          Founded in 2009, T-shirt Factory started out with a single booth in
          City Stars. T-Shirt Factory is the first Egyptian brand to provide
          easy access to printed customized t-shirts and the first to introduce
          direct to garment digital printing to the Egyptian market. The brand
          dominated the market with with its presence in almost all of Egypt’s
          top shopping malls. City Stars, Mall of Arabia, Cairo Festival to name
          a few. Our main goal is to help our customers put their own concept/
          design on a wearable garment. You imagine and we Print! Whether
          Digital printing or vinyl cutting, you get to watch your T-shirt being
          made on the spot. Not only do we offer high quality cotton t-shirts,
          but also we have a trained staff that will help you execute your
          concept. You do not have to wait for trends to be in stores anymore,
          You can print anything and anytime, within minutes!
        </p>
      </div>
    </main>
  );
};

export default About;
