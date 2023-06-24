import React, { useEffect, useState } from "react";
import state from "../store";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CustomButton } from "../components";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useSnapshot } from "valtio";
import { useCartContext } from "../context/CartContext";

const Product = () => {
  const snap = useSnapshot(state);
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { addToCart } = useCartContext();

  useEffect(() => {
    fetch(`https://lucky-store.onrender.com/api/v1/product/${id}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setProduct(data);
        // console.log(data);
      });
  }, []);

  return (
    <main className="w-screen py-10 min-h-screen bg-[#e0e0e0]">
      <div className="flex mb-10 w-8/12 mx-auto items-center justify-between">
        <Link to="/">
          <img
            src="/logo.jpg"
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
        <div className="w-full flex">
          <div>
            <img
              src={product.image}
              alt="image"
              className="w-[600px] rounded-xl"
            />
          </div>
          <div className="p-10 max-w-[380px]">
            <h1 className="text-4xl font-bold">{product.title}</h1>
            <p className="text-2xl mt-10">{product.price}L.E</p>
            <p className="text-lg mt-10">{product.description}</p>
            <div className="w-[300px]">
              <CustomButton
                title="Add to cart"
                type="filled"
                customStyles="mt-10"
                handleClick={() =>
                  addToCart(id, product.title, product.price, product.image)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;
