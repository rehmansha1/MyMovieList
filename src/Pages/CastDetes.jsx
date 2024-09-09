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

      console.log(response2.data);
      setpt1(response1.data.cast);
      setpt2(response2.data.cast)
    } catch (error) {
      console.error("error:", error);
    }
  };
  useEffect(() => {
    document.title = 'MyMovieList'
    fetchData(paramValue);
    fetchData1(paramValue);
    console.log(pt2)
//gsap.from('#borderani',{width:0,duration:0.5})
  }, []);

  useEffect(() => {

    const images = gsap.utils.toArray(".divofwhole");
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
  }, [document.querySelectorAll('.divofwhole')]);
  return (
    <>
    {pt.profile_path &&  
      <div className="cwhole" id="cwhole">
        <div className="castdetes">
          <div className="pptcover">
          <div id="dummycover">

          </div>
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
                    
                    <div key={index} className="divofwhole" onClick={()=>{
                      document.getElementById('cwhole').style.opacity  = 0; setTimeout(()=>navigate(`/detes/${item.id}?m=true`),300);
                      }}>
                      <img

                        className="imgofcast1"
                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.poster_path}`}
                        alt={`Poster for ${item.id}`}
                      />
                      <div className="arr12345">
                      <a className="titleofcast" id="clickthishref"
                  href={`https://mymovielist-mkra.onrender.com/detes/${item.id}?m=true`}
                  >
                        {item.title && item.title.length >= 18
                          ? item.title.slice(0, 18) + "..."
                          : item.title}
              
                      </a>
                      <div>{item.release_date.split('-')[0]}</div>
                      </div>
                    </div>
                  )
              )}
              {btstate == 'series' && pt2 &&

                pt2.sort((a,b)=>{
            return b.first_air_date.slice(0,4)  - a.first_air_date.slice(0,4)
              }).map(
                (item, index) =>
                  item.poster_path && (
                    <div key={index} className="divofwhole" onClick={()=>{
                      document.getElementById('cwhole').style.opacity  = 0; setTimeout(()=>navigate(`/detes/${item.id}?m=false`),300);
                      }}>                      {<img

                        className="imgofcast1"
                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.poster_path}`}
                        alt={`Poster for ${item.id}`}
                        
                      />?<img

className="imgofcast1"
src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.poster_path}`}
alt={`Poster for ${item.id}`}

/>: <div id="imgofcastbackup"></div> }
                      <div className="arr12345">
                      
                      <a className="titleofcast" id="clickthishref"
                  href={`https://mymovielist-mkra.onrender.com/detes/${item.id}?m=false`}
                                                                                >
                      
                  
              
                        {item.name && item.name.length >= 18
                          ? item.name.slice(0, 18) + "..."
                          : item.name}
              
                      </a>
                      <div>
                      {item.first_air_date ?  item.first_air_date.split('-')[0] : '' }
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
