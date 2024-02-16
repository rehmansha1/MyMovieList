import React, { useEffect, useState } from 'react'
import axios from "axios";

export default function MoreImagesP() {
    const [result, setresult] = useState();

    const urlParams = new URLSearchParams(window.location.search);
    const fetchData = async () => {
        const url = `https://api.themoviedb.org/3/${urlParams.get('m')=='true'? 'movie' : 'tv'}/${urlParams.get('id')}/images`;
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
    function expandandcenter (event){
const target = event.currentTarget;
target.classList.toggle('expanded');

    }
    return (
    <div className='mmpage'>
    <div id='mediapagetitle'>media</div>
    { result &&
    <div className='mediaarraybox'>
{
   result.backdrops.map((item,index)=><img className='gimg' onClick={expandandcenter} src= {`https://image.tmdb.org/t/p/original${item.file_path}`} /> )
}
    </div>}
    </div>
  )
}
