import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import Switchbutton from "../components/Switchbutton";

export default function CastDetes() {
  const urlParams = new URLSearchParams(window.location.search);
  let paramValue = urlParams.get("p");
  const [pt, setpt] = useState([]);
  const [pt1, setpt1] = useState([]);
  const [pt2, setpt2] = useState([]);
  const [btstate, setbtstate] = useState("movies");

  const navigate = useNavigate();

  const fetchData = async (id) => {
    const urlformovie = `https://api.themoviedb.org/3/person/${id}`;

    const options = {
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
      },
    };
    try {
      const response1 = await axios.get(urlformovie, { ...options });

      setpt(response1.data);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const fetchData1 = async (id) => {
    const urlformovie = `https://api.themoviedb.org/3/person/${id}/movie_credits        `;
const urlforseries = `https://api.themoviedb.org/3/person/${id}/tv_credits`;
    const options = {
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
      },
    };
    try {
      const response1 = await axios.get(urlformovie, { ...options });
      const response2 = await axios.get(urlforseries, { ...options });

      console.log(response1.data.cast);
      setpt1(response1.data.cast);
      setpt2(response2.data.cast)
    } catch (error) {
      console.error("error:", error);
    }
  };
  useEffect(() => {
    fetchData(paramValue);
    fetchData1(paramValue);
    console.log(pt2)
//gsap.from('#borderani',{width:0,duration:0.5})
  }, []);
  return (
    <>
    {pt.profile_path &&
      <div className="cwhole">
        <div className="castdetes">
          <div className="pptcover">
            <img
              id="pptprofile"
              src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${pt.profile_path}`}
            />


          </div>
          
          <div className="castnameandbio">
            <div className="ptname">{pt.name == 'Ryan Gosling' ? 'Ryan Gosling (Literally me)': pt.name}</div>
            <div className="ptbio">{pt.biography}</div>
          </div>
        </div>
        <div className="moviesacted">
        <div className="moviesseriesacted">
          <div className="mah1">{btstate == 'movies' ? 'Movies' : 'Series'} Acted</div>
   <Switchbutton setbtstate={setbtstate}/>
          </div>
          <div className="arrayofimgcast">
          <div className="arrayofimgcastinside">
            {btstate == 'movies' && pt1 &&
              pt1.sort((a,b)=>{
            return b.release_date.slice(0,4)  - a.release_date.slice(0,4)
              }  
              ).map(
                (item, index) =>
                  item.poster_path && (
                    <div key={index} className="divofwhole" onClick={()=>{navigate(`/detes/${item.id}?m=true`)}}>
                      <img

                        className="imgofcast1"
                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.poster_path}`}
                        alt={`Poster for ${item.id}`}
                      />
                      <div className="arr12345">
                      <div className="titleofcast">
                        {item.name && item.name.length >= 30
                          ? item.name.slice(0, 30) + "..."
                          : item.name}
                          {item.title && item.title.length >= 30
                          ? item.title.slice(0, 30) + "..."
                          : item.title}
                      </div>
                      </div>
                    </div>
                  )
              )}
              {btstate == 'series' && pt2 &&
              pt2.map(
                (item, index) =>
                  item.poster_path && (
                    <div key={index} className="divofwhole" onClick={()=>{navigate(`/detes/${item.id}?m=false`)}}>
                      <img

                        className="imgofcast1"
                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.poster_path}`}
                        alt={`Poster for ${item.id}`}
                      />
                      <div className="arr12345">
                      <div className="titleofcast">
                        {item.name && item.name.length >= 30
                          ? item.name.slice(0, 30) + "..."
                          : item.name}
                          {item.title && item.title.length >= 30
                          ? item.title.slice(0, 30) + "..."
                          : item.title}
                      </div>
                      </div>
                    </div>
                  )
              )}
              </div>
          </div>
        </div>
      </div>
    }
    </>
  );
}
