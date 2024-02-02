import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import logo from "./assets/unnamed.jpg";
import bg from "./assets/p2.jpg";
import pic1 from "./assets/jaws.jpg";
import axios from "axios";
import List from "./components/List";
function App() {
  const [tren, settrend] = useState([]);
  const [tren1, settrend1] = useState([]);
  const [overlay, setoverlay] = useState(false);
  const [randomNumber, setrandom] = useState(Math.floor(Math.random() * 20));
  const [movieName, setMovieName] = useState("");
  const [searchList, setsl] = useState("");

  const handleInputChange = (event) => {
    setMovieName(event.target.value);
  };

  const searchmovies = async () => {
    const url = "https://api.themoviedb.org/3/search/movie";

    const params = {
      query: movieName,
      include_adult: false,
      language: "en-US",
      page: 1,
    };

    const options = {
      headers: {
        accept: "application/json",
        Authorization:import.meta.env.VITE_GAPI_KEY_ENV
        , 
      },
    };

    try {
      const response = await axios.get(url, { params, ...options });
      console.log(response.data);
      setsl(response.data)
      
    } catch (error) {
      console.error("error:", error);
    }
  };
  const fetchData = async () => {
    const urlfortrnd = "https://api.themoviedb.org/3/trending/movie/week";
    const urlfortrndS = "https://api.themoviedb.org/3/tv/popular";

    const params = {
      query: "drive",
      include_adult: false,
      language: "en-US",
      page: 1,
    };

    const options = {
      headers: {
        accept: "application/json",
        Authorization:
        import.meta.env.VITE_GAPI_KEY_ENV, 
      },
    };

    try {
      const response = await axios.get(urlfortrnd, { ...options });
      const response1 = await axios.get(urlfortrndS, { ...options });

      settrend(response.data);
      settrend1(response1.data);
     
    } catch (error) {
      console.error("error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="wholeweb">
        <div className="overlay" id="oy">
          {overlay && (
            <div className="overlayinner">
              
              <div className="ovainput" id="ovai">
                <div>
                  {" "}
                  <input
                    placeholder="Enter movie name"
                    value={movieName}
                    onChange={handleInputChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      const c = document.getElementById("oy");
                      const c1 = document.getElementById("ovai");
                      c1.style.height = "60vh";
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
                  <svg
                   className="ovapart1"
                   onClick={() => {
                  setoverlay(false);
                  const c = document.getElementById("oy");
                  c.style.height = "0vh";
                  setsl([]);
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
               
              </div>
              {searchList && <div className="displaysearch"><div className="searchdisplay"><List tren={searchList} /></div></div>}
            </div>
          )}
        </div>
        <div className="header">
          <img src={logo} id="logo1" />

          <div id="listp">
            <div> Home</div>
            <div> Movies</div>
            <div> Series</div>
            <div
              onClick={() => {
                setoverlay(true);
                const c = document.getElementById("oy");
                c.style.height = "50vh";
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                fill="white"
                width="24"
              >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
            </div>
            <div>Log in</div>
            <div id="signinbt">Sign Up</div>
          </div>
        </div>
        <div className="darkcorner">
          <img
            src={
              tren.results
                ? `https://image.tmdb.org/t/p/original${tren.results[randomNumber].backdrop_path}`
                : ""
            }
            id="bgimg"
          />
        </div>
        <div className="detes">
          <div>
            <h1>{tren.results ? tren.results[randomNumber].title : "null"}</h1>
            <p>{tren.results ? tren.results[randomNumber].overview : ""}</p>
            <div className="ratin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                height="45"
                viewBox="0 -960 960 960"
                width="45"
              >
                <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                height="45"
                viewBox="0 -960 960 960"
                width="45"
              >
                <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                height="45"
                viewBox="0 -960 960 960"
                width="45"
              >
                <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                height="45"
                viewBox="0 -960 960 960"
                width="45"
              >
                <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gold"
                height="45"
                viewBox="0 -960 960 960"
                width="45"
              >
                <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
              </svg>
            </div>
            <div className="btlist">
              <div id="viewbt">View Details</div>{" "}
              <div id="watchbt">Watch Later</div>
            </div>
          </div>
        </div>
        <div className="secpage">
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
              <List tren={tren} />
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
                <List tren={tren1} />
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
                <List tren={tren1} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
