import React from "react";
import CustomButton from "./CustomButton";
import { motion } from "framer-motion";
import { useCartContext } from "../context/CartContext";

const Card = ({ title, price, img, id }) => {
  const { addToCart } = useCartContext();
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ type: "tween" }}
      className="rounded-xl overflow-hidden bg-gray-300 p-2 pb-6"
    >
      <a href={`/store/${id}`}>
        <div className="flex justify-center items-center p-4">
          <img src={img} alt="shirt" className="w-8/12 h-[180px] rounded-lg" />
        </div>
        <div className="h-24">
          <p className="text-center text-lg my-4">{title}</p>
        </div>
      </a>
      <div className="flex justify-evenly">
        <p className="text-center text-lg">{price}L.E</p>
        <div className="w-50%">
          <CustomButton
            type="filled"
            title="Add to cart"
            handleClick={() => {
              addToCart(id, title, price, img);
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
