import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function SelectTicket() {
  const navigate = useNavigate();
  return (
    <div className="relative -top-[10vh] mx-auto p-7 inset-0 bg-white rounded-md shadow-lg font-semibold">
      <p className="text-center">Product successfully added. Do the payment immediately.</p>
      <p className="text-center">
        Click{" "}
        <span
          className="font-bold cursor-pointer hover:text-pink-500 text-center"
          onClick={() => navigate("/user/pending-cart")}
        >
          Here
        </span>
      </p>
    </div>
  );
}
