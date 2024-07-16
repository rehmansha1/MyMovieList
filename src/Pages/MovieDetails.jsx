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
import SearchComponent from '../components/SearchComponent';

import "swiper/css";
import GBTT from "../components/GBTT";
import LogOutbt from "../components/LogOutbt";
import AddNewPlaylist from "../components/AddNewPlaylist";
import AddToExistingPlaylist from "../components/AddToExistingPlaylist";
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
  const [boxOfExistAdd,setboxOfExistAdd] = useState(false);
  const [credits, setcredits] = useState([]);
  const [video, setvideo] = useState();
  const [rt, setrt] = useState();
  const [sentreview, setsentreview] = useState(false);
  const [imageUrl, setimageurl] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [reviewbox,setreviewbox] = useState(false);
  const [isPC, setPC] = useState(true);
  const [overlaysearch, setoverlaysearch] = useState(false);
  const [searchList, setsl] = useState("");
  const [movieName, setMovieName] = useState("");
  const [boxofchoiceopen,setboxofchoiceopen] = useState(false);
  const [npl,setnpl] = useState('');
  const [set,setset] = useState({});
  const [boxtoaddplaylist,setboxtoaddplaylist] = useState(false);
  const [boxtoaddplaylist1,setboxtoaddplaylist1] = useState(false);
  const [playlist,setplaylist] = useState([])
  const [nametemp,setnametemp] = useState(null)
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because getMonth() returns zero-based month (0 for January, 11 for December)
  const day = currentDate.getDate().toString().padStart(2, "0");
  const ymd = `${year}${month}${day}`;
  const { id } = useParams();
  const [isLogged,setIsLogged] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  
  let paramValue = urlParams.get("m");
  function checkCookie(name) {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");

      const trimmedCookieName = cookieName.trim();

      if (trimmedCookieName === name) {
        return true; // Cookie found
      }
    }

    return false; // Cookie not found
  }
  const sendingplaylistname = async () => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    console.log(paramValue)
    const resp = await axios.post("https://mymovielistserver.onrender.com/sendplaylistnew", {
      username,
      playlistname: npl,
      id: set.id,
      url: set.url,
      title: set.name,
      movie:paramValue,
    });
    if(resp){
      document.getElementById("boxofplaylist").style.animation =
                "downdown 0.5s both ";
              document.getElementById("glassoverlay").style.animation =
                "transistionforglassbackup 0.5s  both";
              setTimeout(() => {
                setboxtoaddplaylist(false);
              }, 500);
              setTimeout(async() => {
                const responseofpl = await axios.post(
                  `https://mymovielistserver.onrender.com/getplaylist`,
                  { username }
                );
                setplaylist(responseofpl.data);
            
              }, 500);
    }
  };

  const printstars = (ratings) => {
    const stars = [];

    for (let i = 0; i < ratings; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill="gold"
          height="20"
          viewBox="0 -960 960 960"
          width="20"
        >
          <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
        </svg>
      );
    }

    return stars;
  };
  const sendtodb = async (id, name, date) => {
    try {
      const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
      if (username) {
        const resp = await axios.post(
          "https://mymovielistserver.onrender.com/putnotifylist",
          {
            username,
            name: name,
            id: id,
            date: date,
          }
        );
        //console.log(resp.data);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    gsap.to(".options", { duration: 0.5, top: 20 });
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setPC(window.innerWidth > 767 ? true : false);
    };
    window.addEventListener("resize", handleResize);

    handleResize();
   // console.log(isPC);
  }, [window.innerWidth]);
  const handleImageLoad = () => {
    setImageLoaded(true);
    document.getElementById('nameortitle').click()
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
  const [text1, setText] = useState("");
  const [stars, setstars] = useState();
  const [reviewarray, setreviewarray] = useState([]);

  const handleChange = (event) => {
    setText(event.target.value);
  };
  const sendcompletedidtodb = async (arrayImgNameId, inputText, starsvalue) => {
    const urlformovies = "https://mymovielistserver.onrender.com/completed/movies";
    const urlforseries = "https://mymovielistserver.onrender.com/completed/series";
   document.getElementById('innerbbimgbox').style.opacity =0;
   document.getElementById('restbbbox').style.opacity =0; 
    document.getElementById('goingtosend').style.opacity = 1;
    document.getElementById('goingtosend').style.zIndex = 1;
    const options = {
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
      },
    };
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);

    const url = paramValue == "true" ? urlformovies : urlforseries;
    try {
      const response = await axios.post(url, {
        username: username,
        imageurl: arrayImgNameId[0],
        name: arrayImgNameId[1],
        id: arrayImgNameId[2],
        review: inputText,
        stars: starsvalue,
      });
      setsentreview(response.data);
      
       setTimeout(() => {
        document.getElementById('alreadywatched').click()
       }, 1500); 
  
      //console.log(response);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const sendPublicReview = async (arrayImgNameId, inputText, starsvalue) => {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
      },
    };
    try {
      const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);

      const response = await axios.post(
        "http://localhost:3001/putPublicReview",
        {
          id: arrayImgNameId[2],
          name: username,
          review: inputText,
          stars: starsvalue,
          movie: paramValue,
        }
      );
      //console.log(response.data);
      return response;
    } catch (error) {
      console.error("error:", error);
    }
  };
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
      //console.log(tren);
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

     // console.log(videosres.data.results[1].key);
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
      if (username) {
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
        setTimeout(() => {
          document.getElementById("remindnotifycard").style.top = "-10%";
        }, 1500);
      } else {
        document.getElementById("remindnotifycard").innerHTML =
          "You are not Logged in";

        document.getElementById("remindnotifycard").style.top = "5%";
        setTimeout(() => {
          document.getElementById("remindnotifycard").style.top = "-10%";
        }, 1500);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const putInDbSeries = async (id, url, name) => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);

    try {
      if (username) {
        const resp = await axios.post(
          "https://mymovielistserver.onrender.com/putIDSeries",
          {
            username,
            id: id,
            url: url,
            name: name,
          }
        );
      //  console.log(resp);
        document.getElementById(
          "remindnotifycard"
        ).innerHTML = `${resp.data.message}`;
        document.getElementById("remindnotifycard").style.top = "5%";
        setTimeout(() => {
          document.getElementById("remindnotifycard").style.top = "-10%";
        }, 1500);
      } else {
        document.getElementById("remindnotifycard").innerHTML =
          "You have not Logged in";

        document.getElementById("remindnotifycard").style.top = "5%";
        setTimeout(() => {
          document.getElementById("remindnotifycard").style.top = "-10%";
        }, 1500);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    setIsLogged(  getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`) );
  },[]);
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

 /* useEffect(() => {
    gsap.to(".recommds_list > div", {
      scrollTrigger: { trigger: ".recommds_list > div" },
      opacity: 1,
      duration: 0.1,
      stagger: 0.1,
    });
  }, );*/
  const RecomImgs  = [document.querySelectorAll(".recommds_list > div")]
  useEffect(() => {

    const images = gsap.utils.toArray(".recommds_list > div");
    images.forEach((image) => {
      gsap.to(image, {
        opacity: 1,
        scale: 1,
        duration: 0.1,
        scrollTrigger: {
          trigger: image,
          start: "top 100%", // Start the animation when the top of the image reaches 80% of the viewport height
          toggleActions: "play none none none", // Actions for enter, leave, enter back, and leave back
        },
      });
    });
  }, [RecomImgs]);
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












/* seach component's components */



 const handleInputChange = (event) => {
  setMovieName(event.target.value);
  if (document.getElementById("oy").style.height == "110vh") {
    document.getElementById("nextsymbol").style.rotate = "0deg";
  }
 // console.log(document.getElementById("oy").style.height);
};


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
    setTimeout (()=>setsl(response.data),500)
  } catch (error) {
    console.error("error:", error);
  }
};






const [movies, setmovies] = useState("true");
useEffect(() => {
  gsap.fromTo(
    ".searchdisplay",
    { opacity: 0 },
    { opacity: 1, duration: 0.5, delay: 0.5 }
  );
}, [searchList]);

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
  }, [overlaysearch]);


/* end of search component's components */


/* new add playlist box funcs */
 const choiceofboxclose =()=>{
  document.getElementById('mdpl12').style.animation  = 'upupupup13 0.4s both';
 }
const glassOut = ()=>{
  document.getElementById("glassoverlay").style.animation =
  "transistionforglassbackup 0.5s  both";
}

/* end of new add playlist box funcs */
/* add to existing playlist */
const addtoexistinglist = async () => {
  const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
  const resp = await axios.post(
    "https://mymovielistserver.onrender.com/addtoexistingplaylist",
    {
      username,
      playlistname: nametemp,
      id: set.id,
      url: set.url,
      title: set.name,
      movie:paramValue
    }
  );
  if (resp){
    document.getElementById("boxofplaylist1").style.animation =
    "downdown 0.5s both ";
   document.getElementById("glassoverlay").style.animation =
    "transistionforglassbackup 0.5s  both";
   
    setTimeout(() => {
    setboxtoaddplaylist1(!boxtoaddplaylist1);
   }, 500);
   
  }
};
const gettingUserplaylists =async()=>{
  const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
const res = await axios.post(
  `https://mymovielistserver.onrender.com/getplaylist`,
  { username }
);
setplaylist(res.data)
console.log(res);}
/* end of add to existing playlist */
const md = true
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLEID_KEY_ENV}>
      <>
      {(boxtoaddplaylist || boxofchoiceopen || boxtoaddplaylist1  ) && (
        <div className="overlay3213123" id="glassoverlay"></div>
      )}
    { boxofchoiceopen &&
      <div className="mdplaylist" id="mdpl12">
        <h1>Add To a playlist?</h1>
        <div className="choicebox"onClick={()=>{
          choiceofboxclose();
          glassOut();
          setTimeout(()=>{setboxofchoiceopen(false); },400)}}>x</div>
     <div className="mdpltwo">
        <div onClick={()=>{
          choiceofboxclose();
          setTimeout(()=>{setboxofchoiceopen(false); setboxtoaddplaylist1(true); gettingUserplaylists()} ,400)}}>existing playlist</div>
        <div onClick={()=>{
          choiceofboxclose();          
          setTimeout(()=>{setboxofchoiceopen(false); setboxtoaddplaylist(true);} ,400)}}>Add to new playlist</div>
      </div>
      </div>
    }
    {
<AddToExistingPlaylist md={md} nametemp={nametemp} boxtoaddplaylist1={boxtoaddplaylist1} setboxtoaddplaylist1={setboxtoaddplaylist1} set={set} playlist={playlist} setnametemp={setnametemp} addtoexistinglist={addtoexistinglist}  />
    }
    {
      <AddNewPlaylist md={md} boxtoaddplaylist={boxtoaddplaylist} setboxtoaddplaylist={setboxtoaddplaylist} set={set} setnpl={setnpl} npl={npl} sendingplaylistname={sendingplaylistname} />
    }
      <div className="overlay" id="oy">
      {overlaysearch && 
      <SearchComponent movieName ={movieName} handleInputChange ={handleInputChange} searchList={searchList} setsl={setsl} searchmovies={searchmovies} List = {List} movies={movies} setmovies={setmovies} overlaysearch = {overlaysearch} setoverlaysearch ={ setoverlaysearch} MovieDetailSearch={true} />
      }
      
      </div>
      {tren && !searchList && (
          <>
            <div id="remindnotifycard">
              {checkCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`)
                ? "we will remind you when this movie releases"
                : "You are not Logged in"}{" "}
            </div>
            {imageUrl &&
            <div className="overlaypart99" id="overlayp99">
              <div id="closepart99" onClick={expandandcenter}>
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
            }
              <img
                id="imginnerofoverlay"
                src={
                  media1 && indexforimg >= 0
                    ? `https://image.tmdb.org/t/p/original${media1[indexforimg]}`
                    : null
                }
              />
            </div>
        }
            <div
              className="wholedivofmoviedetes"
              style={{ display: imageLoaded ? "block" : "none" }}
            >
              <div className="header1">
                <img
                  src={logo}
                  id="logo1"
                  onClick={() => {
                    document.getElementById("logo1").style.top = "-200px";
                  }}
                />

                <div
                  className="options"
                  id="option"
                  style={{ top: "20px" }}
                  onClick={() => {
                    /* const c = document.getElementById("menu");
                c.style.width = "20vw";
                setmenu(true); */
                    setmenu(!menu);
                    let value = !menu;
                    const c = document.getElementById("opexpan");
                    c.style.width = value ? "300px" : "0px";
                    const d = document.querySelectorAll("#opexpan > svg");
                      d.forEach((item)=>item.style.pointerEvents =  value ? 'all' : 'none')
                      
                  }}
                >
                  <div className="opexpand" id="opexpan">
                  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          setmenu(false);

           
                          setoverlaysearch(true);
                          const c = document.getElementById("oy");
                          //console.log(c)
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
                      fill="white"
                      onClick={() => navigate("/")}
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z" />
                    </svg>

                   
                    {isLogged && (
                      
                      <svg onClickCapture={()=>navigate('/useraccount')} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/></svg>

                      )}
                      {isLogged ? <LogOutbt fill={'white'} /> : <GBTT />}
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
              {isPC && (
                <div className="detes">
                  <div>

                    <h1  id="nameortitle" onClick={()=>document.title=`${tren.name || tren.title}`}>{tren.name || tren.title}</h1>
                    <div className="detesdetes1">
                      {tren && (
                        <div id="imdbrating">
                          <img src={imdb} />
                          <div>
                            {tren.vote_average.toFixed(1) > 0.1
                              ? tren.vote_average.toFixed(1)
                              : "not rated "}
                          </div>
                        </div>
                      )}
                      <div id="randommyear">
                        {" "}
                        {tren.release_date
                          ? tren.release_date.slice(0, 4)
                          : "Seasons: " + tren.number_of_seasons}{" "}
                      </div>
                      {paramValue == "true" &&
                        parseInt(tren.release_date.split("-").join("")) <
                          parseInt(ymd) && (
                          <div id="randomm18">
                            {tren.release_date ? NumToTime(tren.runtime) : null}
                          </div>
                        )}
                      {((paramValue == "true" &&
                        parseInt(tren.release_date.split("-").join("")) <
                          parseInt(ymd)) ||
                        paramValue == "false") && (
                        <>
                          <div id="alreadywatched"   onClick={() => {
                            setreviewbox(!reviewbox);
                                setreviewarray([
                                  `${tren.poster_path || tren.URL}`,
                                  tren.title || tren.name,
                                  tren.id,
                                ]);
                                const blackbox =
                                  document.getElementById("blackboxiga");
                                blackbox.classList.toggle("blackrevbox");
                              }}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                            
                              fill="white"
                              height="24"
                              viewBox="0 -960 960 960"
                              width="24"
                            >
                              <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                            </svg>
                          </div>
                          
                          <div id="blackboxiga">
                            {!rt && !sentreview && (
                              <>
                                {" "}
                                <div id="innerbbimgbox">
                                  <img
                                    id="innerbbimg"
                                    src={`https://image.tmdb.org/t/p/w220_and_h330_face/${tren.poster_path}`}
                                  />
                                </div>
                                <div id="restbbbox">
                                <div id="closeinfinite" onClick={()=>{document.getElementById('alreadywatched').click(); glassOut()} }>X</div>
                                  <div id="titleofrevbox">
                                    {tren.name || tren.title}
                                  </div>
                                  <textarea
                                    id="textareaofrevbox"
                                    placeholder="Add a review"
                                    value={text1}
                                    onChange={handleChange}
                                  ></textarea>
                                  <div id="tagsbbox">
                                    <div>Tags</div>
                                    <textarea
                                      id="textareaofrevbox2"
                                      placeholder="eg: Netflix"
                                    ></textarea>
                                  </div>
                                  <div className="ratinguserinner">
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
                                  <div></div>
                                  <div
                                    id="submitbtrevbox2"
                                    onClick={() => {
                                      sendcompletedidtodb(
                                        reviewarray,
                                        text1,
                                        stars
                                      );
                                    }}
                                  >
                                    <svg
                                      fill="white"
                                      xmlns="http://www.w3.org/2000/svg"
                                      height="24"
                                      viewBox="0 -960 960 960"
                                      width="24"
                                    >
                                      <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                                    </svg>
                                  </div>
                                </div>
                              </>
                            )}
                            {!sentreview &&<div id="goingtosend"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg></div>}
                            {sentreview && <div id="checkbox"><svg xmlns="http://www.w3.org/2000/svg" height="74px" viewBox="0 -960 960 960" width="74px" fill="#e8eaed"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>{sentreview}</div>}
                          </div>
                        </>
                      )}
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
                      {
                        <div
                          id="watchbt"
                          onClick={() => {
                            if (tren.name) {
                              putInDbSeries(
                                tren.id,
                                tren.poster_path,
                                tren.name
                              );
                            }
                            if (tren.title) {
                              putInDbMovies(
                                tren.id,
                                tren.poster_path,
                                tren.title
                              );
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
                      {
                        <div
                          id="splaybt"
                          onClick={() => {
                            setboxofchoiceopen(true)
                            
                            setset({
                                id: tren.id,
                                url: tren.poster_path || tren.URL,
                                name: tren.title || tren.name,
                              });
                               document.getElementById("glassoverlay").style.animation =
      "transistionforglassbackup 0.5s  both";
                          }}

                        >
                          <svg
                            fill="white"
                            id="splaybtsvg"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                          >
                            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                          </svg>{" "}
                         playlist
                        </div>
                      }
                      {paramValue == "true" &&
                        parseInt(tren.release_date.split("-").join("")) >
                          parseInt(ymd) && (
                          <div
                            id="remindmebt"
                            onClick={() => {
                              document.getElementById(
                                "remindnotifycard"
                              ).style.top = "5%";
                              setTimeout(() => {
                                document.getElementById(
                                  "remindnotifycard"
                                ).style.top = "-10%";
                              }, 1500);
                              sendtodb(tren.id, tren.title, tren.release_date);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 -960 960 960"
                              width="24px"
                              fill="#e8eaed"
                            >
                              <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
                            </svg>
                            Remind me
                          </div>
                        )}
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
                        ? tren.results[randomNumber[index]].release_date.slice(
                            0,
                            4
                          )
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
              {tren.seasons && (
                <div className="seasonssection">
                  <h1 >Seasons</h1>

                  <div className="seasonsarray">
                    <Swiper
                      spaceBetween={0}
                      modules={[Navigation, Scrollbar]}
                      slidesPerView={
                        tren.seasons.length > 10 ? 5 : tren.seasons.length 
                      
                      }
                      scrollbar={{ draggable: true }}
                      navigation={{
                        nextEl: "swiper-button-next",
                        prevEl: "swiper-button-prev",
                      }}
                      className="seasons123swiper"
                    >
                      <div className="swiper-button-prev">
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
                      <div className="swiper-button-next">
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
                      {/*console.log(tren.seasons )*/}

                      {tren.seasons.map((item, index) => {
                        return ( 
                           (
                            <SwiperSlide>
                              <div>
                                {" "}
                                {item.poster_path ? <img
                                  className="saimgs"
                                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`  }
                                /> : <div className="notimgs"><svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="white"
                              height="54"
                              viewBox="0 -960 960 960"
                              width="54"
                            >
                              <path d="M558-84q-15 8-30.5 2.5T504-102l-60-120q-8-15-2.5-30.5T462-276q15-8 30.5-2.5T516-258l60 120q8 15 2.5 30.5T558-84Zm240 0q-15 8-30.5 2.5T744-102l-60-120q-8-15-2.5-30.5T702-276q15-8 30.5-2.5T756-258l60 120q8 15 2.5 30.5T798-84Zm-480 0q-15 8-30.5 2.5T264-102l-60-120q-8-15-2.5-30.5T222-276q15-8 30.5-2.5T276-258l60 120q8 15 2.5 30.5T318-84Zm-18-236q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z" />
                            </svg></div>
                            }
                                <div className="saih1">{item.name? item.name:'null'}</div>
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
                                event.currentTarget.style.transform =
                                  newTransform;
                                event.currentTarget.style.zIndex = zindex;

                                setIsScaled(!isScaled);
                              }}
                            />
                          ))}
                          <div
                            className="swiper-button-next-media"
                            onClick={() => {
                              navigate(`/media?id=${id}&m=${paramValue}`);
                             // console.log("ckuc");
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
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="white"
                              height="54"
                              viewBox="0 -960 960 960"
                              width="54"
                            >
                              <path d="M558-84q-15 8-30.5 2.5T504-102l-60-120q-8-15-2.5-30.5T462-276q15-8 30.5-2.5T516-258l60 120q8 15 2.5 30.5T558-84Zm240 0q-15 8-30.5 2.5T744-102l-60-120q-8-15-2.5-30.5T702-276q15-8 30.5-2.5T756-258l60 120q8 15 2.5 30.5T798-84Zm-480 0q-15 8-30.5 2.5T264-102l-60-120q-8-15-2.5-30.5T222-276q15-8 30.5-2.5T276-258l60 120q8 15 2.5 30.5T318-84Zm-18-236q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z" />
                            </svg>
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
                                        <div>
                                          {item.name == "Ryan Gosling"
                                            ? "Ryan Gosling  (me)"
                                            : item.name}
                                        </div>
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
              {recomds.results && recomds.results.length > 0 && (
                <div className="recomds">
                  <div id="remdstext">Recommendations</div>
                  <div className="recommds_listwrapper">
                    <div className="recommds_list">
                      {recomds.results && recomds.results.length > 0 ? (
                        <List tren={recomds} movies={paramValue} />
                      ) : (
                        <div
                          style={{
                            color: "white",
                            fontFamily: "sans-serif",
                            position: "absolute",
                          }}
                        >
                          No Recommendations available for this one
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </>
    </GoogleOAuthProvider>
  );
}
