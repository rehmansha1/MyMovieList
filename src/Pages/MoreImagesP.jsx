import React, { useEffect, useState } from "react";
import axios from "axios";
import Switchbutton from "../components/Switchbutton";
import { gsap } from "gsap";
import Uppercard from "../components/Uppercard";

export default function MoreImagesP() {
  const [result, setresult] = useState();
  const [overlay, setoverlay] = useState(false);
  const [indexforimg, setindexfimg] = useState("nothing");
  const [liked, setliked] = useState(false);
  const [imageurl, setimageurl] = useState('');
  const [bt, setbtstate] = useState("movies");
  const urlParams = new URLSearchParams(window.location.search);
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
  const fetchData = async () => {
    const url = `https://api.themoviedb.org/3/${
      urlParams.get("m") == "true" ? "movie" : "tv"
    }/${urlParams.get("id")}/images`;
    const options = {
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
      },
    };
    try {
      const response1 = await axios.get(url, { ...options });

      setresult(response1.data);
      console.log(response1.data);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const putLike = async (imageUrl) => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    const id = urlParams.get('id')
    const movie = urlParams.get('m')
    if (username) {
      try {
        const resp = await axios.post(
          "https://mymovielistserver.onrender.com/putstill",
          { username,id,movie, imageUrl }
        );
        console.log(resp.data.message);

        if (
          resp.data.message == "Added to your liked stills" ||
          "already exists"
        ) {
          setliked(!liked);
          document.getElementById("remindnotifycard").innerHTML =
          `${resp.data.message}`;
        document.getElementById("remindnotifycard").style.top = "5%";
        setTimeout(() => {
          document.getElementById("remindnotifycard").style.top = "-10%";
        }, 1500);
        }
      } catch {
        console("Error from putLike", error);
      }
    } else {
      console.log("username is empty");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const gimg = document.querySelectorAll(".gimg");
  useEffect(() => {
    const arryofimgs = document.querySelectorAll(".gimg");
    arryofimgs.forEach((value, index) => {
      const delay = index * 0.1;

      value.style.animation = `scaleIn 1s both ${delay}s`;
    });
  }, [gimg]);

  function expandandcenter(index) {
    const newOverlay = !overlay;
    setoverlay(newOverlay);
    const target = document.getElementById("overlayp99");
    target.style.opacity = newOverlay ? "1" : "0";
    target.style.scale = newOverlay ? "1" : "0.8";
    target.style.pointerEvents = newOverlay ? "all" : "none";
    setindexfimg(newOverlay && index >= 0 ? index : "nothing");
    let arryofimgs = document.querySelectorAll(".gimg");
    if (arryofimgs.length == 0) {
      arryofimgs = document.querySelectorAll(".gimg1");
    }
    arryofimgs.forEach((value, index) => {
      arryofimgs[index].classList.toggle("gimg");
      arryofimgs[index].classList.toggle("gimg1");
    });
  }
  return (
    <>
<Uppercard/>
      <div className="mmpage">
        <div id="mediapagetitle">
          <div>media</div>
          <Switchbutton images={"true"} setbtstate={setbtstate} />
        </div>
{imageurl &&
        <div className="overlaypart99" id="overlayp99">
          <div id="closepart99" onClick={()=>{document.getElementById('overlayp99').style.animation='scaleupreverse 0.5s both';setTimeout(()=>setimageurl(),500)}}>
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
          {!true && <div
            id="likepart99"
            onClick={() =>

              putLike(
               imageurl
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg "
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="black"
            >
              <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
            </svg>
          </div>}

          <img
            id="imginnerofoverlay"
            src={
      imageurl
            }
          />
        </div>
}
        {result && bt == "movies" && (
          <div className="mediaarraybox">
            {result.backdrops.map((item, index) => (
              <img
                className="gimg"
                onClick={() => setimageurl(`https://image.tmdb.org/t/p/original${item.file_path}`)}
                src={`https://image.tmdb.org/t/p/w533_and_h300_bestv2${item.file_path}`}
              />
            ))}
          </div>
        )}
        {result && bt == "series" && (
          <div className="mediaarraybox">
            {result.posters.map((item, index) => (
              <img
                className="gimg"
                onClick={() => setimageurl(`https://image.tmdb.org/t/p/original${item.file_path}`)}
                src={`https://media.themoviedb.org/t/p/w220_and_h330_face${item.file_path}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
