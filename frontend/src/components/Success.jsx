import React from "react";
import CustomButton from "./CustomButton";
import { useSnapshot } from "valtio";
import state from "../store";

const Success = () => {
  const snap = useSnapshot(state);
  return (
    <div className="absolute w-screen h-screen z-30 bg-black/70 top-0 left-0 flex items-center justify-center">
      <div className="w-[400px] h-[400px] bg-white p-4 rounded-lg">
        <p className="text-4xl text-center mt-[50px]">
          Thank You for visiting our store!
        </p>
        <CustomButton
          title="Continue Shopping"
          type="filled"
          customStyles="h-[60px] block mt-[100px] mx-auto w-[70%]"
          handleClick={() => {
            state.success = false;
            state.intro = true;
          }}
        />
      </div>
    </div>
  );
};

export default Success;
