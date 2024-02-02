import React from 'react';

export default function List({ tren }) {
  return (
   <>
      {tren.results &&
        tren.results.map((item, index) => (
          <div key={index} id="trengallary">
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}|| 'wadad'}`}
              alt={item.title || 'Image Alt Text'}
            />
            <div className="trndetes">
              <div id="listcon">
                <div>{item.title || item.name || 'none'}</div>
                <div id="year">{item.release_date ? item.release_date.slice(0, 4) : ''}</div>
              </div>{" "}
              <div id="starstrn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="gold"
                  height="15"
                  viewBox="0 -960 960 960"
                  width="15"
                >
                  <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
                </svg>
                {item.vote_average ? item.vote_average.toFixed(1) : ''}
              </div>
            </div>
          </div>
        ))}
   </>
  );
}
