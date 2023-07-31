import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { API, setAuthToken } from "../config/api";

//Components
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import TransactionSuccessList from "../components/TransactionSuccessList";

export default function ProfilePage() {
  setAuthToken(localStorage.token);
  const navigate = useNavigate();
  const { userId } = useParams();
  let { data: user } = useQuery("userProfileCache", async () => {
    const response = await API.get("/user/" + userId);
    return response.data.data;
  });

  const { data: transaction } = useQuery("transactionSuccessHistory", async () => {
    const responseTransaction = await API.get("/user-transactions");
    return responseTransaction.data.data;
  });

  const successTransactions = transaction?.filter((element) => element.status == "success");
  return (
    <>
      <div className="bg-[#efefef] min-h-[100vh]">
        <Navbar />
        {/* Container Grid */}
        <div className="mt-28 grid grid-cols-[1.5fr_1fr] w-[70%] mx-auto">
          <div>
            <h1 className="font-semibold font-serif text-[26px] text-[#433434] mb-5">My Profile</h1>
            <div className="flex gap-8">
              <div className="w-[180px] h-[222px]">
                <img src={user?.image} alt="" className="object-cover w-full h-full" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-[#433434]">Username</h2>
                <p className="">{user?.username}</p>
                <h2 className="text-xl font-semibold text-[#433434] mt-5">Email</h2>
                <p>{user?.email}</p>
                <h2 className="text-xl font-semibold text-[#433434] mt-5">Phone</h2>
                <p>{user?.phone}</p>
              </div>
            </div>
            <button
              className="mt-5 w-[180px] h-[40px] bg-[#433434] text-white font-semibold rounded-lg"
              onClick={() => navigate(`/user/edit-profile/${user?.id}`)}
            >
              Edit Profile
            </button>
          </div>
          <div>
            <h1 className="font-semibold font-serif text-[26px] text-[#433434] mb-5">Transaction History</h1>
            {successTransactions && successTransactions.length > 0 ? (
              successTransactions.map((transaction, index) => (
                <TransactionSuccessList transaction={transaction} key={index} />
              ))
            ) : (
              <p>You haven&apos;t bought anything. Are you not hungry yet?</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
