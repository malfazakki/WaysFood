import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useModal } from "../context/ModalContext";

//Component
import Navbar from "../components/Navbar";
import MapLiveLocation from "../components/modal/MapLiveLocation";

// Assets
import attachment from "../assets/images/attachment.svg";
import selectMap from "../assets/images/select-map.svg";
import Modal from "../components/modal/Modal";

export default function EditProfilePage() {
  const title = "Edit Profile";
  document.title = "WaysFood | " + title;

  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { userId } = useParams();
  const { openModal } = useModal();

  const [form, setForm] = useState({
    email: "",
    username: "",
    phone: "",
    latitude: "",
    longitude: "",
    image: "",
  });

  async function getProfileUpdate() {
    const response = await API.get("/user/" + userId);

    setForm({
      ...form,
      username: response.data.data.username,
      email: response.data.data.email,
      phone: response.data.data.phone,
      latitude: response.data.data.latitude,
      longitude: response.data.data.longitude,
      image: response.data.data.image,
    });

    console.log(response);
  }

  useEffect(() => {
    getProfileUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("username", form.username);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      formData.set("latitude", form.latitude);
      formData.set("longitude", form.longitude);

      const response = await API.patch("/user/" + userId, formData, config);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  });

  const [clickedPosition, setClickedPosition] = useState(null);

  if (clickedPosition) {
    console.log("latitude" + clickedPosition.lat);
    console.log("longitude" + clickedPosition.lng);
  }

  return (
    <>
      <div className="bg-[#efefef] min-h-[100vh]">
        <Navbar />

        <div className="w-[70%] mx-auto mt-16">
          <h1 className="font-semibold font-serif text-[26px] text-[#433434] mb-5">Edit Profile</h1>
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div>
              <div className="grid grid-cols-[5fr_1fr] gap-3">
                <input
                  type="text"
                  placeholder="Username"
                  className="py-2 px-5 bg-[#e2e2e2] border-2 border-[#766c6c] rounded-md placeholder-[#928b8b]"
                  name="username"
                  onChange={handleChange}
                  value={form?.username}
                />
                <div className="w-full bg-[#e2e2e2] border-2 border-[#766c6c] py-2  cursor-pointer rounded-md">
                  <label
                    htmlFor="image"
                    className="cursor-pointer text-[#1f1f1f] justify-around flex flex-wrap items-center"
                  >
                    Attach Image
                    <img src={attachment} alt="attachment" />
                    <input type="file" name="image" id="image" hidden onChange={handleChange} />
                  </label>
                </div>
              </div>
              <input
                type="text"
                placeholder="Email"
                className="py-2 px-5 bg-[#e2e2e2] border-2 border-[#766c6c] rounded-md placeholder-[#928b8b] w-full mt-5"
                name="email"
                onChange={handleChange}
                value={form?.email}
              />
              <input
                type="text"
                placeholder="Phone"
                className="py-2 px-5 bg-[#e2e2e2] border-2 border-[#766c6c] rounded-md placeholder-[#928b8b] w-full mt-5"
                name="phone"
                onChange={handleChange}
                value={form?.phone}
              />
              <div className="mt-5 grid grid-cols-[4.5fr_1fr] gap-3">
                <input
                  type="text"
                  placeholder="Location"
                  className="py-2 px-5 bg-[#e2e2e2] border-2 border-[#766c6c] rounded-md placeholder-[#928b8b]"
                  disabled
                />
                <input
                  type="text"
                  name="latitude"
                  hidden
                  onChange={handleChange}
                  value={clickedPosition ? clickedPosition.lat : form?.longitude}
                />
                <input
                  type="text"
                  name="longitude"
                  hidden
                  onChange={handleChange}
                  value={clickedPosition ? clickedPosition.lng : form?.longitude}
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
            </div>

            <div className="mt-28 flex justify-end">
              <button
                type="submit"
                className="w-[260px] py-[3px] pb-1 text-center bg-[#433434] hover:bg-[#3d3030] active:bg-[#201919] active:ring-2 active:ring-yellow-700 rounded-md text-white font-semibold"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal />
    </>
  );
}
