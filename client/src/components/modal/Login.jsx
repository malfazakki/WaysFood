/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { useModal } from "../../context/ModalContext";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { API, setAuthToken } from "../../config/api";
import Register from "./Register";
import Alert from "./Alert";

export default function Login() {
  let navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  const [_, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/login", form);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });

      setAuthToken(localStorage.token);

      if (response.data.data.role === "partner") {
        navigate("/partner");
      } else {
        navigate("/");
      }

      setMessage(() => openModal(<Alert>Success</Alert>));
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log("login failed : ", error);
    }

    closeModal();
  });

  return (
    <div className="relative mx-auto bg-white rounded-md shadow-lg">
      <div className="w-[26rem] container m-auto flex flex-col justify-center items-center py-10 px-5 shadow-lg">
        <h1 className="text-4xl w-full text-left leading-normal text-[#fcc700] font-semibold capitalize">Login</h1>
        <form className="mt-10 w-full" onSubmit={(e) => handleSubmit.mutate(e)}>
          <input
            type="username"
            className="w-full px-3 py-2 bg-white shadow-sm border-2 border-slate-300 placeholder-slate-400 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 block rounded-md sm:text-md focus:ring-1 mb-4"
            placeholder="Username"
            value={username}
            name="username"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 bg-white shadow-sm border-2 border-slate-300 placeholder-slate-400 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 block rounded-md sm:text-md focus:ring-1 mb-10"
            placeholder="Password"
            onChange={handleChange}
            value={password}
          />
          <button className="w-full py-2 bg-slate bg-[#433434] rounded-md text-xl text-white font-semibold focus:ring focus:ring-slate-300">
            Login
          </button>
        </form>
        <p className="w-full text-center mt-3 text-[#b1b1b1]">
          Don&apos;t have an account? Click{" "}
          <b
            className="font-semibold hover:text-gray-600 hover:text-bold cursor-pointer"
            onClick={() => openModal(<Register />)}
          >
            Here
          </b>
        </p>
      </div>
    </div>
  );
}
