/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export default function UserTransactionLists({ transaction }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="bg-white p-4 grid grid-cols-2 items-center cursor-pointer"
        onClick={() => navigate(`/user/order/${transaction?.id}`)}
      >
        <div className="flex items-center">
          <img
            src={transaction?.product?.image}
            alt={transaction?.product?.name}
            className="h-[65px] w-[65px] object-cover"
          />{" "}
          <p className="text-lg font-semibold font-serif ml-4">{transaction?.product?.name}</p>
        </div>
        <div className="grid justify-end">
          <p className="text-red-500">{transaction?.product?.price}</p>
        </div>
      </div>
    </>
  );
}
