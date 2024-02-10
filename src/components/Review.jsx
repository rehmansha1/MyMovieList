import React from "react";
import "./r.css";

export default function Review({ reviews }) {
  return (
    <div className="rvsec2">
      {reviews.results &&
  reviews.results.map((item, index) => {
    const words = item.content.split(/\s+/);

    if (words.length <= 550) {
      return (
        <div className="revsectin" key={index}>
          <div>Author: {item.author} </div>
          <div className="ratingrv">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="gold"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
            >
              <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
            </svg>
            {item.author_details.rating}
          </div>
          <p>{item.content}</p>
        </div>
      );
    } else {
      return null;
    }
  })}

    </div>
  );
}
