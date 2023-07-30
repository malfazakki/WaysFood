/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";

export default function Alert({ children, text }) {
  const navigate = useNavigate();
  return (
    <div className={`relative -top-[10vh] mx-auto p-7 inset-0 bg-white rounded-md shadow-lg font-semibold ${text}`}>
      {children}
    </div>
  );
}
