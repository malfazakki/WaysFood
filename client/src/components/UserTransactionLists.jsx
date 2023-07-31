/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export default function UserTransactionLists({ transaction }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="bg-white p-4 flex justify-around items-center cursor-pointer"
        onClick={() => navigate(`/user/restaurant/${transaction?.id}`)}
      >
        <img
          src={`http://localhost:5000/uploads/${transaction?.image}`}
          alt={transaction.product.name}
          className="h-[65px] w-[65px] object-cover"
        />{" "}
        <p className="text-lg font-semibold font-serif">{transaction.product.name}</p>
      </div>
    </>
  );
}
