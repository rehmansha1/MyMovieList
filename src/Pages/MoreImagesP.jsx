import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MoreImagesP() {
  const [result, setresult] = useState();
  const [overlay, setoverlay] = useState(false);
  const [indexforimg, setindexfimg] = useState('nothing');


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
  function expandandcenter(index) {
    const newOverlay = !overlay;
    setoverlay(newOverlay);
        const target = document.getElementById("overlayp99");
    target.style.opacity = newOverlay ? '1' : '0';
    target.style.scale = newOverlay ? '1' : '0.8';
    target.style.pointerEvents = newOverlay ? 'all' : 'none';
    setindexfimg(newOverlay && index >= 0 ? index : 'nothing');

  }
  return (
    <div className="mmpage">
      <div id="mediapagetitle">media</div>
      <div className="overlaypart99" id="overlayp99">
        <div id="closepart99">
        <svg xmlns="http://www.w3.org/2000/svg" id="cp99svg" onClick={expandandcenter} height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></div>
       
       <img id="imginnerofoverlay" src={result && indexforimg>=0 ? `https://image.tmdb.org/t/p/original${result.backdrops[indexforimg].file_path}` : null}/>
      </div>
      {result && (
        <div className="mediaarraybox">
          {result.backdrops.map((item, index) => (
            <img
              className="gimg"
              onClick={()=>expandandcenter(index)}
              src={`https://image.tmdb.org/t/p/original${item.file_path}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
