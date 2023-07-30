import Pizza from "../assets/images/pizza.svg";

export default function Hero() {
  return (
    <>
      <div className="bg-[#ffc700] pl-10">
        <div className="w-[75%] 2xl:w-[65%] mx-auto grid grid-cols-[1fr_408px] py-10">
          <div className="mt-[5%]">
            <h1 className="text-5xl mb-5 font-bold font-serif text-[#433434]">Are You Hungry ?</h1>
            <h1 className="text-5xl font-bold font-serif text-[#433434]">Express Home Delivery</h1>
            <div className="grid grid-cols-[180px_1fr] mt-10 w-[82%]">
              <div className="w-[150px] bg-[#433434] h-[2.5px] mt-[7px]"></div>
              <p className="font-semibold text-xs leading-[1.1rem] font-sans">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry&apos;s standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>
          <div className="grid ml-5 z-0">
            <img src={Pizza} alt="pizza" className="z-0" />
          </div>
        </div>
      </div>
    </>
  );
}
