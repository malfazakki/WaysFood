import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import RestaurantPopular from "../components/RestaurantPopular";
import RestaurantNearby from "../components/RestaurantNearby";
import Modal from "../components/modal/Modal";

export default function LandingPage() {
  return (
    <>
      <div className="min-h-[100vh] bg-[#EFEFEF]">
        <Navbar />
        <Modal />
        <Hero />
        <RestaurantPopular />
        <RestaurantNearby />
      </div>
    </>
  );
}
