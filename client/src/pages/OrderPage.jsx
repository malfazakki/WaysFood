import { useState, useEffect, useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import { UserContext } from "../context/UserContext";
import { API, setAuthToken } from "../config/api";
import axios from "axios";

//Component
import Navbar from "../components/Navbar";
import MapLiveLocation from "../components/modal/MapLiveLocation";
import MapRouting from "../components/modal/MapRouting";

// Assets
// eslint-disable-next-line no-unused-vars
import geprek from "../assets/images/geprek.svg";
// import deleteIcon from "../assets/images/delete.svg";
import selectMap from "../assets/images/select-map.svg";
import Modal from "../components/modal/Modal";

export default function OrderPage() {
  setAuthToken(localStorage.token);
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(UserContext);
  const { user } = state;
  const { id } = user;
  // const [count, setCount] = useState(1);
  const { openModal } = useModal();
  const [clickedPosition, setClickedPosition] = useState(null);
  const [location, setLocation] = useState("");
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    latitude: "",
    longitude: "",
  });

  async function getProfileUpdate() {
    const response = await API.get("/user/" + id);

    setForm({
      ...form,
      latitude: response.data.data.latitude,
      longitude: response.data.data.longitude,
    });
  }

  const latitude = clickedPosition ? clickedPosition.lat : form?.latitude;
  const longitude = clickedPosition ? clickedPosition.lng : form?.longitude;

  useEffect(() => {
    getProfileUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit to get UserLocation
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      let data = {
        transaction_id: orderId,
        latitude: latitude,
        longitude: longitude,
      };

      const responseMidtrans = await API.post("/transaction/midtrans", data, config);

      // code here
      const token = responseMidtrans.data.data.token;
      window.snap.pay(token, {
        onSuccess: function () {
          navigate("/user/order/" + orderId);
        },
        onPending: function (result) {
          navigate("/user/profile/" + id);
          console.log(result);
        },
        onError: function (result) {
          console.log(result);
          navigate("/user/cart/" + id);
        },
        onClose: function () {
          alert("You closed the popup without finishing the payment!");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  // useEffect to Convert the Location to real address
  useEffect(() => {
    // Fetch the address from LocationIQ when form.latitude or form.longitude changes
    if (latitude && longitude) {
      const api_key = "pk.ec3ec8e73ea41ccefedfd001e1e1ddab";
      const url = `https://us1.locationiq.com/v1/reverse.php?key=${api_key}&lat=${latitude}&lon=${longitude}&format=json`;

      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          const address = data.display_name || "Address not found";
          setLocation(address);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude]);

  // Fetching the Transaction
  const { data: transaction } = useQuery("transactionFetchingCache", async () => {
    const responseTransaction = await API.get("transaction/" + orderId);
    return responseTransaction.data.data;
  });

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const partnerLat = transaction?.product?.partner?.latitude;
  const partnerLng = transaction?.product?.partner?.longitude;
  return (
    <>
      <div className="bg-[#efefef] min-h-[100vh]">
        <Navbar />
        <div className="w-[70%] mx-auto mt-16">
          <h1 className="font-semibold font-serif text-[26px] text-[#433434] mb-5">Nasi Goreng Mas Rony</h1>
          <p className="mt-20 font-serif text-[#433434]">Delivery Location</p>
          <form onSubmit={(e) => handleSubmit.mutate(e)} method="POST" encType="multipart/form-data">
            <div className="mt-3 grid grid-cols-[4.5fr_1fr] gap-3">
              <input type="text" className="py-2 px-5 rounded-md disabled:bg-white" value={location} disabled />
              <input
                type="text"
                name="latitude"
                disabled
                hidden
                onChange={handleChange}
                value={clickedPosition ? clickedPosition.lat : form?.latitude || ""}
              />
              <input
                type="text"
                name="longitude"
                disabled
                hidden
                onChange={handleChange}
                value={clickedPosition ? clickedPosition.lng : form?.longitude || ""}
              />
              <div
                className="py-2 px-5 bg-[#433434] hover:bg-[#3d3030] active:bg-[#201919] active:ring-2 active:ring-yellow-700 rounded-md text-white font-semibold flex justify-between items-center cursor-pointer"
                onClick={() =>
                  openModal(
                    <MapLiveLocation clickedPosition={clickedPosition} setClickedPosition={setClickedPosition} />
                  )
                }
              >
                <p className="text-sm select-none">Select on Map</p>
                <img src={selectMap} alt="selectMap" />
              </div>
            </div>
            <p className="mt-6 font-serif  text-[#433434]">Review Your Order</p>
            <div className="">
              <div className="border-y-[2px] border-zinc-700 mt-2 px-5">
                <div className="py-8 grid grid-cols-2">
                  <div className="grid grid-cols-[80px_1fr]">
                    <img src={transaction?.product?.image} alt="geprek" className="h-full object-cover" />
                    <div className="ml-5 flex flex-col justify-between py-2">
                      <p className="font-bold">{transaction?.product?.name}</p>
                    </div>
                  </div>
                  <div className="grid grid-rows-2 justify-end py-2">
                    <p className="text-md w-full font-sans mt-1 font-semibold text-xl text-red-500">Rp. {transaction?.product?.price}</p>
                  </div>
                </div>
              </div>
              {/* <div className="border-y-[2px] border-zinc-700 mt-2 flex flex-col py-2 justify-evenly">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="text-md font-bold font-sans text-red-500">Rp. 25,000</p>
                </div>
                <div className="flex justify-between">
                  <p>Ongkir</p>
                  <p className="text-md font-bold font-sans text-red-500">Rp. 0 (free ongkir)</p>
                </div>
              </div> */}
            </div>

            <div className="mt-10 flex justify-end">
              {transaction?.status === "success" ? (
                <button
                  className="w-[260px] py-[3px] pb-1 text-center  bg-zinc-700 text-white font-semibold rounded-md hover:bg-zinc-800 active:ring-2 active:ring-slate-500"
                  type="button"
                  onClick={() =>
                    openModal(<MapRouting uLat={latitude} uLng={longitude} pLat={partnerLat} pLng={partnerLng} />)
                  }
                >
                  See How Far?
                </button>
              ) : (
                <button
                  className="w-[260px] py-[3px] pb-1 text-center  bg-zinc-700 text-white font-semibold rounded-md hover:bg-zinc-800 active:ring-2 active:ring-slate-500"
                  type="submit"
                >
                  Order
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Modal />
    </>
  );
}
