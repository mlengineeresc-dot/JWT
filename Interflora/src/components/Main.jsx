import React, { useState } from "react";
import Card from "../common/ui/Card";
import { useEffect } from "react";

const Main = () => {
  const [heroimg, setHeroimg] = useState([
    "https://cdnnew.interflora.in/f_auto,q_auto,t_pnopt32prodlp/banners/new_arrivals_d_banners_830_1756490670227",
    "https://cdnnew.interflora.in/f_auto,q_auto,t_pnopt32prodlp/banners/thank_you_d_banners_830_1756493641603",
    "https://cdnnew.interflora.in/f_auto,q_auto,t_pnopt32prodlp/banners/birthday_d_banners_830_1756490564058",
    "https://cdnnew.interflora.in/f_auto,q_auto,t_pnopt32prodlp/banners/fragrance_d_banners_830_1760342027108",
    "https://cdnnew.interflora.in/f_auto,q_auto,t_pnopt32prodlp/banners/congratulations_d_banners_830_1756490584794",
    "https://cdnnew.interflora.in/f_auto,q_auto,t_pnopt32prodlp/banners/corporate_gifting_d_banners_830_1761388176544",
  ]);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === heroimg.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto w-[90vw] mt-20">
      <section className="border h-28 my-4 flex justify-around items-center">
        <div className="border-r-2 h-22 flex flex-col justify-center items-center p-2 ">
          <i className="fa-solid fa-truck mb-2"></i>
          <p>Same Day Delivery</p>
        </div>
        <div className="border-r-2 h-22 flex flex-col justify-center items-center p-2">
          <i className="fa-solid fa-gift mb-2"></i>
          <p>Birthday Flowers</p>
        </div>
        <div className="border-r-2 h-22 flex flex-col justify-center items-center p-2  ">
          <i className="fa-regular fa-snowflake mb-2"></i>{" "}
          <p>Anniversary Flowers</p>
        </div>
        <div className="border-r-2 h-22  flex flex-col justify-center items-center p-2">
          <i className="fa-regular fa-handshake mb-2"></i>
          <p>Grand Gestures</p>
        </div>
        <div className="border-r-2 h-22 flex flex-col justify-center items-center p-2 ">
          <i className="fa-solid fa-heart mb-2"></i>
          <p>Luxury Blooms</p>
        </div>
        <div className="border-r-2 h-22 flex flex-col justify-center items-center p-2">
          <i className="fa-solid fa-cake-candles mb-2"></i>

          <p>Candles & Fragrances</p>
        </div>
        <div className="border-r-2 h-22 flex flex-col justify-center items-center p-2 ">
          <i className="fa-solid fa-gift mb-2"></i>

          <p>Gift Hampers</p>
        </div>
        <div className=" h-22  flex flex-col justify-center items-center p-2">
          <i className="fa-solid fa-truck mb-2"></i>

          <p>Corporate Gifting</p>
        </div>
      </section>
      <section className="relative mt-10">
        <div className="container mx-auto w-[90vw] relative overflow-hidden">
          <img
            src={heroimg[current]}
            alt="hero"
            className="w-full h-[60vh] object-cover transition-all duration-700 rounded-lg"
          />

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {heroimg.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  i === current ? "bg-white" : "bg-gray-500"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </section>

      <Card />
    </div>
  );
};

export default Main;
