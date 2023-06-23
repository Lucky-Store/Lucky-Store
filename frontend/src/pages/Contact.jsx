import React from "react";
import { CustomButton } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import state from "../store";

const Contact = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  return (
    <main className="w-screen py-10 min-h-screen bg-[#e0e0e0] ">
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
      <div className="w-full flex flex-col justify-center items-center">
        <p className="text-4xl">Contact our chat bot!</p>
        <iframe
          height="600"
          width="1000"
          className="mt-20"
          allow="microphone;"
          src="https://console.dialogflow.com/api-client/demo/embedded/45df1296-9b43-48e2-b69b-3fb2b328c26a"
        ></iframe>
        {/* <p className="text-4xl text-center">Stay in touch with us!</p>
        <p className="text-2xl my-[50px] text-center">
          For any questions email us
        </p>

        <a
          href="mailto:storewebproject@gmail.com"
          className="text-4xl text-center block my-[50px] text-[#ab801d]"
        >
          storewebproject@gmail.com
        </a>
        <p className="text-2xl my-[50px] text-center">
          Contact us on our number
        </p>
        <p className="text-center my-[50px] text-4xl">+201234567890</p>
        <p className="text-2xl my-[50px] text-center">
          Don't forget to follow us on social media
        </p>
        <div className="flex justify-evenly">
          <a href="https://facebook.com" target="_blank">
            <BsFacebook className="text-4xl hover:text-blue-700 cursor-pointer" />
          </a>
          <a href="https://instagram.com" target="_blank">
            <BsInstagram className="text-4xl cursor-pointer hover:text-red-600" />
          </a>
          <a href="https://twitter.com" target="_blank">
            <BsTwitter className="text-4xl cursor-pointer hover:text-blue-400" />
          </a>
        </div> */}
        {/* <iframe
          src="https://bot.dialogflow.com/45df1296-9b43-48e2-b69b-3fb2b328c26a"
          ></iframe> */}
      </div>
    </main>
  );
};

export default Contact;
