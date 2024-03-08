import React, { useEffect, useState } from "react";
import List from "../components/List";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import Switchbutton from "../components/Switchbutton";

export default function Mylist() {
  const [movies, setmylist] = useState({ results: [] });
  const [series, setseries] = useState({ results: [] });

  //const [userName, setusername] = useState("Rehman");
  const [btstate, setbtstate] = useState("movies");

  const navigate = useNavigate();

  const getUserMovies = async () => {
    try {
 const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
 if(username){
 const encodedUsername = encodeURIComponent(username);
      const response = await axios.get(
        `https://mymovielistserver.onrender.com/getIDS?username=${encodedUsername}`
      );
      
      const newData = response.data[0].Movies;
      const newData1 = response.data[0].Series;
      setseries({ results: newData1 });
      setmylist({ results: newData });}

      // await mylistimpl(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
  const deleteindb = async (id) => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    try {
      const resp = await axios.delete("https://mymovielistserver.onrender.com/delete", {
        data: {
          username,
          id: id,
          type:btstate,
        },
      });
      console.log(resp.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserMovies();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    gsap.from('.ov1box',{opacity:0,duration:1});
  }, []);

  return (
    <>
      {movies && (
        <>
<div id="">
     </div>
          <div className="overlay1inner">
            <div className="ov1ih1">
              <div style={{ color: "white" }}>My List</div>
              <div className="boxwithx">
              <Switchbutton setbtstate={setbtstate} />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  navigate("/");
                }}
                fill="white"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
              </div>
            </div>
            <div className="ov1box" style={{ opacity: "1" }}>
              {btstate=='movies' && <List tren={movies} mylist={true} deleteindb={deleteindb} movies={'true'}/>}
              {btstate=='series' && <List tren={series} mylist={true} deleteindb={deleteindb} movies={'false'}/>}
            </div>
          </div>
        </>
      )}
    </>
  );
}
