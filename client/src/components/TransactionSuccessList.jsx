import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function TransactionSuccessList({ transaction }) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white p-3 grid grid-cols-[3fr_1fr] mb-6 cursor-pointer hover:scale-[105%] transition-transform duration-500"
      onClick={() => navigate("/user/order/" + transaction?.id)}
    >
      <div>
        <h3>{transaction?.product?.name}</h3>
        <p>{""}</p>
        <p>Total: Rp. {transaction?.product?.price}</p>
      </div>
      <div className="flex flex-col justify-around">
        <img src="/logo-black.svg" alt="logo" />
        <button disabled className="bg-green-200 text-sm text-green-600 rounded-md mt-2">
          Finished
        </button>
      </div>
    </div>
  );
}
