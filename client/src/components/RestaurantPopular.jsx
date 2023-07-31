import { useQuery } from "react-query";
import { API } from "../config/api";
// import bgKing from "../assets/images/bg-king.svg";
import RestaurantPopularItem from "./RestaurantPopularItem";

export default function RestaurantPopular() {
  const { data: restaurants } = useQuery("restaurantsPopulerCache", async () => {
    const response = await API.get("/users");
    return response.data.data;
  });

  const popularRestaurant = restaurants?.filter((element) => element.role === "partner");

  return (
    <>
      <div className="w-[70%] mx-auto mt-10">
        <h1 className="font-semibold font-serif text-[28px] text-[#433434] mb-5">Cart</h1>
        <div className="grid grid-cols-4 gap-4">
          {popularRestaurant && popularRestaurant.length > 0 ? (
            popularRestaurant.map((restaurants, index) => (
              <RestaurantPopularItem restaurants={restaurants} key={index} />
            ))
          ) : (
            <p>No Restaurant</p>
          )}
        </div>
      </div>
    </>
  );
}
