/* eslint-disable react/prop-types */
import { useModal } from "../context/ModalContext";
import { useMutation } from "react-query";
import { API } from "../config/api";

// import TicketDetailAdmin from "./TicketDetailAdmin";

// Assets

export default function TransactionListsDetailPartner({ transaction, index, refetch }) {
  // eslint-disable-next-line no-unused-vars
  const { openModal } = useModal();
  const no = index + 1;

  const mutation = useMutation(async (id) => {
    try {
      await API.delete(`/transaction/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  // eslint-disable-next-line no-unused-vars
  function handleDelete(id) {
    const confirmation = window.confirm("Want to Delete? " + transaction.id + " " + transaction.user.full_name);
    if (confirmation) {
      mutation.mutate(id);
    }
  }

  return (
    <div
      className={`grid py-3 grid-cols-[0.5fr_1.5fr_1.5fr_1.5fr_1fr_1.8fr] w-full ${
        no % 2 !== 0 ? "border-y-2 border-slate-50 bg-slate-50" : null
      }`}
    >
      <div className="flex items-center justify-center">
        <p>{no}</p>
      </div>
      <div className="flex items-center justify-center">
        <p>{transaction.user.username}</p>
      </div>
      <div className="flex items-center justify-center">
        <p>
          {transaction.user.latitude}
          {transaction.user.longitude}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <p>{transaction.product.name}</p>
      </div>
      <div className="flex items-center justify-center">
        <p>{transaction.status}</p>
      </div>
      <div className="flex items-center font-medium text-orange-400 justify-center">
        <p>{""}</p>
      </div>
    </div>
  );
}
