import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../config/api";
import { UserContext } from "../context/UserContext";

//Component
import Navbar from "../components/Navbar";

// Assets
import attachment from "../assets/images/attachment.svg";

export default function AddProductPage() {
  setAuthToken(localStorage.token);
  const [state] = useContext(UserContext);
  const { user } = state;
  const { id } = user;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("name", form.name);
      formData.set("price", form.price);

      // Insert product data
      const response = await API.post("/product", formData, config);
      console.log("add product success : ", response);

      navigate("/partner/restaurant/" + id);
    } catch (error) {
      console.log("add product failed : ", error);
    }
  });

  return (
    <>
      <div className="bg-[#efefef] min-h-[100vh]">
        <Navbar />

        <div className="w-[70%] mx-auto mt-16">
          <h1 className="font-semibold font-serif text-[26px] text-[#433434] mb-5">Add Product</h1>
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div>
              <div className="grid grid-cols-[5fr_1fr] gap-3">
                <input
                  type="text"
                  placeholder="Title"
                  className="py-2 px-5 bg-[#e2e2e2] border-2 border-[#766c6c] rounded-md placeholder-[#928b8b]"
                  name="name"
                  onChange={handleChange}
                  value={form.name}
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
                type="number"
                placeholder="Price"
                className="py-2 px-5 bg-[#e2e2e2] border-2 border-[#766c6c] rounded-md placeholder-[#928b8b] w-full mt-5"
                name="price"
                onChange={handleChange}
                value={form.price}
              />
            </div>

            <div className="mt-10 flex justify-end">
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
    </>
  );
}
