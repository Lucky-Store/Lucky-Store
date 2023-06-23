import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";

const Context = createContext();

export const CartStateContext = ({ children }) => {
  const { user } = useAuthContext();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  // const [orders, setOrders] = useState([]);
  const [logo, setLogo] = useState("");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart"));
    const logo = JSON.parse(localStorage.getItem("logo"));

    if (items) {
      setItems(items);
    }
    if (logo) {
      setLogo(logo);
    }
  }, []);

  // cloudinary.config({
  //   cloud_name: "dhgiqtzpr",
  //   api_key: "873942994598248",
  //   api_secret: "lAukkePcQK-uFgkwp9vOMpIYdqs",
  // });

  const notify = (title) => {
    toast.success(`${title} added to cart`);
  };
  const notify2 = (title) => {
    toast.success(`${title} already in cart`);
  };

  // const addToCart = (photo, type, quantity, size) => {
  //   let temp = items;
  //   temp.push({ photo, type, quantity, size });
  //   setTotal(total + quantity);
  //   setItems(temp);
  // };

  // const removeFromCart = (i) => {
  //   let temp = items;
  //   temp.splice(i, 1);
  //   setItems(temp);
  // };

  const addToCart = (id, title, price, img) => {
    let check = true;
    items.forEach((item) => {
      if (item.id === id) {
        notify2(title);
        check = false;
      }
    });
    if (check) {
      let temp = items;
      temp.push({ id, title, price, img, size: "L", qty: 1 });
      setItems(temp);
      console.log(temp);
      localStorage.setItem("cart", JSON.stringify(temp));
      notify(title);
    }
  };

  const changeSize = (id, size) => {
    let temp = items;
    temp.forEach((item) => {
      if (item.id === id) {
        item.size = size;
      }
    });
    setItems(temp);
    localStorage.setItem("cart", JSON.stringify(temp));
  };

  const increase = (id) => {
    console.log(id);
    let temp = items;
    temp.forEach((item) => {
      if (item.id === id) {
        item.qty += 1;
        console.log(item.qty);
      }
    });
    setItems(temp);
    localStorage.setItem("cart", JSON.stringify(temp));
  };
  const decrease = (id) => {
    let temp = items;
    temp.forEach((item) => {
      if (item.id === id) {
        if (item.qty === 1) {
          temp = temp.filter((item) => item.id !== id);
        } else {
          item.qty -= 1;
        }
      }
    });
    setItems(temp);
    localStorage.setItem("cart", JSON.stringify(temp));
  };

  const addOrder = async (phone) => {
    // const { url } = await cloudinary.uploader.upload(logo);
    // setLogo(url);
    let line_items = [];
    items.forEach((item) => {
      line_items.push({
        title: item.title,
        img: item.img,
        quantity: item.qty,
        price: item.price,
        size: item.size,
      });
    });
    const order = {
      line_items,
      email: user.email,
      phone,
    };
    console.log(order);
    console.log(logo);
    const res = await fetch("http://localhost:3000/api/v1/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order, logo }),
    });

    setItems([]);
    setLogo("");
    localStorage.removeItem("cart");
    localStorage.removeItem("logo");
    // if (res.ok) {
    // }

    // let temp = orders;
    // temp.push({ email: user.email, phone, items });
    // console.log(temp);
    // setOrders(temp);
    // localStorage.setItem("orders", JSON.stringify(orders));
  };

  const deleteOrder = async (id) => {
    const res = await fetch("http://localhost:3000/api/v1/order", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  };

  return (
    <Context.Provider
      value={{
        addToCart,
        items,
        total,
        addOrder,
        setItems,
        deleteOrder,
        changeSize,
        increase,
        decrease,
        setLogo,
        logo,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCartContext = () => useContext(Context);
