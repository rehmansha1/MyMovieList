import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function List({ tren, putindb, mylist, deleteindb }) {
  const navigate = useNavigate();
  const handleButtonClick = (id) => {
    // Navigate to a different route
    navigate(`/detes/${id}`);
    window.location.reload();
  };
  return (
    <>
      {tren.results &&
        tren.results.map(
          (item, index) =>
            item.poster_path && (
              <div key={index} id="trengallary">
                <div id="outimg">
                  {mylist ? (
                    <svg
                      onClick={() => {deleteindb(item.id)
                      const card = document.getElementById('trengallary')
                      card.style.opacity = ''}}
                      id="tdots"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                      fill="white"
                    >
                      <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z" />
                    </svg>
                  ) : (
                    <svg
                      id="tdots"
                      onClick={() => putindb(item.id)}
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path
                        fill="white"
                        d="M200-120v-640q0-33 23.5-56.5T280-840h400q33
                     0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 
                     200-86 200 86v-518H280v518Zm0-518h400-400Z"
                      />
                    </svg>
                  )}

                  <img
                    onClick={() => {
                      handleButtonClick(item.id);
                    }}
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`}
                    alt={item.title || "Image Alt Text"}
                  />
                </div>
                <div className="trndetes">
                  <div id="listcon">
                    <div>{item.title || item.name || "none"}</div>
                    <div id="year">
                      {item.release_date ? item.release_date.slice(0, 4) : ""}
                    </div>
                  </div>{" "}
                  <div id="starstrn">
                    {/*
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="gold"
                        height="15"
                        viewBox="0 -960 960 960"
                        width="15"
                      >
                        <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
                      </svg>
               */}
                    {item.vote_average ? item.vote_average.toFixed(1) : ""}
                  </div>
                </div>
              </div>
            )
        )}
    </>
  );
}
