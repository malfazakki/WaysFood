import Navbar from "../components/Navbar";
import TransactionLists from "../components/TransactionList";
import { setAuthToken } from "../config/api";

export default function PartnerPage() {
  setAuthToken(localStorage.token);
  return (
    <>
      <Navbar />
      <TransactionLists />
    </>
  );
}
