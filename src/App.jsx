import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import logo from "./assets/Logonetflix.png";
import bg from "./assets/p2.jpg";
import pic1 from "./assets/jaws.jpg";
import axios from "axios";
import List from "./components/List";
import { gsap } from "gsap";
function App() {
  const [tren, settrend] = useState([]);
  const [tren1, settrend1] = useState([]);
  const [overlay, setoverlay] = useState(false);
  const [overlay1, setoverlay1] = useState(false);

  const [randomNumber, setrandom] = useState(Math.floor(Math.random() * 20));
  const [movieName, setMovieName] = useState("");
  const [searchList, setsl] = useState("");
  const [userName, setusername] = useState("Rehman");
  const [mylist, setmylist] = useState([]);
  const [mylistfinal, setmylistfinal] = useState({ results: [] });
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
        Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
      },
    };

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

      settrend(response.data);
      settrend1(response1.data);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const mylistimpl = async () => {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
      },
    };

    try {
      const updatedList = [];

      for (let i = 0; i < mylist.length; i++) {
        const url = `https://api.themoviedb.org/3/movie/${mylist[i]}`;
        const resp = await axios.get(url, options);

        const movieData = {
          poster_path: resp.data.poster_path,
          title: resp.data.title,
        };

        updatedList.push(movieData);
      }

      setmylistfinal({ results: updatedList });
    } catch (error) {
      console.error("error:", error);
    }
  };
  const putindb = async (id) => {
    console.log("pressed");
    try {
      const resp = await axios.post("http://localhost:3001/putID", {
        username: "Rehman",
        postText: id,
      });
      console.log(resp.data);
    } catch (error) {
      console.error("Error:", error);
    }
    getIds();
  };
  const getIds = async () => {
    const response = await axios.get(
      `http://localhost:3001/getIDS?username=${userName}`
    );
    console.log(response.data[0].data);
    setmylist(response.data[0].data);
  };
  useEffect(() => {
    getIds();
    fetchData();

  }, []);
  useEffect(() => {
    gsap.from("#ovai", { opacity: 0, duration: 0.5, delay: 0.5 });

    console.log("heu4");
  }, [overlay]);
  useEffect(() => {
    gsap.fromTo(".searchdisplay",{opacity:0}, { opacity: 1, duration: 0.5, delay: 0.5 });

    console.log("heu3");
  }, [searchList]);
  useEffect(() => {
  
    gsap.fromTo(".ov1box",{opacity:0}, { opacity: 1, duration: 0.5, delay: 0.5 });

    console.log("heu2");
  }, [overlay1]);

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
                    id="inputbox"
                    autocomplete="off"
                    placeholder="Enter movie name"
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
                      c.style.height = '100vh';
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
                    id="close"
                    className="ovapart1"
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
                </div>
              </div>
              {searchList && (
                <div className="displaysearch">
                  <div className="searchdisplay">
                    <List tren={searchList} putindb={putindb} />
                  </div>
                </div>
              )}
            </div>
          )}
          {overlay1 && (
            <>
              <div className="overlay1inner">
                <div className="ov1ih1">
                  <div>My List</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      setoverlay1(false);
                      const c = document.getElementById("oy");
                      c.style.height = "0vh";
                    }}
                    fill="white"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </div>
                <div className="ov1box">
                  <List tren={mylistfinal} putindb={putindb} />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="header1">
          <div id="listp">
            <img src={logo} id="logo1" />

            <div
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
            <div className="starwithnum">
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
                {tren.results
                  ? tren.results[randomNumber].vote_average.toFixed(1)
                  : "null"}
              </div>
            </div>
            <h1>{tren.results ? tren.results[randomNumber].title : "null"}</h1>
            <p>{tren.results ? tren.results[randomNumber].overview : ""}</p>

            <div className="btlist">
              <div id="viewbt">VIEW</div>{" "}
              <div
                id="watchbt"
                onClick={() => {
                  putindb(tren.results[randomNumber].id);
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
                ADD LIST
              </div>
            </div>
          </div>
        </div>
       {!overlay && !overlay1 && <div className="secpage">
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
              <List tren={tren} putindb={putindb} />
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
                <List tren={tren1} putindb={putindb} />
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
                <List tren={tren1} putindb={putindb} />
              </div>
            </div>
          </div>
        </div>
       }
      </div>
    </>
  );
}

export default App;
