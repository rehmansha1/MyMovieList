import React, { useEffect, useState } from "react";
import logo from "../assets/Logonetflix.png";
import imdb from "../assets/imdb.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./md.css";
import List from "../components/List";
import { useNavigate } from "react-router-dom";
import Review from "../components/Review";

export default function MovieDetails() {
  const [tren, settrend1] = useState();
  const [recomds, setrecomds] = useState([]);
  const [reviews, setrevies] = useState([]);
  const navigate = useNavigate();
  const [menu, setmenu] = useState(false);
  const [seasons, setseasons] = useState({ results: [] });
  const { id } = useParams();
  const urlParams = new URLSearchParams(window.location.search);
  let paramValue = urlParams.get("m");



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
      console.log(reviews);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const putInDbMovies = async (id,url,title) => {
    console.log("pressed");
    try {
      const resp = await axios.post("http://localhost:3001/putIDMovies", {
        username: "Rehman",
        id: id,
        url: url,
        title: title
      });
      
      console.log(resp.data);
    } catch (error) {
      console.error("Error:", error);
    }
   
  };
  const putInDbSeries = async (id,url,name) => {
    console.log("pressed");
    try {
      const resp = await axios.post("http://localhost:3001/putIDSeries", {
        username: "Rehman",
        id: id,
        url:url,
        name:name
      });
      console.log(resp.data);
    } catch (error) {
      console.error("Error:", error);
    }
   
  };
  useEffect(() => {
    getrecommds(id);
    fetchData(id);
  }, []);

  return (
    <>
      {tren && (
        <div>
          <div className="header1">
            <img src={logo} id="logo1" />

            {
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
                    <div className="sbt" onClick={() => navigate("/")}>
                      Home
                    </div>
                    <div
                      className="sbt"
                      onClick={() => {
                        setmenu(false);
                        const c1 = document.getElementById("menu");
                        c1.style.width = "0%";
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
                        getIds();
                        mylistimpl();

                        setoverlay1(true);
                        const c = document.getElementById("oy");
                        c.style.height = "100%";
                      }}
                    >
                      MyList
                    </div>
                  </div>
                )}
              </div>
            }

            <div
              className="options"
              onClick={() => {
                const c = document.getElementById("menu");
                c.style.width = "20vw";
                setmenu(true);
              }}
            >
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

              <h1>
                {tren.name || tren.title}
              </h1>
              <div className="detesdetes1">
                <div id="imdbrating">
                  <img src={imdb} />
                  <div>{tren ? tren.vote_average.toFixed(1) : "null"}</div>
                </div>
                <div id="randommyear">
                  {" "}
                  {tren ? tren.release_date : "null"}{" "}
                </div>
                <div id="randomm18">
                  {tren ? (tren.adult ? "18+" : "") : ""}
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
                  : null}{" "}
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
               if(tren.name){
putInDbSeries(tren.id,tren.poster_path,tren.name)
               }
               if(tren.title){
                putInDbMovies(tren.id,tren.poster_path,tren.title)

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
          {tren.seasons && 
          <div className="seasonssection">
            <h1>Seasons</h1>
            <div className="seasonsarray">
            {tren.seasons.map((item, index) => {
              return (
                <div >
                  {" "}
                  <img
                  className="saimgs"
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`}
                  />
                  <div className="saih1">{item.name}</div>
                </div>
              );
            })}
            </div>
          </div>}

          <div className="recomds">
            <div id="remdstext">Recommendations</div>
            <List tren={recomds} s={paramValue} />
          </div>
          <div className="Revsec">
            <h1>Reviews</h1>
            <Review reviews={reviews} />
          </div>
        </div>
      )}
    </>
  );
}
