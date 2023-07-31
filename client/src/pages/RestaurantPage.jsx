// import { useNavigate } from "react-router-dom";

import { useQuery } from "react-query";
import { API } from "../config/api";
import { setAuthToken } from "../config/api";

import Navbar from "../components/Navbar";
// import { useModal } from "../context/ModalContext";
import { useParams } from "react-router-dom";
import RestaurantMenuList from "../components/RestaurantMenuList";
// import SelectTicket from "../components/modal/SelectProduct";

export default function Restaurant() {
  setAuthToken(localStorage.token);
  // const navigate = useNavigate();
  const { userId } = useParams();
  // const { openModal } = useModal();

  const { data: menus } = useQuery("restaurantMenusCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  const restaurantMenus = menus?.filter((element) => element.user?.id == userId);

  return (
    <>
      <div className="bg-[#efefef] min-h-[100vh]">
        <Navbar />

        <div className="w-[70%] mx-auto mt-16">
          <h1 className="font-semibold font-serif text-[26px] text-[#433434] mb-5">Nasi Goreng Mas Rony - Menus</h1>
          <div className="grid grid-cols-4 gap-6">
            {restaurantMenus && restaurantMenus.length > 0 ? (
              restaurantMenus.map((menus, index) => <RestaurantMenuList menus={menus} key={index} />)
            ) : (
              <p>No Menu added.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
