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
import "swiper/css/pagination";
import { useSwiper } from "swiper/react";
import SearchComponent from "./components/SearchComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Mobilecss.css";

gsap.registerPlugin(ScrollTrigger);

import {
  EffectFade,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css/effect-fade";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";

import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import LogOutbt from "./components/LogOutbt";
import GBTT from "./components/GBTT";
import Uppercard from "./components/Uppercard";
function App() {
  const [tren, settrend] = useState([]);
  const [tren1, settrend1] = useState([]);
  const [trn, settrn] = useState([]);
  const [overlay, setoverlay] = useState(false);
  const [overlay1, setoverlay1] = useState(false);
  const [movies, setmovies] = useState("true");
  const [randomNumber, setrandom] = useState();
  const [movieName, setMovieName] = useState("");
  const [searchList, setsl] = useState("");
  const [LoggedIn, setlogged] = useState(false);
  const [isPC, setPC] = useState(true);
  const [userName, setusername] = useState("Rehman");
  const [clmovies, setclmov] = useState([]);
  const navigate = useNavigate();
  const [userRecomds, setUserRecomds] = useState();
  const [mylistfinal, setmylistfinal] = useState({ results: [] });
  const [menu, setmenu] = useState(false);
  const [menureal, setmenureal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const swiper = useSwiper();
  const [moverlay, setmoverlay] = useState(false);
  const [notification, setnoti] = useState(false);
  const [noticontents, setnoticontents] = useState();
const [watchbtloading,setwatchbtloading] = useState(false);
  /*

  mobile states

  */
  const [mobileOverlay, setmobileOverlay] = useState(false);
  const [MobileSearchOn, setmMobileSearchOn] = useState(false);
  const [MobileSInput, setMobileSInput] = useState();
  /*
  end of mobile states
  */
  function getCookie(cookieName) {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
      const [name, encodedValue] = cookie.split("=");

      if (name === cookieName) {
        const decodedValue = decodeURIComponent(encodedValue);

        try {
          // Try to parse the cookie value as JSON
          return JSON.parse(decodedValue);
        } catch (error) {
          // If parsing fails, return the originGOal value
          return decodedValue;
        }
      }
    }

    return null; // Return null if the cookie with the specified name is not found
  }
  const rmfromlistnoti = async (id) => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    try {
      const resp = await axios.post(
        "https://mymovielistserver.onrender.com/removeidfromnotlist",
        {
          username,
          id: id,
        }
      );
      window.location.reload();
    } catch {
      console.log("Error: ", error);
    }
  };
  const receiveNotifyList = async () => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    if (userName){
    const encodedUsername = encodeURIComponent(username);

    try {
      const response = await axios.get(
        `https://mymovielistserver.onrender.com/getNOTFIYLIST?username=${encodedUsername}`
      );
      if (response.data) {
        setnoticontents(response.data);
        //  console.log(response.data);
      }
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  };

  function generateRandomNumbers() {
    var numbers = [];

    while (numbers.length < 3) {
      var randomNumber = Math.floor(Math.random() * 20);

      if (numbers.indexOf(randomNumber) === -1) {
        numbers.push(randomNumber);
      }
    }
    return numbers;
  }
  const handleInputChange = (event) => {
    setMovieName(event.target.value);
    if (document.getElementById("oy").style.height == "110vh") {
      document.getElementById("nextsymbol").style.rotate = "0deg";
    }
    // console.log(document.getElementById("oy").style.height);
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
      // console.log(response.data);
      setsl(response.data);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const fetchData = async () => {
    const urlfortrnd = "https://api.themoviedb.org/3/trending/movie/day";
    const urlfortrndS = "https://api.themoviedb.org/3/tv/popular";
    const urlfortrndSforcl = "https://api.themoviedb.org/3/movie/top_rated";
    const url = "https://api.themoviedb.org/3/movie/upcoming";

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
      const response3 = await axios.get(url, { ...options });

      settrend(response.data);
      settrend1(response1.data);
      setclmov(response2.data);
      settrn(response3.data);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const getuserrecommds = async () => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);

    const id = await axios.post(
      "https://mymovielistserver.onrender.com/getuserrecommadations",
      {
        username,
      }
    );
    const urltvseriesrecommds = `https://api.themoviedb.org/3/tv/${id.data.id}/recommendations`;

    const options = {
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
      },
    };

    try {
      const response1 = await axios.get(urltvseriesrecommds, { ...options });
      // console.log(response1.data);
      setUserRecomds(response1.data);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const putInDbSeries = async (id, url, name) => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    try {
      const resp = await axios.post(
        "https://mymovielistserver.onrender.com/putIDSeries",
        {
          username,
          id: id,
          url: url,
          name: name,
        }
      );
      //  console.log(resp.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const putInDbMovies = async (id, url, title) => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    setwatchbtloading(true)
    if (username) {
      try {
        const resp = await axios.post(
          "https://mymovielistserver.onrender.com/putIDMovies",
          {
            username,
            id: id,
            url: url,
            title: title,
          }
        );

        // console.log(resp);
        document.getElementById(
          "remindnotifycard"
        ).innerHTML = `${resp.data.message}`;
        document.getElementById("remindnotifycard").style.top = "5%";
        setwatchbtloading(false)
        setTimeout(() => {
          document.getElementById("remindnotifycard").style.top = "-10%";
        }, 1500);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      document.getElementById("remindnotifycard").innerHTML =
        "You are not Logged in";

      document.getElementById("remindnotifycard").style.top = "5%";
      setwatchbtloading(false)
      setTimeout(() => {
        document.getElementById("remindnotifycard").style.top = "-10%";
      }, 1500);
    }
  };

  const deleteindb = async (id) => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    try {
      const resp = await axios.delete(
        "https://mymovielistserver.onrender.com/delete",
        {
          data: {
            username,
            postText: id,
          },
        }
      );
      // console.log(resp.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    gsap.to(".options", { duration: 0.5, top: 20 });
  }, [imageLoaded]);
  useEffect(() => {
    const handleResize = () => {
      setPC(window.innerWidth > 767 ? true : false);
    };
    window.addEventListener("resize", handleResize);

    handleResize();
    // console.log(isPC);
  }, [window.innerWidth]);
  useEffect(() => {
    var ran = generateRandomNumbers();
    setrandom(ran);
    fetchData();

    setlogged(checkCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`));
    

    getuserrecommds(); //crashes server
    document.title = "MyMovieList";
  }, []);
  useEffect(() => {
    gsap.to("#notibar", { duration: 0.5, opacity: 1, y: -50 });
  }, [notification]);
  useEffect(() => {
 
    receiveNotifyList(); // crashes server
    
  }, []);
  useEffect(() => {
    gsap.from("#ovai", { opacity: 0, duration: 0.5, delay: 0.5 });
    let input = document.getElementById("inputbox");
    let send = document.getElementById("nextsymbol1");

    if (input && send) {
      input.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          send.click();
        }
      });
    }
  }, [overlay]);
  useEffect(() => {
    gsap.fromTo(
      ".searchdisplay",
      { opacity: 0 },
      { opacity: 1, duration: 0.5, delay: 0.5 }
    );
  }, [searchList]);

  useEffect(() => {
    gsap.fromTo(
      ".ov1box",
      { opacity: 0 },
      { opacity: 1, duration: 0.5, delay: 0.5 }
    );
  }, [overlay1]);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  function displayAllCookies() {
    const allCookies = document.cookie;

    if (allCookies) {
      const cookiesArray = allCookies.split("; ");

      cookiesArray.forEach((cookie) => {
        const [name, value] = cookie.split("=");
        //  console.log(`${name}: ${value}`);
      });
    } else {
      console.log("No cookies found.");
    }
  }
  function checkCookie(name) {
    // Get all cookies from document.cookie and split into an array
    const cookies = document.cookie.split("; ");

    // Iterate over the array of cookies
    for (const cookie of cookies) {
      // Split the cookie into name and value
      const [cookieName, cookieValue] = cookie.split("=");

      // Trim any leading or trailing spaces
      const trimmedCookieName = cookieName.trim();

      // Check if the current cookie matches the specified name
      if (trimmedCookieName === name) {
        return true; // Cookie found
      }
    }

    return false; // Cookie not found
  }

  /*
 mobile functions

*/
  const MobileOverlayDownFunction = async () => {
    document.getElementById("mobileOverlayId").style.animation =
      "downMobileOverlay 0.5s both";
  };
  const TurnallMSvgsTo0 = async () => {
    document
      .querySelectorAll(".mgridOfitems > div > div > svg")
      .forEach((item) => (item.style.opacity = 0));
  };
  /*
end of mobile functions
*/

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLEID_KEY_ENV}>
      {isPC && (
        <>
          {tren && (
            <>
              <Uppercard />
              {notification && (
                <div id="notibar">
                  <div id="notiheader">
                    <div id="h1rm">Reminder list</div>
                    <svg
                      onClick={() => {
                        document.getElementById("notibar").style.animation =
                          "opacityanddown 0.5s both";
                        setTimeout(() => setnoti(false), 500);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      height="27"
                      fill="white"
                      viewBox="0 -960 960 960"
                      width="27"
                      id="closenoti"
                    >
                      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                  </div>
                  {noticontents.map((item, index) => {
                    return (
                      <div id="list">
                        <div
                          className="notiInnerbox"
                          onClick={() =>
                            navigate(`/detes/${item.id}?m=${true}`)
                          }
                        >
                          <div>{item.name}</div>
                          <div className="innerboxdate">
                            {item.date + " - Released"}
                          </div>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => rmfromlistnoti(item.id)}
                          id="rmfromlist"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#e8eaed"
                        >
                          <path d="M200-440v-80h560v80H200Z" />
                        </svg>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="wholeweb ">
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
                    <SearchComponent
                      movieName={movieName}
                      handleInputChange={handleInputChange}
                      searchList={searchList}
                      setsl={setsl}
                      searchmovies={searchmovies}
                      List={List}
                      movies={movies}
                      setmovies={setmovies}
                      setoverlay={setoverlay}
                      MovieDetailSearch={false}
                    />
                  )}
                </div>
                {isPC && (
                  <div
                    className="header1main"
                    style={{ top: imageLoaded ? "0%" : "-200px" }}
                  >
                    <img
                      src={logo}
                      id="logo1"
                      onClick={() => {
                        document.getElementById("logo1").style.top = "-200px";
                      }}
                    />

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
                      style={{ position: "absolute" }}
                      onClick={() => {
                        /* const c = document.getElementById("menu");
                c.style.width = "20vw";
                setmenu(true); */
                        setmenureal(!menureal);
                        let value = !menureal;
                        const c = document.getElementById("opexpan");
                        c.style.width = value ? "300px" : "0px";
                        const d = document.querySelectorAll("#opexpan > svg");
                        d.forEach(
                          (item) =>
                            (item.style.pointerEvents = value ? "all" : "none")
                        );
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
                        {LoggedIn && (
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
                        )}
                        {LoggedIn ? <LogOutbt fill={"white"} /> : <GBTT />}

                        {noticontents && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={async () => {
                              setnoti(true);
                            }}
                            id="notificationsvg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e8eaed"
                          >
                            <path
                              d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 
                     17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130
                      84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"
                            />
                            <text
                              x="1000"
                              y="-550"
                              textAnchor="end"
                              fill="#fff"
                              fontSize="450"
                            >
                              {noticontents.length}
                            </text>
                          </svg>
                        )}
                        {LoggedIn && (
                          <svg
                            onClickCapture={() => navigate("/useraccount")}
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e8eaed"
                          >
                            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                          </svg>
                        )}
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
                      <div className="line"></div>
                      <div className="line"></div>
                      <div className="line"></div>
                    </div>
                  </div>
                )}

                <div className="dots"></div>
                {/*  <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
    //  navigation

// Custom class for individual slides
      autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
          >
           {tren.results &&
              randomNumber.map((num, index) => (
                
                  <SwiperSlide>
                      <img
                        src={
                          tren.results
                            ? `https://image.tmdb.org/t/p/original${
                                tren.results[randomNumber[index]].poster_path
                              }`
                            : ""
                        }
                        onLoad={handleImageLoad}
                        id="posternext"
                      />
                  </SwiperSlide>
              ))}
              </Swiper>
      */}
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                  spaceBetween={0}
                  slidesPerView={1}
                  className="mainwrapper"
                  //  navigation
                  containerClass="poster-1" // Set the main Swiper container class
                  pagination={{ clickable: true }}
                  paginationClassName="swiper-pagination"
                  autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                >
                  {tren.results &&
                    randomNumber.map((num, index) => (
                      <>
                        <SwiperSlide key={index}>
                          <div className="darkcorner">
                            <img
                              src={
                                tren.results
                                  ? `https://image.tmdb.org/t/p/original${
                                      tren.results[randomNumber[index]]
                                        .backdrop_path
                                    }`
                                  : ""
                              }
                              onLoad={handleImageLoad}
                              id="bgimg"
                            />
                          </div>

                          {isPC && tren.results && (
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
                                  <a
                                    id="viewbt"
                                    href={`https://www.youtube.com/results?search_query=${
                                      tren.results[randomNumber[index]].title
                                    } trailer`}
                                    target="_blank"
                                  >
                                    Watch Trailer
                                  </a>
                                  
                                   <div
                                    id="watchbt"
                                    onClick={() => {
                                      putInDbMovies(
                                        tren.results[randomNumber[index]].id,
                                        tren.results[randomNumber[index]]
                                          .poster_path,
                                        tren.results[randomNumber[index]].title
                                      );
                                    }}
                                  >
                                 {     !watchbtloading && <>    <svg
                                      fill="white"
                                      id="watchbt2"
                                      xmlns="http://www.w3.org/2000/svg"
                                      height="24"
                                      viewBox="0 -960 960 960"
                                      width="24"
                                    >
                                      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                                    </svg>{" "}
                                   <div> Watchlist</div></>}
                                   {watchbtloading && 
                                    <svg id="loading123333333" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg>
                                  }
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {!isPC && (
                            <div className="mdetes">
                              <div id="mtitle">
                                {tren.results
                                  ? tren.results[randomNumber[index]].title
                                  : "null"}
                              </div>
                              <div id="mdms">
                                <div>
                                  {" "}
                                  {tren.results
                                    ? tren.results[
                                        randomNumber[index]
                                      ].release_date.slice(0, 4)
                                    : "null"}
                                </div>
                                <div>
                                  {" "}
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
                                <div> duration</div>
                              </div>
                              <div id="mpw">
                                <div id="mplaybt">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="white"
                                    height="24"
                                    viewBox="0 -960 960 960"
                                    width="24"
                                  >
                                    <path d="M152-160q-23 0-35-20.5t1-40.5l328-525q12-19 34-19t34 19l328 525q13 20 1 40.5T808-160H152Z" />
                                  </svg>
                                </div>
                                <div id="mwishlistbt">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 -960 960 960"
                                    width="24"
                                    fill="white"
                                  >
                                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          )}
                        </SwiperSlide>
                      </>
                    ))}
                </Swiper>
                {!overlay && !overlay1 && clmovies.results && (
                  <div className="secpage">
                    <div id="blackcover"></div>
                    <div className="trndingpage">
                      {LoggedIn && userRecomds && (
                        <div className="trnbox">
                          <div id="trenheader">
                            {isPC && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="red"
                                height="55"
                                viewBox="0 -960 960 960"
                                width="55"
                              >
                                <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
                              </svg>
                            )}
                            <div className="tmfont">
                              Recommendations for you
                            </div>
                          </div>
                          <div className="trenlist">
                            <SwiperList
                              tren={userRecomds}
                              putInDbSeries={putInDbSeries}
                              movies={"false"}
                              isPC={isPC}
                            />
                          </div>
                        </div>
                      )}
                      <div className="trnbox">
                        <div id="trenheader">
                          {isPC && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="red"
                              height="55"
                              viewBox="0 -960 960 960"
                              width="55"
                            >
                              <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
                            </svg>
                          )}
                          <div className="tmfont">Trending Movies</div>
                        </div>
                        <div className="trenlist">
                          <SwiperList
                            tren={tren}
                            putInDbMovies={putInDbMovies}
                            movies={"true"}
                            isPC={isPC}
                          />
                        </div>
                      </div>
                      <div className="trnbox">
                        <div id="trenheader">
                          {isPC && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="red"
                              height="55"
                              viewBox="0 -960 960 960"
                              width="55"
                            >
                              <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
                            </svg>
                          )}
                          <div className="tmfont">
                            Upcoming And Popular Movies
                          </div>
                        </div>
                        <div className="trenlist">
                          <SwiperList
                            tren={trn}
                            putInDbMovies={putInDbMovies}
                            movies={"true"}
                            isPC={isPC}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="trnbox">
                          <div id="trenheader">
                            {isPC && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="red"
                                height="55"
                                viewBox="0 -960 960 960"
                                width="55"
                              >
                                <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
                              </svg>
                            )}
                            <div className="tmfont">Trending Series</div>
                          </div>
                          <div className="trenlist">
                            <SwiperList
                              tren={tren1}
                              putInDbSeries={putInDbSeries}
                              movies={"false"}
                              isPC={isPC}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}

    </GoogleOAuthProvider>
  );
}

export default App;
