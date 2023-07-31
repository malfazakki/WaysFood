/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
export default function RestaurantMenuList({ menus }) {
  const [state, dispatch] = useContext(UserContext);
  const { user } = state;
  const { role } = user;
  const navigate = useNavigate();

  const transaction = {
    product_id: menus?.id,
  };

  const handleBuy = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/transaction", transaction);
      // openModal(<SelectTicket transaction={transaction} />);

      console.log("transaction success: ", response);
      navigate("/user/cart");
    } catch (error) {
      console.log("error catch add product: ", error);
    }
  });
  return (
    <>
      <div className="bg-white px-5 pt-4 pb-4 flex flex-col justify-around items-center h-[266px]">
        <img src={menus.image} alt="bg-king" className="object-cover w-full h-full" />
        <p className="text-sm w-full font-semibold font-serif mt-2">{menus.name}</p>
        <p className="text-md w-full font-bold font-sans mt-1 text-red-500">Rp. {menus.price}</p>
        {role === "partner" ? null : (
          <button
            className="w-full capitalize font-bold font-sans rounded-lg py-1 bg-[#ffc700] hover:bg-[#ffc800] active:bg-yellow-500 active:ring-2 active:ring-yellow-300 mt-3"
            onClick={(e) => handleBuy.mutate(e)}
          >
            order
          </button>
        )}
      </div>
    </>
  );
}
