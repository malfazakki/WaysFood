import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";

//Components
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  let { data: user } = useQuery("userProfileCache", async () => {
    const response = await API.get("/user/" + userId);
    return response.data.data;
  });

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
            <div className="bg-white p-3 grid grid-cols-[3fr_1fr]">
              <div>
                <h3>Nasi Goreng</h3>
                <p>Saturday, 12 March 2021</p>
                <p>Total: Rp. 45,000</p>
              </div>
              <div className="flex flex-col justify-around">
                <img src="/logo-black.svg" alt="logo" />
                <button disabled className="bg-green-200 text-sm text-green-600 rounded-md mt-2">
                  Finished
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
