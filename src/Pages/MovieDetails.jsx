import React, { useEffect, useState } from "react";
import logo from "../assets/Logonetflix.png";
import imdb from "../assets/imdb.png";
import ec from "../assets/ec.png";

import axios from "axios";
import { useParams } from "react-router-dom";
import "./md.css";
import List from "../components/List";
import { useNavigate } from "react-router-dom";
import Review from "../components/Review";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
export default function MovieDetails() {
  const [tren, settrend1] = useState();
  const [recomds, setrecomds] = useState([]);
  const [reviews, setrevies] = useState([]);
  const navigate = useNavigate();
  const [menu, setmenu] = useState(false);
  const [seasons, setseasons] = useState({ results: [] });
  const [media1, setmedia] = useState();
  const [keywords, setkeywords] = useState([]);
  const [isScaled, setIsScaled] = useState(false);
  const [credits, setcredits] = useState([]);
  const [video, setvideo] = useState();

  const { id } = useParams();
  const urlParams = new URLSearchParams(window.location.search);
  let paramValue = urlParams.get("m");
  function NumToTime(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    if (minutes + "".length < 2) {
      minutes = "0" + minutes;
    }
    return hours + "hr " + minutes + "m";
  }

  const fetchData = async (id) => {
    const urlformovie = `https://api.themoviedb.org/3/movie/${id}`;
    const urltvseries = `https://api.themoviedb.org/3/tv/${id}`;

    const options = {
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
      },
    };
    const url = paramValue == "true" ? urlformovie : urltvseries;
    try {
      const response1 = await axios.get(url, { ...options });
      settrend1(response1.data);
      console.log(tren);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const getmedia = async (id) => {
    const media2 = `https://api.themoviedb.org/3/movie/${id}/images`;
    const mediaforseries = `https://api.themoviedb.org/3/tv/${id}/images`;
    const media = paramValue == "true" ? media2 : mediaforseries;
    const options = {
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
      },
    };
    try {
      const mediares = await axios.get(media, { ...options });
      setmedia([
        mediares.data.backdrops[0].file_path,
        mediares.data.backdrops[1].file_path,
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getkeywords = async (id) => {
    const keywordsformovie = `https://api.themoviedb.org/3/movie/${id}/keywords`;
    const keywordsforseries = `https://api.themoviedb.org/3/tv/${id}/keywords`;
    const keywords =
      paramValue == "true" ? keywordsformovie : keywordsforseries;
    const options = {
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
      },
    };
    try {
      const keywordsres = await axios.get(keywords, { ...options });
      setkeywords(keywordsres.data.keywords || keywordsres.data.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getcredits = async (id) => {
    const creditsurlformovie = `https://api.themoviedb.org/3/movie/${id}/credits`;
    const creditsurlfortv = `https://api.themoviedb.org/3/tv/${id}/credits`;
    const creditsUrl =
      paramValue == "true" ? creditsurlformovie : creditsurlfortv;
    const options = {
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
      },
    };
    try {
      const creditsres = await axios.get(creditsUrl, { ...options });
      setcredits(creditsres.data.cast);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getvideo = async (id) => {
    const videourlfortv = `https://api.themoviedb.org/3/tv/${id}/videos`;
    const videourlformovie = `https://api.themoviedb.org/3/movie/${id}/videos`;
    const videourl = paramValue == "true" ? videourlformovie : videourlfortv;
    const options = {
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
      },
    };
    try {
      const videosres = await axios.get(videourl, { ...options });
      setvideo(videosres.data.results);

      console.log(videosres.data.results[1].key);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getrecommds = async (id) => {
    const urlmovierecommds = `https://api.themoviedb.org/3/movie/${id}/recommendations`;
    const urlmoviereviews = `https://api.themoviedb.org/3/movie/${id}/reviews`;
    const urltvseriesrecommds = `https://api.themoviedb.org/3/tv/${id}/recommendations`;
    const urltvseriesreviews = `https://api.themoviedb.org/3/tv/${id}/reviews`;

    const UrlForReview =
      paramValue == "true" ? urlmoviereviews : urltvseriesreviews;
    const UrlForRecommds =
      paramValue == "true" ? urlmovierecommds : urltvseriesrecommds;

    const options = {
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
      },
    };

    try {
      const response1 = await axios.get(UrlForRecommds, { ...options });
      const response2 = await axios.get(UrlForReview, { ...options });

      setrecomds(response1.data);
      setrevies(response2.data);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const putInDbMovies = async (id, url, title) => {
    console.log("pressed");
    try {
      const resp = await axios.post("http://localhost:3001/putIDMovies", {
        username: "Rehman",
        id: id,
        url: url,
        title: title,
      });

      console.log(resp.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const putInDbSeries = async (id, url, name) => {
    console.log("pressed");
    try {
      const resp = await axios.post("http://localhost:3001/putIDSeries", {
        username: "Rehman",
        id: id,
        url: url,
        name: name,
      });
      console.log(resp.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    settrend1();
    setmedia();
    setkeywords([]);
    setrecomds([]);
    setrevies([]);
    setcredits([]);
    setvideo();
    getrecommds(id);
    getmedia(id);
    getkeywords(id);
    getvideo(id);
    getcredits(id);
    fetchData(id);
    console.log(video);
  }, [id]);
  return (
    <>
      {tren && (
        <div>
          <div className="header1">
            <img src={logo} id="logo1" />

            <div
              className="options"
              onClick={() => {
                /* const c = document.getElementById("menu");
                c.style.width = "20vw";
                setmenu(true); */
                setmenu(!menu);
                let value = !menu;
                const c = document.getElementById("opexpan");
                c.style.width = value ? "290px" : "0px";
              }}
            >
              <div className="opexpand" id="opexpan">
                <svg
                  fill="white"
                  onClick={() => navigate("/")}
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    setmenu(false);
                    const c1 = document.getElementById("menu");
                    c1.style.width = "0vw";
                    setoverlay(true);
                    const c = document.getElementById("oy");
                    c.style.height = "50vh";
                  }}
                  fill="white"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                </svg>

                <svg
                  onClick={async () => {
                    setmenu(false);
                    const c1 = document.getElementById("menu");
                    c1.style.width = "0%";

                    setoverlay1(true);
                    const c = document.getElementById("oy");
                    c.style.height = "100%";
                    setTimeout(() => {
                      navigate("/mylist");
                    }, 500);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z" />
                </svg>
                <svg
                  onClick={() => {
                    setmenu(false);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="27"
                  fill="white"
                  viewBox="0 -960 960 960"
                  width="27"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="darkcorner">
            <img
              src={
                tren
                  ? `https://image.tmdb.org/t/p/original${tren.backdrop_path}`
                  : ""
              }
              id="bgimg"
            />
          </div>
          <div className="detes">
            <div>
              {/*  <div className="starwithnum">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="gold"
          height="34"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
        </svg>
        <div>
          {tren
            ? tren[randomNumber].vote_average.toFixed(1)
            : "null"}
        </div>
      </div> */}

              <h1>{tren.name || tren.title}</h1>
              <div className="detesdetes1">
                <div id="imdbrating">
                  <img src={imdb} />
                  <div>{tren ? tren.vote_average.toFixed(1) : "null"}</div>
                </div>
                <div id="randommyear">
                  {" "}
                  {tren.release_date
                    ? tren.release_date.slice(0, 4)
                    : "Seasons: " + tren.number_of_seasons}{" "}
                </div>
                <div id="randomm18">
                  {tren.release_date ? NumToTime(tren.runtime) : null}
                </div>
              </div>
              {/* <p>{tren ?   `"${tren.tagline}"`     : null} </p> */}
              <p id="moviedetes1">{tren ? tren.overview : ""}</p>
              <div className="genres">
                
                    {tren
                      ? tren.genres.map((item, index) => (
                            <div className="genrebt" key={index}>
                              {item.name}
                            </div>
                        ))
                      : null}
                
              </div>
              <div className="btlist">
                <a
                  id="viewbt"
                  href={`https://www.youtube.com/results?search_query=${
                    tren.name || tren.title
                  } trailer`}
                  target="_blank"
                >
                  Watch Trailer
                </a>{" "}
                <div
                  id="watchbt"
                  onClick={() => {
                    if (tren.name) {
                      putInDbSeries(tren.id, tren.poster_path, tren.name);
                    }
                    if (tren.title) {
                      putInDbMovies(tren.id, tren.poster_path, tren.title);
                    }
                  }}
                >
                  <svg
                    fill="white"
                    id="watchbt2"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                  </svg>{" "}
                  Watchlist
                </div>
              </div>
            </div>
          </div>
          {tren.seasons && (
            <div className="seasonssection">
              <h1>Seasons</h1>
              
              <div className="seasonsarray">
              <Swiper spaceBetween={0} slidesPerView={tren.seasons.length > 5 ?  5 : tren.seasons.length } >

                {tren.seasons.map((item, index) => {
                  return (
                    item.poster_path && (
                      <SwiperSlide>

                      <div>
                        {" "}
                        <img
                          className="saimgs"
                          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`}
                        />
                        <div className="saih1">{item.name}</div>
                      </div>
                      </SwiperSlide>

                    )
                  );
                })}
                </Swiper>

              </div>
            </div>
          )}
          {media1 && (
            <div className="wholemedia">
              <div className="mediasection">
                <div id="mediapointer">Media</div>
                <div className="mediainner">
                  <div className="arrayofimgsback">
                    {media1.map((item, index) => (
                      <img
                        id="imgs"
                        src={`https://image.tmdb.org/t/p/original${item}`}
                        onClick={(event) => {
                          const newTransform = isScaled
                            ? "scale(1)"
                            : "scale(2)";
                          const zindex = isScaled ? 1 : 5;
                          event.currentTarget.style.transform = newTransform;
                          event.currentTarget.style.zIndex = zindex;

                          setIsScaled(!isScaled);
                        }}
                      />
                    ))}
                    <div
                      className="misvg"
                      onClick={() => {
                        navigate(`/media?id=${id}&m=${paramValue}`);
                        console.log("ckuc");
                      }}
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="moreimgsvg"
                        opacity="0.7"
                        fill="white"
                        height="27"
                        viewBox="0 -960 960 960"
                        width="27"
                      >
                        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                      </svg>
                    </div>
                  </div>

                  <div className="keysandcredits">
                    {keywords && (
                      <div className="keywords">
                        {keywords.map((item, index) => (
                          <div
                            onClick={() =>
                              navigate(
                                `/searchbykeyword?id=${item.id}&name=${item.name}`
                              )
                            }
                          >
                            {item.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="videoandcastsection">
            <div className="videocontent">
              <div className="videoheader">VideoMedia</div>
              <div className="iframes">
                {video && video[0] ? (
                  <>
                    {video[0] && (
                      <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${video[0].key}`}
                        frameborder="0"
                        allowfullscreen="1"
                      ></iframe>
                    )}
                    {video[1] && (
                      <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${video[1].key}`}
                        frameborder="0"
                        allowfullscreen="1"
                      ></iframe>
                    )}
                    <div
                      className="misvg"
                      onClick={() => {
                        navigate(`/media?id=${id}&m=${paramValue}`);
                        console.log("ckuc");
                      }}
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="moreimgsvg1"
                        opacity="0.5"
                        fill="white"
                        height="27"
                        viewBox="0 -960 960 960"
                        width="27"
                      >
                        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                      </svg>
                    </div>
                  </>
                ) : (
                  <div id="novideos" style={{ color: "white" }}>
                    No avaible videos to show
                  </div>
                )}
                {/* <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${video}`}
                  frameborder="0"
                  allowfullscreen='1'
                ></iframe>*/}
              </div>
            </div>
            <div>
              {" "}
              {credits && (
                <div className="CastSection">
                  <div className="cardcontainer">
                    {credits &&
                      credits.map(
                        (item, index) =>
                          index <= 2 &&
                          item.profile_path && (
                            <div
                              className="cardofcast"
                              onClick={() => {
                                navigate(`/castdetes?p=${item.id}`);
                              }}
                            >
                              <div className="imgofcast">
                                <img
                                  src={`https://media.themoviedb.org/t/p/w138_and_h175_face/${item.profile_path}`}
                                />
                              </div>
                              <div className="castname">
                                <div>{item.name}</div>
                                <div>{item.character}</div>
                              </div>
                            </div>
                          )
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>
          (
          {reviews.results && (
            <div className="Revsec">
              <h1>Reviews</h1>
              <Review reviews={reviews} />
              <div></div>
            </div>
          )}
          )
          <div className="recomds">
            <div id="remdstext">Recommendations</div>

            {recomds.results && recomds.results.length > 0 ? (
              <List tren={recomds} movies={paramValue} />
            ) : (
              <div style={{ color: "white", fontFamily: "sans-serif" }}>
                No Recommendations available for this one
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
