/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export default function RestaurantPopularItem({ restaurants }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="bg-white p-4 flex justify-around items-center cursor-pointer"
        onClick={() => navigate(`/user/restaurant/${restaurants?.id}`)}
      >
        <img src={restaurants?.image} alt={restaurants.username} className="h-[65px] w-[65px] object-cover" />{" "}
        <p className="text-lg font-semibold font-serif">{restaurants.username}</p>
      </div>
    </>
  );
}
