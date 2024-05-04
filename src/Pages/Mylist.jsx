import React, { useEffect, useState } from "react";
import List from "../components/List";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import Switchbutton from "../components/Switchbutton";

export default function Mylist() {
  const [movies, setmylist] = useState({ results: [] });
  const [series, setseries] = useState({ results: [] });
  const [completed,setcompleted] = useState(false);
  const [completedContents,setcc] = useState();

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
      console.log(response);
      const newData = response.data[0].Movies;
      const newData1 = response.data[0].Series;

setcc(response)
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
    gsap.to('.ov1box > div',{ opacity:1,duration:0.5,stagger:0.1})

  }, [document.querySelectorAll('.ov1box > div')]);

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

          <div className="overlay1inner">
            <div className="ov1ih1">
         
             <div  className="mylisth1"   style={{color: 'white', top:  movies .results[0]|| series.results[0] ? '0px' : '-200px' }}>My List</div>


              <div className="boxwithx">
              <div id="btswithces"  style={{top:  movies .results[0]|| series.results[0] ? '0px' : '-200px' }}>
              <Switchbutton setbtstate={setbtstate}  />
              </div>
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  navigate("/");
                }}
                id="closemylist"
                fill="white"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
              </div>
            </div>
            {!completed && 
            <div className="ov1box" style={{ opacity: "1" }}>
            {movies .results[0]|| series.results[0] ? 
            <>
              {btstate=='movies' && <List tren={movies} mylist={true} deleteindb={deleteindb} movies={'true'}/>}
              {btstate=='series' && <List tren={series} mylist={true} deleteindb={deleteindb} movies={'false'}/>}
             </>
             : 
             <div id="svgrotate"><svg xmlns="http://www.w3.org/2000/svg" fill="white" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg>
             <div id="quotes-under-svg">some badass quote</div></div>}
            </div>
            }
            {
              completed &&
              <>
               {
                btstate == 'movies' && 
                completedContents.data[0].Completed.movies.map((item,index)=>{
                  return(
                 <div className="userReviews">
                 <div className="userRevImageCon">
                  <img id="userRevImageUrl" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.imageurl}`}/>
                  </div>
                  <div className="userRevDetes">
                  <div>{item.name}</div>
                  <div>{item.stars}</div>
                  <div>{item.review}</div>
                 </div>
                 </div>
                 )})
               }
               {
                btstate == 'series' && 
                completedContents.data[0].Completed.series.map((item,index)=>{
                  return(
                 <div className="userReviews">
                 <div className="userRevImageCon">
                  <img id="userRevImageUrl" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.imageurl}`}/>
                  </div>
                  <div className="userRevDetes">
                  <div>{item.name}</div>
                  <div>{item.stars}</div>
                  <div>{item.review}</div>
                 </div>
                 </div>
                 )})
               }
              </>
            }
          </div>
        </>
      )}
    </>
  );
}
