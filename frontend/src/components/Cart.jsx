import React, { useEffect, useReducer } from "react";

import { useSnapshot } from "valtio";
import { motion } from "framer-motion";
// import { IoCloseSharp } from "react-icons/io5";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import state from "../store";
import { close } from "../assets";
import { getContrastingColor } from "../config/helpers";
import { slideAnimation } from "../config/motion";
import { useCartContext } from "../context/CartContext";

const Cart = () => {
  const snap = useSnapshot(state);
  console.log(snap.color);
  const { items, logo, changeSize, increase, decrease, setLogo } =
    useCartContext();
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleClick = () => {
    forceUpdate();
  };

  useEffect(() => {}, [items]);

  return (
    <>
      <motion.div
        className={`absolute w-[500px] h-screen right-0 top-0 z-10 p-4 flex flex-col justify-between`}
        style={{ backgroundColor: snap.color }}
        {...slideAnimation("right")}
      >
        <div className="overflow-auto">
          <div>
            <button className="download-btn">
              <img
                src={close}
                alt="cart"
                className="w-3/5 h-3/5 object-contain"
                onClick={() => (state.cart = false)}
              />
            </button>
          </div>
          <div className="mt-10 ">
            {items.length ? (
              <>
                <div
                  className="border-t border-black flex"
                  style={{ color: getContrastingColor(snap.color) }}
                >
                  <div className="w-1/5 h-[40px] flex items-center justify-center">
                    Shirt
                  </div>
                  <div className="w-1/5 h-[40px] flex items-center justify-center">
                    Name
                  </div>
                  <div className="w-1/5 h-[40px] flex items-center justify-center">
                    Quantity
                  </div>
                  <div className="w-1/5 h-[40px] flex items-center justify-center">
                    Size
                  </div>
                  <div className="w-1/5 h-[40px] flex items-center justify-center">
                    Price
                  </div>
                  {/* <div className="w-1/6 h-[40px] flex items-center justify-center"></div> */}
                </div>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="border-t border-black flex"
                    style={{ color: getContrastingColor(snap.color) }}
                  >
                    <div className="w-1/5 rounded-full overflow-hidden">
                      <img src={item.img} alt="pic" className="h-full" />
                    </div>

                    <div className="w-1/5 flex items-center justify-center">
                      {item.title}
                    </div>
                    <div className="w-1/5 flex items-center justify-center">
                      <AiOutlineMinus
                        className="m-3 text-4xl cursor-pointer"
                        onClick={() => {
                          decrease(item.id);
                          handleClick();
                        }}
                      />
                      {item.qty}
                      <AiOutlinePlus
                        className="m-3 text-4xl cursor-pointer"
                        onClick={() => {
                          increase(item.id);
                          handleClick();
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center justify-center">
                      <select
                        className={`rounded-lg p-2 outline-none text-black`}
                        defaultValue="L"
                        // value={item.size}
                        onChange={(e) => changeSize(item.id, e.target.value)}
                      >
                        <option value="SM">SM</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                        <option value="XXXL">XXXL</option>
                      </select>
                      {/* {item.size} */}
                    </div>
                    <div className="w-1/5 flex items-center justify-center">
                      {item.qty * item.price} L.E
                    </div>
                    {/* <div className="w-1/6 flex items-center justify-center ">
                      <IoCloseSharp
                        className="text-4xl cursor-pointer"
                        onClick={() => {
                          removeFromCart(i);
                          state.cart = false;
                        }}
                      />
                    </div> */}
                  </div>
                ))}
                {logo && (
                  <div className="relative">
                    <img src={logo} alt="" />
                    <button className="download-btn absolute left-0 top-0">
                      <img
                        src={close}
                        alt="cart"
                        className="w-3/5 h-3/5 object-contain"
                        onClick={() => {
                          setLogo("");
                          localStorage.removeItem("logo");
                        }}
                      />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p
                className="border-t p-10 border-black"
                style={{ color: getContrastingColor(snap.color) }}
              >
                Nothing to show in cart
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="mb-2">
            Total Price:{" "}
            {items.reduce((perv, curr) => {
              return perv + curr.qty * curr.price;
            }, 0)}{" "}
            L.E
          </p>
          <button
            disabled={!items.length}
            className="w-full text-xl mb-10 p-5 bg-gray-500 rounded-md"
            onClick={() => {
              state.submit = true;
            }}
          >
            Place Order
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Cart;
