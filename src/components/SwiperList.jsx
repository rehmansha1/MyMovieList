import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Scrollbar, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide} from 'swiper/react';
import "swiper/swiper-bundle.css";
import NavbuttonsSwi from "./NavbuttonsSwi";
import 'swiper/css';
import 'swiper/css/navigation';
export default function SwiperList({
  tren,
  putInDbMovies,
  putInDbSeries,
  mylist,
  deleteindb,
  movies,
  isPC,
  shuffle
}) {
  const navigate = useNavigate();
  const [reviewmy, setreviewmy] = useState(false);
  const [stars, setstars] = useState();
  const [cid, setcid] = useState("");

  const handleButtonClick = (id) => {
    navigate(`/detes/${id}?m=${movies}`);

    // window.location.href=`/detes/${id}?m=${movies}`;
  };

  const sendcompletedidtodb = async (id, Ukl, title, content, name) => {
    const urlformovies = "/completed/movies";
    const urlforseries = "/completed/series";

    const params = {
      query: "drive",
      include_adult: false,
      language: "en-US",
      page: 1,
    };

    const options = {
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
      },
    };
    const url = movies ? urlformovies : urlforseries;
    try {
      const response = await axios.post(url, {
        username: "Rehman",
        id: id,
        URL: url,
        title: title,
        content: content,
        stars: stars,
      });

      console.log(response);
    } catch (error) {
      console.error("error:", error);
    }
  };


  return (
    <>
      {/* <div className="btmvser">
                      <div
                        id="mvbt"
                        onClick={() => {
                          setseries1('false');
                          let bt = document.getElementById("mvbt");
                          bt.style.background = "white";
                          bt.style.color = "black";
                          let bt1 = document.getElementById("svbt");
                          bt1.style.background = "black";
                          bt1.style.color = "white";
                        }}
                      >
                        movie
                      </div>
                      <div
                        id="svbt"
                        onClick={() => {
                          setseries1('true');
                          let bt = document.getElementById("svbt");
                          bt.style.background = "white";
                          bt.style.color = "black";
                          let bt1 = document.getElementById("mvbt");
                          bt1.style.background = "black";
                          bt1.style.color = "white";
                        }}
                      >
                        series
                      </div>
                    </div> */}
      {reviewmy && (
        <div className="rvmybox">
          {" "}
          <div className="innerrvbox">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setreviewmy(false);
              }}
              fill="white"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              id="myrvboxclose"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
            <div id="ratinguser">
              <div>Your Rating</div>
              <div className="ratinguserinner">
                {/* <svg
                fill="gold"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
                </svg>
                <svg
                fill="gold"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
                </svg>
                <svg
                fill="gold"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
                </svg>
                <svg
                                fill="gold"

                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
                </svg>
                <svg
                                fill="gold"

                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
                </svg>
                */}
                <div class="star-rating">
                  <input
                    type="radio"
                    id="5-stars"
                    name="rating"
                    value="5"
                    onClick={() => setstars(5)}
                  />
                  <label for="5-stars" class="star">
                    &#9733;
                  </label>
                  <input
                    type="radio"
                    id="4-stars"
                    name="rating"
                    value="4"
                    onClick={() => setstars(4)}
                  />
                  <label for="4-stars" class="star">
                    &#9733;
                  </label>
                  <input
                    type="radio"
                    id="3-stars"
                    name="rating"
                    value="3"
                    onClick={() => setstars(3)}
                  />
                  <label for="3-stars" class="star">
                    &#9733;
                  </label>
                  <input
                    type="radio"
                    id="2-stars"
                    name="rating"
                    value="2"
                    onClick={() => setstars(2)}
                  />
                  <label for="2-stars" class="star">
                    &#9733;
                  </label>
                  <input
                    type="radio"
                    id="1-star"
                    name="rating"
                    value="1"
                    onClick={() => setstars(1)}
                  />
                  <label for="1-star" class="star">
                    &#9733;
                  </label>
                </div>
              </div>
            </div>
            <div id="reviewuser">
              <div>Your Review for this Movie</div>
              <div id="rvinput">
                <textarea placeholder="write here" />
              </div>
              <svg
                className="sendsymbol"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  sendcompletedidtodb();
                }}
                fill="white"
                opacity="1"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
              </svg>
            </div>
          </div>
        </div>
      )}
      <Swiper
        spaceBetween={isPC ? 0 : 10}
        slidesPerView={isPC ? 6 : 2}
        modules={isPC ? [Navigation, Scrollbar] : [Scrollbar]}
        className="swipercardwrapper"
        navigation={isPC ? {
          nextEl: "swiper-button-next",
          prevEl: "swiper-button-prev",
        } : null}
        freeMode={true}
        
        scrollbar={{ draggable: true }}
      >
      
          { isPC && ( <><div className="swiper-button-prev" >
            <div className="svgbackg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
            </svg>
            </div>
          </div>
          <div className="swiper-button-next" >
          <div className="svgbackg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
            </svg>
            </div>
          </div></>)}
      
        {tren.results  &&  tren.results.map(
            (item, index) =>
              (item.poster_path || item.URL) && (
                <SwiperSlide key={index}>
                  <div key={index} id="trengallary">
                    <div id="outimg">
                      {mylist ? (
                        <svg
                          onClick={(event) => {
                            deleteindb(item.id);
                            event.target.parentElement.parentElement.parentElement.style.position =
                              "absolute";
                            event.target.parentElement.parentElement.parentElement.style.opacity = 0;

                            console.log(
                              event.target.parentElement.parentElement
                                .parentElement
                            );
                          }}
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
                          onClick={() => {
                            if (putInDbMovies) {
                              putInDbMovies(
                                item.id,
                                item.poster_path,
                                item.title
                              );
                            }
                            if (putInDbSeries) {
                              putInDbSeries(
                                item.id,
                                item.poster_path,
                                item.name
                              );
                            }
                          }}
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
                      {mylist && (
                        <svg
                          className="checksvg"
                          onClick={() => {
                            setreviewmy(true);
                            setclieckedcomid(item.id);
                          }}
                          fill="white"
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 -960 960 960"
                          width="24"
                        >
                          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                      )}

                      <img
                        onClick={() => {
                          handleButtonClick(item.id);
                        }}
                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${
                          item.poster_path || item.URL
                        }`}
                        alt={item.title || "Image Alt Text"}
                      />
               
                    </div>
                    <a id="clickthishref" href={`https://mymovielist-mkra.onrender.com/detes/${item.id}?m=${movies}`} >
                    <div className="trndetes">
                      <div id="listcon">
                        <div>{item.title || item.name}</div>
                        <div id="year">
                          {item.release_date
                            ? item.release_date.slice(0, 4)
                            : ""}
                        </div>
                      </div>{" "}
                      <div id="starstrn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="gold"
                          height="15"
                          viewBox="0 -960 960 960"
                          width="15"
                        >
                          <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
                        </svg>

                        {item.vote_average ? item.vote_average.toFixed(1) : ""}
                      </div>
                    </div>
                    </a>
                  </div>
                </SwiperSlide>
              )
          )}
       
      </Swiper>
    </>
  );
}
