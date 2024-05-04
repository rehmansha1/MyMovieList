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
import { Scrollbar, Navigation } from "swiper/modules";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "swiper/css";
import GBTT from "../components/GBTT";
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPC, setPC] = useState(true);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month (0 for January, 11 for December)
  const day = currentDate.getDate();
  const ymd = `${year}${month}${day}`;
  const { id } = useParams();
  const urlParams = new URLSearchParams(window.location.search);
  let paramValue = urlParams.get("m");
  const sendtodb = async(id,name,date)=>{
try{
  const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
  if(username){
    const resp = await axios.post("https://mymovielistserver.onrender.com/putnotifylist", {
      username,
      name:name,
      id: id,
date:date,
    });
    console.log(resp.data);}
}catch(error){console.log('Error: ',error)}
  }
  useEffect(() => {
    const handleResize = () => {
      setPC(window.innerWidth > 767 ? true : false);
    };
    window.addEventListener("resize", handleResize);

    handleResize();
    console.log(isPC)
  }, [window.innerWidth]);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  function NumToTime(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    if (minutes + "".length < 2) {
      minutes = "0" + minutes;
    }
    return hours + "hr " + minutes + "m";
  }
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
          // If parsing fails, return the original value
          return decodedValue;
        }
      }
    }

    return null; // Return null if the cookie with the specified name is not found
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
     const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    try {
      if(username){
      const resp = await axios.post("https://mymovielistserver.onrender.com/putIDMovies", {
        username,
        id: id,
        url: url,
        title: title,
      });
      console.log(resp.data);}
      else{
        const gbtElement = document.querySelector('.gbtinvi GBTT');
     
          gbtElement.click();
        
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const putInDbSeries = async (id, url, name) => {
    
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);

    try {
      if(username){
      const resp = await axios.post("https://mymovielistserver.onrender.com/putIDSeries", {
        username,
        id: id,
        url: url,
        name: name,
      });
      console.log(resp.data);}
      else{
        const gbtElement = document.querySelector('.gbtinvi > svg');
        if (gbtElement) {
          gbtElement.click();
        }
      }
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
  }, [id]);

  useEffect(() => {
gsap.to('.recommds_list > div',{scrollTrigger:{trigger:'.recommds_list > div'}, opacity:1,duration:0.5,stagger:0.1})
   
  }, [document.querySelectorAll('.recommds_list > div')]);
  const [overlay, setoverlay] = useState(false);
  const [indexforimg, setindexfimg] = useState("nothing");
  
  function expandandcenter(index) {
    const newOverlay = !overlay;
    setoverlay(newOverlay);
    const target = document.getElementById("overlayp99");
    target.style.opacity = newOverlay ? "1" : "0";
    target.style.scale = newOverlay ? "1" : "0.8";
    target.style.pointerEvents = newOverlay ? "all" : "none";
    setindexfimg(newOverlay && index >= 0 ? index : "nothing");
  }
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLEID_KEY_ENV}>

    <>

      {tren && (
        <>
        <div id="remindnotifycard">we will remind you when this movie releases </div>
          <div className="overlaypart99" id="overlayp99">
            <div id="closepart99"                 onClick={expandandcenter}
>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="cp99svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </div>

            <img
              id="imginnerofoverlay"
              src={
                media1 && indexforimg >= 0
                  ? `https://image.tmdb.org/t/p/original${media1[indexforimg]}`
                  : null
              }
            />
          </div>
          <div
            className="wholedivofmoviedetes"
            style={{ display: imageLoaded ? "block" : "none" }}
          >
            <div className="header1">
              <img src={logo} id="logo1" onClick={()=>{document.getElementById('logo1').style.top='-200px';  }} />

              <div
                className="options"
                id="option"
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

                      setoverlay(true);
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
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
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
                onLoad={handleImageLoad}
              />
            </div>
           {isPC && <div className="detes">
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
                   
                  {tren && <div id="imdbrating">
                    <img src={imdb} />
                    <div>{tren.vote_average.toFixed(1) > 0.1 ?  tren.vote_average.toFixed(1) : "not rated "}</div>
                  </div>}
                  <div id="randommyear">
                    {" "}
                    {tren.release_date
                      ? tren.release_date.slice(0, 4)
                      : "Seasons: " + tren.number_of_seasons}{" "}
                  </div>
                  {parseInt(tren.release_date.split('-').join('')) <  parseInt(ymd) &&
                  <div id="randomm18">
                    {tren.release_date ? NumToTime(tren.runtime) : null}
                  </div>}
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
                  { <div
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
                  }
                  {parseInt(tren.release_date.split('-').join('')) > parseInt(ymd)  &&
                   <div id="remindmebt" onClick={()=>{document.getElementById('remindnotifycard').classList.toggle('animationdrag'); sendtodb(tren.id,tren.title,tren.release_date);}}>
                   <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/></svg>

Remind me
                  </div>}
                </div>
              </div>
            </div>}
            {!isPC && 
                      <div className="mdetes">
                      <div id="mtitle">
                      {tren.results
                                ? tren.results[randomNumber[index]].title
                                : "null"}
                      </div>
                      <div id="mdms">
                        <div> {tren.results
                                  ? tren.results[
                                      randomNumber[index]
                                    ].release_date.slice(0, 4)
                                  : "null"}</div>
                        <div> {tren.results
                                    ? tren.results[
                                        randomNumber[index]
                                      ].vote_average.toFixed(1) > 0
                                      ? tren.results[
                                          randomNumber[index]
                                        ].vote_average.toFixed(1)
                                      : "Not rated"
                                    : "null"}</div>
                        <div>  duration</div>
                      </div>
                      <div id="mpw">
                      <div id="mplaybt">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="24" viewBox="0 -960 960 960" width="24"><path d="M152-160q-23 0-35-20.5t1-40.5l328-525q12-19 34-19t34 19l328 525q13 20 1 40.5T808-160H152Z"/></svg>

                      </div>
                      <div id="mwishlistbt">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="white"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                      </div>
                      </div>
                      </div>}
            {tren.seasons && (
              <div className="seasonssection">
                <h1>Seasons</h1>

                <div className="seasonsarray">
                  <Swiper
                    spaceBetween={0}
                    modules={[Navigation, Scrollbar]}

                    slidesPerView={
                      tren.seasons.length > 5 ? 5 : tren.seasons.length
                    }
                    scrollbar={{ draggable: true }}

                    navigation={{
          nextEl: "swiper-button-next",
          prevEl: "swiper-button-prev",
        }}
        className="seasons123swiper"
                  >
                            <div className="swiper-button-prev" >
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
          </div>
                    {console.log(tren.seasons.length - 1)}
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
            <div className="boxofstuff">
              <div className="twentypercent"></div>
              {media1 && (
                <div className="wholemedia">
                  <div className="mediasection">
                    <div id="mediapointer">Media</div>
                    <div className="mediainner">
                      <div className="arrayofimgsback">
                        {media1.map((item, index) => (
                          <img
                            id="imgs"
                            src={`https://image.tmdb.org/t/p/w533_and_h300_bestv2${item}`}
                            onClick={(event) => {
                             // expandandcenter(index);
                              //zoom in effect now is reduntant cause expandcenter func exists
                              const newTransform = isScaled
                            ? "scale(1)"
                            : "scale(1.5)";
                          const zindex = isScaled ? 1 : 5;
                          event.currentTarget.style.transform = newTransform;
                          event.currentTarget.style.zIndex = zindex;

                          setIsScaled(!isScaled);
                            }}
                          />
                        ))}
                        <div
                          className="swiper-button-next-media"
                          onClick={() => {
                            navigate(`/media?id=${id}&m=${paramValue}`);
                            console.log("ckuc");
                          }}
                        >
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
                        {/*<div
                      className="misvg"
                      
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
                    */}
                      </div>

                      <div className="keysandcredits">
                        {keywords && (
                          <div className="keywords">
                            {keywords.map(
                              (item, index) =>
                                index < 25 && (
                                  <div
                                    onClick={() =>
                                      navigate(
                                        `/searchbykeyword?id=${item.id}&name=${item.name}`
                                      )
                                    }
                                  >
                                    {item.name}
                                  </div>
                                )
                            )}
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
                  <div className="containsiframs_credits">
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
                         
                        </>
                      ) : (
                        <div id="novideos" style={{ color: "white" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="54" viewBox="0 -960 960 960" width="54"><path d="M558-84q-15 8-30.5 2.5T504-102l-60-120q-8-15-2.5-30.5T462-276q15-8 30.5-2.5T516-258l60 120q8 15 2.5 30.5T558-84Zm240 0q-15 8-30.5 2.5T744-102l-60-120q-8-15-2.5-30.5T702-276q15-8 30.5-2.5T756-258l60 120q8 15 2.5 30.5T798-84Zm-480 0q-15 8-30.5 2.5T264-102l-60-120q-8-15-2.5-30.5T222-276q15-8 30.5-2.5T276-258l60 120q8 15 2.5 30.5T318-84Zm-18-236q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z"/></svg>
                        </div>
                      )}
                    </div>
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
                                      <div>{item.name == 'Ryan Gosling' ? 'Ryan Gosling  (me)' : item.name}</div>
                                      <div>{item.character}</div>
                                    </div>
                                  </div>
                                )
                            )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>{" "}
              </div>
              (
              {reviews.results && reviews.results.length > 0 && (
                <div className="Revsec">
                  <h1>Reviews</h1>
                  <div className="revsvg">
                  <Review reviews={reviews} />      
            </div>
                </div>
              )}
            </div>
            )
            {recomds.results && recomds.results.length > 0 && <div className="recomds">
              <div id="remdstext">Recommendations</div>
              <div className="recommds_listwrapper">
<div className="recommds_list">
              {recomds.results && recomds.results.length > 0 ? (
                <List tren={recomds} movies={paramValue} />
              ) : (
                <div style={{ color: "white", fontFamily: "sans-serif", position:'absolute' }}>
                  No Recommendations available for this one
                </div>
              )}
              </div>
              </div>
            </div>}
          </div>
        </>
      )}
    </>
    </GoogleOAuthProvider>

  );
}
