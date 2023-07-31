import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { setAuthToken, API } from "./config/api";
import { UserContext } from "./context/UserContext";
import { PrivateRoutePartner, PrivateRouteLogin, PrivateRouteUser } from "./components/PrivateRoute";
import { ModalProvider } from "./context/ModalContext";

import LandingPage from "./pages/LandingPage";
import Restaurant from "./pages/RestaurantPage";
import Cart from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import PartnerPage from "./pages/PartnerPage";
import EditProfilePage from "./pages/EditProfilePage";
import AddProductPage from "./pages/AddProductPage";
import Map from "./components/modal/MapLiveLocation";
import OrderPage from "./pages/OrderPage";

export default function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-[100vh] bg-[#EFEFEF]">
        {isLoading ? null : (
          <ModalProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />

              <Route element={<PrivateRouteLogin />}>
                <Route element={<PrivateRouteUser />}>
                  <Route exact path="/user/map" element={<Map />} />
                  <Route exact path="/user/cart" element={<Cart />} />
                  <Route exact path="/user/order/:orderId" element={<OrderPage />} />
                  <Route exact path="/user/profile/:userId" element={<ProfilePage />} />
                  <Route exact path="/user/edit-profile/:userId" element={<EditProfilePage />} />
                  <Route exact path="/user/restaurant/:userId" element={<Restaurant />} />
                </Route>
                <Route element={<PrivateRoutePartner />}>
                  <Route exact path="/partner" element={<PartnerPage />} />
                  <Route exact path="/partner/edit-profile/:userId" element={<EditProfilePage />} />
                  <Route exact path="/partner/add-product" element={<AddProductPage />} />
                  <Route exact path="/partner/restaurant/:userId" element={<Restaurant />} />
                </Route>
              </Route>
            </Routes>
          </ModalProvider>
        )}
      </div>
    </>
  );
}
