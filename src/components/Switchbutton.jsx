import React from 'react'

export default function Switchbutton({setbtstate,images}) {
  return (

    <div className="wishlistbtms">
    <div
      id="moviebt"
      onClick={() => {

          setbtstate("movies");

        
        let bt = document.getElementById("moviebt");
        bt.style.background = "white";
        bt.style.color = "black";
        let bt1 = document.getElementById("seriesbt");
        bt1.style.background = "black";
        bt1.style.color = "white";
      }}
    >
      {images ? 'Backdrops' : 'movies'}
    </div>
    <div
      id="seriesbt"
      onClick={() => {

          setbtstate("series");

       
        let bt = document.getElementById("seriesbt");
        bt.style.background = "white";
        bt.style.color = "black";
        let bt1 = document.getElementById("moviebt");
        bt1.style.background = "black";
        bt1.style.color = "white";
      }}
    >
      {images ? 'posters' : 'series'}
    </div>
  </div>
  )
}
