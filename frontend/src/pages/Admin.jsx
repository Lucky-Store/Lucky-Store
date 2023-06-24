import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components";
import { useLogout } from "../hooks/useLogout";
import { useCartContext } from "../context/CartContext";

const Admin = () => {
  const { deleteOrder } = useCartContext();
  const [orders, setOrders] = useState([]);
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://lucky-store.onrender.com/api/v1/orders")
      .then((res) => res.json())
      .then(({ data }) => {
        setOrders(data);
        console.log(data);
      });
  }, []);

  return (
    <main className="w-screen py-10 min-h-screen bg-[#e0e0e0]">
      <div className="mx-auto mb-10 w-[70%] h-[60px] flex items-center justify-evenly">
        <p>Welcome to the admin page</p>
        <div className="w-[200px]">
          <CustomButton
            type="filled"
            title="Log Out"
            customStyles="w-full"
            handleClick={() => {
              logout();
              navigate("/login");
            }}
          />
        </div>
      </div>
      <div className="w-full border-t border-black">
        {orders?.length ? (
          orders?.map((order) => (
            <div key={order._id} className="border border-black">
              <div className="flex items-center justify-evenly">
                <div>{order.email}</div>
                <div>{order.phone}</div>
                <div
                  className="text-red-600 cursor-pointer"
                  onClick={() => {
                    deleteOrder(order._id);
                    location.reload();
                  }}
                >
                  Delete Order
                </div>
              </div>
              <div className="flex items-center justify-evenly my-4">
                <div className="w-1/5 flex items-center justify-center">
                  Shirt
                </div>
                <div className="w-1/5 flex items-center justify-center">
                  Title
                </div>
                <div className="w-1/5 flex items-center justify-center">
                  Quantity
                </div>
                <div className="w-1/5 flex items-center justify-center">
                  Size
                </div>
                <div className="w-1/5 flex items-center justify-center">
                  Price
                </div>
              </div>
              {order.line_items.map((item) => (
                <div
                  key={item.img}
                  className="flex items-center justify-evenly my-4"
                >
                  <div className="w-1/5 flex items-center justify-center">
                    <img src={item.img} alt="shirt" className="h-[100px]" />
                  </div>
                  <div className="w-1/5 flex items-center justify-center">
                    {item.title}
                  </div>
                  <div className="w-1/5 flex items-center justify-center">
                    {item.quantity}
                  </div>
                  <div className="w-1/5 flex items-center justify-center">
                    {item.size}
                  </div>
                  <div className="w-1/5 flex items-center justify-center">
                    {item.quantity} X {item.price} L.E
                  </div>
                </div>
              ))}
              {order.logo && (
                <div className="w-[300px] m-auto">
                  <img src={order?.logo} alt="" className="h-[200px]" />
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center mt-10 text-3xl">
            There is no orders to show
          </p>
        )}
      </div>
    </main>
  );
};

export default Admin;
