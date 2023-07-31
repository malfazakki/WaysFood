import { useQuery } from "react-query";
import { API } from "../config/api";

import UserTransactionLists from "../components/UserTransactionLists";

export default function CartPage() {
  const { data: transactions } = useQuery("pendingTransactionCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  console.log(transactions);

  const pendingTransactions = transactions?.filter((element) => element.status === "pending");

  return (
    <>
      <div className="w-[70%] mx-auto mt-10">
        <h1 className="font-semibold font-serif text-[28px] text-[#433434] mb-5">Cart</h1>
        <div className="grid grid-cols-4 gap-4">
          {pendingTransactions && pendingTransactions.length > 0 ? (
            pendingTransactions.map((transaction, index) => (
              <UserTransactionLists transaction={transaction} key={index} />
            ))
          ) : (
            <p>No Restaurant</p>
          )}
        </div>
      </div>
    </>
  );
}
