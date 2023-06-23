import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { useNavigate } from "react-router-dom";

import state from "../store";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";
import { CustomButton } from "../components";

const Home = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header
            className="flex items-center"
            {...slideAnimation("down")}
          >
            <div className="w-24 flex-shrink-0">
              <Link to="/">
                <img
                  src="./logo.jpg"
                  alt="logo"
                  className="w-24 h-24 rounded-full"
                />
              </Link>
            </div>

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
          </motion.header>
          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET'S <br className="xl:block hidden" /> DO IT.
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
                Create your unique and exclusive shirt with our brand-new 3D
                customization tool. <strong>Unleash your imagination</strong>{" "}
                and define your own style.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
