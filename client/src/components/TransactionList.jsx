import { API, setAuthToken } from "../config/api";
import { useQuery } from "react-query";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

import TransactionListsDetailPartner from "../components/TransactionListDetailPartner";
import Modal from "./modal/Modal";

export default function TransactionLists() {
  const [state, dispatch] = useContext(UserContext);
  const { user } = state;
  const { id } = user;
  setAuthToken(localStorage.token);
  let {
    data: transactions,
    isLoading,
    refetch,
  } = useQuery("transactionsListCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  console.log(transactions);

  const partnerTransactions = transactions?.filter((element) => element.product.partner.id === id);

  console.log("partner:" + partnerTransactions);
  return (
    <div className="mt-[60px] mx-auto mb-20 ">
      <h1 className="text-3xl font-semibold ml-[12%] font-serif mt-[100px]">Income Transaction</h1>
      <div className="w-[80%] grid mx-auto mt-10 border-2 pt-8 pl-3 pr-3">
        <div className="grid grid-cols-[0.5fr_1.5fr_1.5fr_1.5fr_1fr_1.8fr] w-full font-bold mb-10">
          <div className="flex items-center justify-center">
            <p>No</p>
          </div>
          <div className="flex items-center justify-center">
            <p>Name</p>
          </div>
          <div className="flex items-center justify-center">
            <p>Lat Long</p>
          </div>
          <div className="flex items-center justify-center">
            <p>Product</p>
          </div>
          <div className="flex items-center justify-center">
            <p>Status</p>
          </div>
          <div className="flex items-center justify-center">
            <p>Action</p>
          </div>
        </div>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : partnerTransactions && partnerTransactions.length > 0 ? (
          partnerTransactions.map((transaction, index) => (
            <TransactionListsDetailPartner
              transaction={transaction}
              key={transaction.id}
              index={index}
              refetch={refetch}
            />
          ))
        ) : (
          <div className="flex justify-center">
            <p>No transactions found.</p>
          </div>
        )}
        <Modal refetch={refetch} />
      </div>
    </div>
  );
}
