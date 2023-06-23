import React, { useState } from "react";
import { useSnapshot } from "valtio";
import CustomButton from "./CustomButton";
import { AiOutlineClose } from "react-icons/ai";
import { useCartContext } from "../context/CartContext";
import state from "../store";

const Submit = () => {
  const snap = useSnapshot(state);
  const [phone, setPhone] = useState("");
  const { addOrder, setItems, setLogo } = useCartContext();
  return (
    <div className="absolute w-screen h-screen z-30 bg-black/70 top-0 left-0 flex items-center justify-center">
      <div className="w-[600px] h-[400px] bg-white rounded-xl p-6 relative">
        <h1 className="text-5xl text-center">
          To submit your order please enter your Email or Number:
        </h1>
        <input
          type="text"
          placeholder="Enter your Email or Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="outline-none border-[3px] border-black rounded-lg p-2 mt-10 mx-auto block"
          pattern="1-9"
        />
        <CustomButton
          type="filled"
          title="Submit"
          customStyles="mx-auto block mt-10 w-[80%] h-[60px] text-lg"
          handleClick={() => {
            addOrder(phone);
            state.submit = false;
            state.cart = false;
            state.success = true;
          }}
        />
        <AiOutlineClose
          className="absolute top-2 right-2 text-3xl cursor-pointer"
          onClick={() => (state.submit = false)}
        />
      </div>
    </div>
  );
};

export default Submit;
