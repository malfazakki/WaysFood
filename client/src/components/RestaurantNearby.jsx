import { Link } from "react-router-dom";

import nasiGoreng from "../assets/images/nasi-goreng.svg";

export default function RestaurantNearby() {
  return (
    <>
      <div className="w-[70%] mx-auto mt-16">
        <h1 className="font-semibold font-serif text-[26px] text-[#433434] mb-5">Restaurant Nearby</h1>
        <div className="grid grid-cols-4 gap-4">
          <Link to="/restaurant">
            <div className="bg-white px-5 pt-4 pb-4 flex flex-col justify-around items-center">
              <img src={nasiGoreng} alt="bg-king" className="object-cover" />
              <p className="text-sm w-full font-semibold font-serif mt-2">Nasi Goreng Mas Jonny</p>
              <p className="text-sm w-full font-semibold font-sans mt-1">0,6 Km</p>
            </div>
          </Link>
          <div className="bg-white px-5 pt-4 pb-4 flex flex-col justify-around items-center">
            <img src={nasiGoreng} alt="bg-king" className="object-cover" />
            <p className="text-sm w-full font-semibold font-serif mt-2">Nasi Goreng Mas Jonny</p>
            <p className="text-sm w-full font-semibold font-sans mt-1">0,6 Km</p>
          </div>
          <div className="bg-white px-5 pt-4 pb-4 flex flex-col justify-around items-center">
            <img src={nasiGoreng} alt="bg-king" className="object-cover" />
            <p className="text-sm w-full font-semibold font-serif mt-2">Nasi Goreng Mas Jonny</p>
            <p className="text-sm w-full font-semibold font-sans mt-1">0,6 Km</p>
          </div>
          <div className="bg-white px-5 pt-4 pb-4 flex flex-col justify-around items-center">
            <img src={nasiGoreng} alt="bg-king" className="object-cover" />
            <p className="text-sm w-full font-semibold font-serif mt-2">Nasi Goreng Mas Jonny</p>
            <p className="text-sm w-full font-semibold font-sans mt-1">0,6 Km</p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
}
