/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { useModal } from "../context/ModalContext";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";

//Component
import Register from "./modal/Register";
import Login from "./modal/Login";

//Assets
import Logo from "/logo-black.svg";
import profile from "../assets/images/profile.svg";
import logouticon from "../assets/images/logout.svg";
import add_product from "../assets/images/add-product.svg";
import avatar from "../assets/images/avatar.svg";
import cart from "../assets/images/cart.svg";

export default function Navbar() {
  const { openModal } = useModal();
  const [state, dispatch] = useContext(UserContext);
  const [dropdown, setDropdown] = useState(false);
  const { user, isLogin } = state;
  const { role, id, image } = user;

  const navigate = useNavigate();

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    setDropdown(false);
    navigate("/");
  };

  return (
    <>
      <nav className="h-[8vh] w-full bg-[#ffc700] sticky top-0 z-10 px-[5%] grid grid-cols-2 items-center">
        {/* Logo */}
        <div className="w-full">
          <img
            src={Logo}
            alt="logo"
            onClick={() => navigate("/")}
            className="cursor-pointer hover:scale-[95%] transition-transform duration-300"
          />
        </div>
        {/* Logo end */}

        {/* Conditional Rendering Section */}
        {isLogin ? (
          <div className="w-full grid grid-flow-col-dense gap-5 justify-end">
            <div className="w-full grid grid-cols-2 gap-5">
              {role == "user" && (
                <div
                  onClick={() => navigate("/user/cart")}
                  className="hover:scale-90 cursor-pointer transition-transform duration-500"
                >
                  <img src={cart} alt="cart" />
                </div>
              )}
              <div
                className="flex gap-[12px] items-center hover:scale-90 cursor-pointer transition-transform duration-500"
                onClick={handleDropdown}
              >
                {image ? (
                  <img
                    src={image}
                    className=" cursor-pointer object-cover h-[40px] w-[40px] rounded-full border-[3.5px] border-[#433434]"
                  />
                ) : (
                  <img src={avatar} alt="avatar" />
                )}
              </div>
              {/* ADMIN ROLE */}
              {role == "partner" ? (
                <div
                  id="dropdown"
                  className={` ${
                    dropdown ? "" : "hidden"
                  }  bg-white divide-y divide-gray-100 rounded-lg shadow-2xl w-[205px] fixed top-[8.5vh] right-[5.5%]`}
                >
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        to={id && "/partner/edit-profile/" + id}
                        className="flex items-center gap-3 py-2 hover:bg-gray-100  px-4"
                      >
                        <img src={profile} alt="" className=" scale-75" />{" "}
                        <span className="text-base text-md font-semibold">Profile Partner</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/partner/add-product" className="flex items-center gap-3 py-2 hover:bg-gray-100  px-4">
                        <img src={add_product} alt="" className=" scale-75" />{" "}
                        <span className="text-base text-md font-semibold">Add Product</span>
                      </Link>
                    </li>
                    <li className="border-t-4 border-yellow-900" onClick={logout}>
                      <Link className="flex items-center gap-3 py-2 hover:bg-gray-100 px-4">
                        <img src={logouticon} className="scale-75" alt="" />{" "}
                        <span className="text-red-600 text-lg font-semibold">Logout</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                // USER ROLE
                <div
                  id="dropdown"
                  className={` ${
                    dropdown ? "" : "hidden"
                  }  bg-white divide-y divide-gray-100 rounded-lg shadow-2xl w-[180px] fixed top-[8.5vh] right-[5.5%]`}
                >
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        to={id && "/user/profile/" + id}
                        className="flex items-center gap-3 py-2 pb-4 hover:bg-gray-100  px-4"
                      >
                        <img src={profile} alt="" className=" scale-75" />{" "}
                        <span className="text-base text-md font-semibold">Profile</span>
                      </Link>
                    </li>
                    <li className="border-t-4 border-yellow-900" onClick={logout}>
                      <Link className="flex items-center gap-3 py-2 pt-3 hover:bg-gray-100 px-4">
                        <img src={logouticon} className="scale-75" alt="" />{" "}
                        <span className="text-red-600 text-lg font-semibold">Logout</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Not Logged In
          <>
            <div className="w-full grid grid-flow-col-dense gap-5 justify-end">
              <button
                className="w-[110px] py-[3px] pb-1 text-center  bg-zinc-700 text-white font-semibold rounded-md hover:bg-zinc-800 active:ring-2 active:ring-slate-500"
                onClick={() => openModal(<Register />)}
              >
                Register
              </button>
              <button
                className="w-[110px] py-[3px] pb-1 text-center  bg-zinc-700 text-white font-semibold rounded-md hover:bg-zinc-800 active:ring-2 active:ring-slate-500"
                onClick={() => openModal(<Login />)}
              >
                Login
              </button>
            </div>
          </>
        )}
        {/* Conditional Rendering Section End */}
      </nav>
    </>
  );
}
