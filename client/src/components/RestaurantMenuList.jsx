/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export default function RestaurantMenuList({ menus }) {
  const navigate = useNavigate;
  console.log(menus);
  return (
    <>
      <div className="bg-white px-5 pt-4 pb-4 flex flex-col justify-around items-center h-[266px]">
        <img
          src={"http://localhost:5000/uploads/" + menus.image}
          alt="bg-king"
          className="object-cover w-full h-full"
        />
        <p className="text-sm w-full font-semibold font-serif mt-2">{menus.name}</p>
        <p className="text-md w-full font-bold font-sans mt-1 text-red-500">Rp. {menus.price}</p>
        <button
          className="w-full capitalize font-bold font-sans rounded-lg py-1 bg-[#ffc700] hover:bg-[#ffc800] active:bg-yellow-500 active:ring-2 active:ring-yellow-300 mt-3"
          onClick={() => navigate("/cart")}
        >
          order
        </button>
      </div>
    </>
  );
}
