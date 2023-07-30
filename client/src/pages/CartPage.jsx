// import { useState } from "react";
import { useModal } from "../context/ModalContext";
import { useState } from "react";

//Component
import Navbar from "../components/Navbar";

// Assets
import geprek from "../assets/images/geprek.svg";
// import deleteIcon from "../assets/images/delete.svg";
import selectMap from "../assets/images/select-map.svg";

export default function Cart() {
  // const [count, setCount] = useState(1);
  const { openModal } = useModal();
  const [clickedPosition, setClickedPosition] = useState(null);

  return (
    <>
      <div className="bg-[#efefef] min-h-[100vh]">
        <Navbar />
        <div className="w-[70%] mx-auto mt-16">
          <h1 className="font-semibold font-serif text-[26px] text-[#433434] mb-5">Nasi Goreng Mas Rony</h1>
          <p className="mt-20 font-serif text-[#433434]">Delivery Location</p>
          <div className="mt-3 grid grid-cols-[4.5fr_1fr] gap-3">
            <input type="text" className="py-2 px-5 rounded-md disabled:bg-white" disabled />
            <div className="py-2 px-5 bg-[#433434] hover:bg-[#3d3030] active:bg-[#201919] active:ring-2 active:ring-yellow-700 rounded-md text-white font-semibold flex justify-between items-center cursor-pointer">
              <p className="text-sm select-none">Select on Map</p>
              <img src={selectMap} alt="selectMap" />
            </div>
          </div>
          <p className="mt-6 font-serif  text-[#433434]">Review Your Order</p>
          <div className="grid grid-cols-[2.3fr_1fr] gap-20">
            <div className="border-y-[2px] border-zinc-700 mt-2">
              <div className="py-8 grid grid-cols-2">
                <div className="grid grid-cols-[80px_1fr]">
                  <img src={geprek} alt="geprek" />
                  <div className="ml-5 flex flex-col justify-between py-2">
                    <p className="font-bold">Paket Geprek</p>
                    {/* <div className="flex gap-5">
                      <button
                        className="py-0 px-2 bg-yellow-500"
                        onClick={() => {
                          setCount(count - 1);
                        }}
                      >
                        -
                      </button>
                      <p>{count}</p>
                      <button
                        className="py-0 px-2 bg-yellow-500"
                        onClick={() => {
                          setCount(count + 1);
                        }}
                      >
                        +
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="grid grid-rows-2 justify-end py-2">
                  <p className="text-md w-full font-sans mt-1 text-red-500">Rp. 25,000</p>
                  {/* <div className="flex justify-end">
                    <img src={deleteIcon} alt="deleteIcon" className="scale-[80%]" />
                  </div> */}
                </div>
              </div>
            </div>
            <div className="border-y-[2px] border-zinc-700 mt-2 flex flex-col py-2 justify-evenly">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p className="text-md font-bold font-sans text-red-500">Rp. 25,000</p>
              </div>
              <div className="flex justify-between">
                <p>Ongkir</p>
                <p className="text-md font-bold font-sans text-red-500">Rp. 10,000</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <button className="w-[260px] py-[3px] pb-1 text-center  bg-zinc-700 text-white font-semibold rounded-md hover:bg-zinc-800 active:ring-2 active:ring-slate-500 ">
              Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
