import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import logo from "./assets/Logonetflix.png";
import imdb from "./assets/imdb.png";
import bg from "./assets/p2.jpg";
import pic1 from "./assets/jaws.jpg";
import axios from "axios";
import List from "./components/List";
import { gsap } from "gsap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import SwiperList from "./components/SwiperList";
import { Scrollbar, Navigation,Pagination,A11y } from "swiper/modules";
import { useSwiper } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
function App() {
  const [tren, settrend] = useState([]);
  const [tren1, settrend1] = useState([]);
  const [overlay, setoverlay] = useState(false);
  const [overlay1, setoverlay1] = useState(false);
  const [movies, setmovies] = useState("true");
  const [randomNumber, setrandom] = useState([
    Math.floor(Math.random() * 20),
    Math.floor(Math.random() * 20),
    Math.floor(Math.random() * 20),
  ]);
  const [movieName, setMovieName] = useState("");
  const [searchList, setsl] = useState("");
  const [userName, setusername] = useState("Rehman");
  const [clmovies, setclmov] = useState([]);
  const navigate = useNavigate();

  const [mylistfinal, setmylistfinal] = useState({ results: [] });
  const [menu, setmenu] = useState(false);
  const [menureal, setmenureal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
const swipper = useSwiper();
  const handleInputChange = (event) => {
    setMovieName(event.target.value);
  };
  function NumToTime(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    if (minutes + "".length < 2) {
      minutes = "0" + minutes;
    }
    return hours + "hr " + minutes + "m";
  }
  const searchmovies = async () => {
    const urlForMovie = "https://api.themoviedb.org/3/search/movie";
    const urlFortv = "https://api.themoviedb.org/3/search/tv";
    const params = {
      query: movieName,
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
    const url = movies == "true" ? urlForMovie : urlFortv;
    try {
      const response = await axios.get(url, { params, ...options });
      console.log(response.data);
      setsl(response.data);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const fetchData = async () => {
    const urlfortrnd = "https://api.themoviedb.org/3/trending/movie/day";
    const urlfortrndS = "https://api.themoviedb.org/3/tv/popular";
    const urlfortrndSforcl = "https://api.themoviedb.org/3/movie/top_rated";

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

    try {
      const response = await axios.get(urlfortrnd, { ...options });
      const response1 = await axios.get(urlfortrndS, { ...options });
      const response2 = await axios.get(urlfortrndSforcl, { ...options });

      settrend(response.data);
      settrend1(response1.data);
      setclmov(response2.data);
      console.log(tren);
    } catch (error) {
      console.error("error:", error);
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
  const deleteindb = async (id) => {
    console.log("pressed");
    try {
      const resp = await axios.delete("http://localhost:3001/delete", {
        data: {
          username: "Rehman",
          postText: id,
        },
      });
      console.log(resp.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    gsap.from("#ovai", { opacity: 0, duration: 0.5, delay: 0.5 });

    console.log("heu4");
  }, [overlay]);
  useEffect(() => {
    gsap.fromTo(
      ".searchdisplay",
      { opacity: 0 },
      { opacity: 1, duration: 0.5, delay: 0.5 }
    );

    console.log("heu3");
  }, [searchList]);
  useEffect(() => {
    gsap.fromTo(
      ".ov1box",
      { opacity: 0 },
      { opacity: 1, duration: 0.5, delay: 0.5 }
    );

    console.log("heu2");
  }, [overlay1]);
  const handleImageLoad = () => {
    console.log("Image loaded!");
    setImageLoaded(true);
  };

  return (
    <>
      {tren && (
        <div
          className="wholeweb"
          style={{ display: imageLoaded ? "block" : "none" }}
        >
          <div className="overlay" id="oy">
            <div id="menu">
              {menu && (
                <div className="menuinner">
                  <svg
                    id="close1"
                    onClick={() => {
                      setmenu(false);
                      const c = document.getElementById("menu");

                      c.style.width = "0%";
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    height="27"
                    fill="white"
                    viewBox="0 -960 960 960"
                    width="27"
                  >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>

                  <div
                    className="sbt"
                    onClick={() => {
                      setmenu(false);
                      const c1 = document.getElementById("menu");
                      c1.style.width = "0vw";
                      setoverlay(true);
                      const c = document.getElementById("oy");
                      c.style.height = "50vh";
                    }}
                  >
                    Search
                  </div>
                  <div
                    className="sbt"
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
                  >
                    MyList
                  </div>
                </div>
              )}
            </div>

            {overlay && (
              <div className="overlayinner">
                <div className="ovainput" id="ovai">
                  <svg
                    id="close"
                    onClick={() => {
                      setoverlay(false);
                      const c = document.getElementById("oy");

                      c.style.height = "0vh";
                      setsl("");
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    height="27"
                    fill="white"
                    viewBox="0 -960 960 960"
                    width="27"
                  >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                  <div className="inputsearchbox">
                    {" "}
                    <input
                      id="inputbox"
                      autocomplete="off"
                      placeholder="Enter movie or series name"
                      value={movieName}
                      onChange={handleInputChange}
                    />
                    <svg
                      id="nextsymbol"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => {
                        const c = document.getElementById("oy");
                        const inputbix = document.getElementById("ovai");
                        inputbix.style.height = "20vh";
                        c.style.height = "100vh";
                        searchmovies();
                      }}
                      fill="white"
                      opacity="0.5"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                    </svg>
                    <div className="btmvser">
                      <div
                        id="mvbt"
                        onClick={() => {
                          setmovies("true");
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
                          setmovies("false");
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
                    </div>
                  </div>
                </div>

                {searchList && (
                  <div className="displaysearch">
                    <div className="searchdisplay">
                      <List tren={searchList} movies={movies} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="header1">
            <img src={logo} id="logo1" />

            {/*    <div
              onClick={async () => {
                getIds();
                mylistimpl();

                setoverlay1(true);
                const c = document.getElementById("oy");
                c.style.height = "100%";
              }}
            >
              {" "}
              MyList
            </div>
      
            <div
              onClick={() => {
                setoverlay(true);
                const c = document.getElementById("oy");

                c.style.height = "50vh";
              }}
            >
              <svg
                id="searchsymbol"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                fill="white"
                width="24"
              >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
            </div>
            */}

            <div
              className="options"
              onClick={() => {
                /* const c = document.getElementById("menu");
                c.style.width = "20vw";
                setmenu(true); */
                setmenureal(!menureal);
                let value = !menureal;
                const c = document.getElementById("opexpan");
                c.style.width = value ? "200px" : "0px";
              }}
            >
              <div className="opexpand" id="opexpan">
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
          <div className="dots">
<div onClick={()=> swipper && swipper.slidePrev(2)}></div>
<div nClick={()=> swipper.slideTo(1)}></div>
<div nClick={()=> swipper.slideTo(2)}></div>
          </div>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
          >
            {tren.results &&
              randomNumber.map((num, index) => (
                <>
                  <SwiperSlide>
                    <div className="darkcorner">
                      <img
                        src={
                          tren.results
                            ? `https://image.tmdb.org/t/p/original${
                                tren.results[randomNumber[index]].backdrop_path
                              }`
                            : ""
                        }
                        onLoad={handleImageLoad}
                        id="bgimg"
                      />
                    </div>

                    {tren.results && (
                      <div className="detes">
                        <div>
                          <h1>
                            {tren.results
                              ? tren.results[randomNumber[index]].title
                              : "null"}
                          </h1>
                          <div className="detesdetes1">
                            <div id="imdbrating">
                              <img src={imdb} />
                              <div>
                                {tren.results
                                  ? tren.results[
                                      randomNumber[index]
                                    ].vote_average.toFixed(1) > 0
                                    ? tren.results[
                                        randomNumber[index]
                                      ].vote_average.toFixed(1)
                                    : "Not rated"
                                  : "null"}
                              </div>
                            </div>
                            <div id="randommyear">
                              {" "}
                              {tren.results
                                ? tren.results[
                                    randomNumber[index]
                                  ].release_date.slice(0, 4)
                                : "null"}{" "}
                            </div>
                            <div id="randomm18">
                              {tren.release_date
                                ? NumToTime(tren.runtime)
                                : null}
                            </div>
                          </div>
                          <p id="moviedetes1">
                            {tren.results
                              ? tren.results[randomNumber[index]].overview
                              : ""}
                          </p>

                          <div className="btlist">
                            <div id="viewbt">Watch now</div>{" "}
                            <div
                              id="watchbt"
                              onClick={() => {
                                putInDbMovies(
                                  tren.results[randomNumber[index]].id,
                                  tren.results[randomNumber[index]].poster_path,
                                  tren.results[randomNumber[index]].title
                                );
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
                    )}
                  </SwiperSlide>
                </>
              ))}
          </Swiper>
          {!overlay && !overlay1 && tren.results && (
            <div className="secpage">
              <div id="blackcover"></div>
              <div className="trndingpage">
                <div id="trenheader">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    height="55"
                    viewBox="0 -960 960 960"
                    width="55"
                  >
                    <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
                  </svg>
                  <div>Trending Movies</div>
                </div>
                <div className="trenlist">
                  <SwiperList
                    tren={tren}
                    putInDbMovies={putInDbMovies}
                    movies={"true"}
                  />
                </div>
                <div>
                  <div id="trenheader">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="red"
                      height="55"
                      viewBox="0 -960 960 960"
                      width="55"
                    >
                      <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
                    </svg>
                    <div>Trending Series</div>
                  </div>
                  <div className="trenlist">
                    <SwiperList
                      tren={tren1}
                      putInDbSeries={putInDbSeries}
                      movies={"false"}
                    />
                  </div>
                </div>
                <div>
                  <div id="trenheader">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="red"
                      height="55"
                      viewBox="0 -960 960 960"
                      width="55"
                    >
                      <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
                    </svg>
                    <div>All time classics</div>
                  </div>
                  <div className="trenlist">
                    <SwiperList
                      tren={clmovies}
                      putInDbMovies={putInDbMovies}
                      movies={"true"}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
