import React, { useEffect, useState } from "react";
import { CustomButton } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import Card from "../components/Card";
import state from "../store";
import { useSnapshot } from "valtio";
import { useCartContext } from "../context/CartContext";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";

const Store = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const snap = useSnapshot(state);

  const { addToCart } = useCartContext();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch("https://lucky-store.onrender.com/api/v1/products")
      .then((res) => res.json())
      .then(({ data }) => {
        if (filter == "all") {
          setProducts(data);
        } else {
          setProducts(data.filter((product) => product.category === filter));
        }
      });
  }, [filter]);

  return (
    <main className="w-screen py-10 min-h-screen bg-[#e0e0e0]">
      <div className="flex mb-10 w-8/12 mx-auto items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 mr-5 relative">
            <FaBars
              className="w-[80%] h-[80%] cursor-pointer"
              onClick={() => setShow(!show)}
            />
            {show && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 192 }}
                className="absolute top-[100%] left-[50%] transform translate-x-[-50%] bg-gray-300 p-2 rounded-xl"
              >
                <p
                  className="m-4 cursor-pointer select-none"
                  onClick={() => {
                    setFilter("all");
                    setShow(!show);
                  }}
                >
                  All
                </p>
                <p
                  className="m-4 cursor-pointer select-none"
                  onClick={() => {
                    setFilter("men");
                    setShow(!show);
                  }}
                >
                  Men
                </p>
                <p
                  className="m-4 cursor-pointer select-none"
                  onClick={() => {
                    setFilter("women");
                    setShow(!show);
                  }}
                >
                  Women
                </p>
                <p
                  className="m-4 cursor-pointer select-none"
                  onClick={() => {
                    setFilter("kids");
                    setShow(!show);
                  }}
                >
                  Kids
                </p>
              </motion.div>
            )}
          </div>
          <Link to="/">
            <img
              src="/logo.jpg"
              alt="logo"
              className="w-24 h-24 object-contain rounded-full"
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
          {/* <Link to="/"> */}
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
          {/* </Link> */}
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
      <div className="m-auto border-t-black border-t p-12 w-8/12">
        <p className="text-center text-5xl mb-10">
          Here you can find what you want!
        </p>
        {/* <div className="flex justify-between w-full mb-10">
          <div className="flex w-[100px]">
            <CustomButton
              type="filled"
              handleClick={() => setFilter("all")}
              title="All"
            />
          </div>
          <div className="flex w-[100px]">
            <CustomButton
              type="filled"
              handleClick={() => setFilter("men")}
              title="Men"
            />
          </div>
          <div className="flex w-[100px]">
            <CustomButton
              type="filled"
              handleClick={() => setFilter("women")}
              title="Women"
            />
          </div>
          <div className="flex w-[100px]">
            <CustomButton
              type="filled"
              handleClick={() => setFilter("baby")}
              title="Baby"
            />
          </div>
        </div> */}

        <div className="mt-5 grid grid-cols-4 gap-10">
          {products.map((product) => (
            <Card
              key={product._id}
              title={product.title}
              price={product.price}
              img={product.image}
              id={product._id}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Store;
