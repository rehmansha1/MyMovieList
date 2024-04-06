import React, { useEffect, useState } from "react";
import axios from "axios";
import Switchbutton from "../components/Switchbutton";
import { gsap } from "gsap";

export default function MoreImagesP() {
  const [result, setresult] = useState();
  const [overlay, setoverlay] = useState(false);
  const [indexforimg, setindexfimg] = useState("nothing");

  const [bt, setbtstate] = useState("movies");
  const urlParams = new URLSearchParams(window.location.search);
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

  useEffect(() => {
    fetchData();
  }, []);

  const gimg = document.querySelectorAll(".gimg");
  useEffect(() => {
    const arryofimgs = document.querySelectorAll(".gimg");
    arryofimgs.forEach((value, index) => {
      value.style.animation = `fadein12 1s both ${index / 10}s`;
    });
  }, [gimg]);
  function expandandcenter(index) {
    let arryofimgs = document.querySelectorAll(".gimg");
    if (arryofimgs.length == 0) {
      arryofimgs = document.querySelectorAll(".gimg1");
    }
    arryofimgs.forEach((value, index) => {
      arryofimgs[index].classList.toggle("gimg");
      arryofimgs[index].classList.toggle("gimg1");
    });

    const newOverlay = !overlay;
    setoverlay(newOverlay);
    const target = document.getElementById("overlayp99");
    target.style.opacity = newOverlay ? "1" : "0";
    target.style.scale = newOverlay ? "1" : "0.8";
    target.style.pointerEvents = newOverlay ? "all" : "none";
    setindexfimg(newOverlay && index >= 0 ? index : "nothing");
  }
  return (
    <div className="mmpage">
      <div id="mediapagetitle">
        <div>media</div>
        <Switchbutton images={"true"} setbtstate={setbtstate} />
      </div>

      <div className="overlaypart99" id="overlayp99">
        <div id="closepart99">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="cp99svg"
            onClick={expandandcenter}
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
            result && indexforimg >= 0
              ? bt == "movies"
                ? `https://image.tmdb.org/t/p/original${result.backdrops[indexforimg].file_path}`
                : `https://image.tmdb.org/t/p/original${result.posters[indexforimg].file_path}`
              : null
          }
        />
      </div>
      {result && bt == "movies" && (
        <div className="mediaarraybox">
          {result.backdrops.map((item, index) => (
            <img
              className="gimg"
              onClick={() => expandandcenter(index)}
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
              onClick={() => expandandcenter(index)}
              src={`https://media.themoviedb.org/t/p/w220_and_h330_face${item.file_path}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
