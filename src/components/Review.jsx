import React from "react";
import "./r.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation } from "swiper/modules";

export default function Review({ reviews }) {
  const filteredResults = reviews.results
    ? reviews.results.filter((item) => item.author_details.rating)
    : null;
  console.log(reviews);
  return (
    <div className="rvsec2">

      <div className="rvsec3">
   

        {reviews.results[0] ? (
          reviews.results.map((item, index) => {
            const stars = [];

            for (let i = 0; i < item.author_details.rating / 2; i++) {
              stars.push(
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="gold"
                  height="20"
                  viewBox="0 -960 960 960"
                  width="20"
                >
                  <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
                </svg>
              );
            }
       
              return ( index <= 1  && (
                <div className="revsectin" key={index}>
                  <div>{item.author} </div>
                  <div className="ratingrv">{stars}</div>
                  <p>
                    {item.content.length >= 550
                      ? item.content.slice(0, 550) + "..."
                      : item.content}
                  </p>
                </div>

            
              ) );{" "}
          })
        ) : (
          <div style={{ color: "white" }}>
            No reviews available for this one
          </div>
        )}

      </div>
    </div>

  );
}
