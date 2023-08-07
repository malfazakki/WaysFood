import { useQuery } from "react-query";
import { API, setAuthToken } from "../config/api";

import UserTransactionLists from "../components/UserTransactionLists";
import Navbar from "../components/Navbar";

export default function CartPage() {
  setAuthToken(localStorage.token);
  const { data: transactions } = useQuery("pendingTransactionCache", async () => {
    const response = await API.get("/user-transactions");
    return response.data.data;
  });

  const pendingTransactions = transactions?.filter((element) => element.status === "pending");

  return (
    <>
      <Navbar />
      <div className="w-[70%] mx-auto mt-10">
        <h1 className="font-semibold font-serif text-[28px] text-[#433434] mb-5">Cart</h1>
        <div className="grid gap-7">
          {pendingTransactions && pendingTransactions.length > 0 ? (
            pendingTransactions.map((transaction, index) => (
              <UserTransactionLists transaction={transaction} key={index} />
            ))
          ) : (
            <p>No Product added to cart.</p>
          )}
        </div>
      </div>
    </>
  );
}
