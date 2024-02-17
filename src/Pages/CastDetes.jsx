import React, { useEffect, useState } from 'react'
import axios from "axios";

export default function CastDetes() {
    const urlParams = new URLSearchParams(window.location.search);
    let paramValue = urlParams.get("p");
    const [pt,setpt] = useState([]);
    const [pt1,setpt1] = useState([]);

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
      
          setpt(response1.data)
        } catch (error) {
          console.error("error:", error);
        }
      };
      const fetchData1 = async (id) => {
        const urlformovie = `https://api.themoviedb.org/3/person/${id}/movie_credits        `;

    
        const options = {
          headers: {
            accept: "application/json",
            Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
          },
        };
        try {
          const response1 = await axios.get(urlformovie, { ...options });
      
          console.log(response1.data.cast);
          setpt1(response1.data.cast);

        } catch (error) {
          console.error("error:", error);
        }
      };
    useEffect(() => {
        fetchData(paramValue)
        fetchData1(paramValue)
      }, []);
  return (
    <>
   <div className='cwhole'>
    <div  className='castdetes'>
    <div>
        <img id='pptprofile' src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${pt.profile_path}`}/>
    </div>
    <div className='castnameandbio'>
    <div className='ptname'>
        {pt.name}
    </div>
    <div className='ptbio'>{pt.biography}</div>

    </div>
  
    </div>
    <div className='moviesacted'>
<div className='mah1'>
    Movies Acted
</div>
<div className='arrayofimgcast'>
{pt1 && pt1.map((item, index) => (
  item.poster_path && (
    <div key={index} className='divofwhole'>
      <img className='imgofcast1' src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.poster_path}`} alt={`Poster for ${item.id}`} />
      <div>{item.title}</div>
    </div>
  )
))}

</div>
    </div>

    </div>
      </>
  )

}
