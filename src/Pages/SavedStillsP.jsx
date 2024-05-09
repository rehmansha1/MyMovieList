import axios from "axios";
import React, { useEffect, useState } from "react";

export default function SavedStillsP() {
  const [result, setresult] = useState([]);
  const [overlay, setoverlay] = useState(false);
  const [indexforimg, setindexfimg] = useState(0);

  function getCookie(cookieName) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, encodedValue] = cookie.split("=");
      if (name === cookieName) {
        const decodedValue = decodeURIComponent(encodedValue);

        try {
          return JSON.parse(decodedValue);
        } catch (error) {
          return decodedValue;
        }
      }
    }

    return null;
  }
  function expandandcenter(index) {
    const newOverlay = !overlay;
    setoverlay(newOverlay);
    const target = document.getElementById("overlayp99");
    target.style.opacity = newOverlay ? "1" : "0";
    target.style.scale = newOverlay ? "1" : "0.8";
    target.style.pointerEvents = newOverlay ? "all" : "none";
    setindexfimg(newOverlay && index >= 0 ? index : 'none');
   
  }
  const getUserStills = async () => {
    try {
      const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
      if (username) {
        const encodedUsername = encodeURIComponent(username);
        const response = await axios.get(
          `http://localhost:3001/getstillslist?username=${encodedUsername}`
        );
        console.log(response.data);
        setresult(response.data);
      } else {
        console.log("username is empty");
      }
    } catch (Error) {
      console.log("Error from savedstills", Error);
    }
  };
  useEffect(() => {
    getUserStills();
  }, []);
  return (
    <div>
    {result && 
    <>
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
       

        
      </div>

      <div className="mmpage1">
        <div className="mediaarraybox">
          {result && result.map((item, index) => (
            <img
              onClick={() => expandandcenter(index)}
              key={index}
              className="gimg"
              src={item.imageUrl}
              alt={`Image ${index}`}
            />
          ))}
        </div>
      </div>
      </>
    }
    </div>

  );
}
