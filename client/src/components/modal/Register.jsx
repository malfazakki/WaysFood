/* eslint-disable no-unused-vars */
import { useMutation } from "react-query";
import { useState } from "react";
import { API } from "../../config/api";
import { useModal } from "../../context/ModalContext";
import Login from "./Login";
// import Alert from "../modal/Alert";

export default function Register() {
  const { openModal } = useModal();
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    gender: "",
    phone: "",
    role: "",
  });

  const { email, password, username, gender, phone, role } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", form);

      setMessage(alert("success"));
      setForm({
        email: "",
        password: "",
        username: "",
        gender: "",
        phone: "",
        role: "",
      });
      openModal(<Login />);
    } catch (error) {
      setMessage(alert("failed"));
      console.log("register failed : ", error);
    }
  });

  return (
    <div className="relative mx-auto bg-white rounded-md shadow-lg">
      <div className="flex">
        <div className="w-[26rem] h-[30rem] overflow-y-scroll m-auto flex flex-wrap justify-center items-center py-8 px-5 shadow-lg">
          <h1 className="text-4xl leading-normal text-[#ffc700] font-semibold capitalize text-left w-full">Register</h1>
          <form className="mt-10 w-full" onSubmit={(e) => handleSubmit.mutate(e)}>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 bg-white shadow-sm border-2 border-slate-300 placeholder-slate-400 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 block rounded-md sm:text-md focus:ring-1 mb-6"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 bg-white shadow-sm border-2 border-slate-300 placeholder-slate-400 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 block rounded-md sm:text-md focus:ring-1 mb-6"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
            <input
              type="text"
              name="username"
              className="w-full px-3 py-2 bg-white shadow-sm border-2 border-slate-300 placeholder-slate-400 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 block rounded-md sm:text-md focus:ring-1 mb-6"
              placeholder="Username"
              value={username}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              className="w-full px-3 py-2 bg-white shadow-sm border-2 border-slate-300 placeholder-slate-400 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 block rounded-md sm:text-md focus:ring-1 mb-6"
              placeholder="Phone"
              value={phone}
              onChange={handleChange}
            />
            <select
              className="w-full px-3 py-2 bg-white shadow-sm border-2 border-slate-300 placeholder-slate-400 text-slate-400 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 block rounded-md sm:text-md focus:ring-1 mb-6"
              name="role"
              value={role}
              onChange={handleChange}
            >
              <option hidden>Register As</option>
              <option>user</option>
              <option>partner</option>
            </select>
            <button
              type="submit"
              className="mt-5 mb-3 w-full py-2 bg-slate bg-[#433434] rounded-md text-xl text-white font-semibold focus:ring focus:ring-slate-300"
            >
              Register
            </button>
            <p className="text-[#b1b1b1] text-center">
              Already have an account? Click{" "}
              <span
                className="font-semibold capitalize hover:text-gray-600 hover:text-bold cursor-pointer active:font-bold"
                onClick={() => openModal(<Login />)}
              >
                here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
