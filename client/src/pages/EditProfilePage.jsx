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

  const [clickedPosition, setClickedPosition] = useState(null);

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
      if (form.image && form.image.length > 0) {
        // Append each file to the FormData separately
        for (let i = 0; i < form.image.length; i++) {
          formData.append("image", form.image[i]);
        }
      }
      formData.set("username", form.username);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      if (clickedPosition) {
        formData.set("latitude", clickedPosition.lat);
        formData.set("longitude", clickedPosition.lng);
      }

      const response = await API.patch("/user/" + userId, formData, config);
      console.log(response.data);
      alert("success");
    } catch (error) {
      console.log(error);
      alert("error");
    }
  });

  return (
    <>
      <div className="bg-[#efefef] min-h-[100vh]">
        <Navbar />

        <div className="w-[70%] mx-auto mt-16">
          <h1 className="font-semibold font-serif text-[26px] text-[#433434] mb-5">Edit Profile</h1>
          <form onSubmit={(e) => handleSubmit.mutate(e)} method="POST" encType="multipart/form-data">
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
                  disabled
                  hidden
                  onChange={handleChange}
                  value={clickedPosition ? clickedPosition.lat : form.latitude}
                />
                <input
                  type="text"
                  name="longitude"
                  disabled
                  hidden
                  onChange={handleChange}
                  value={clickedPosition ? clickedPosition.lng : form.longitude}
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
