import React from 'react'

export default function SearchComponent({movieName,handleInputChange,searchList,setsl,searchmovies,List,movies,setmovies,setoverlay,overlaysearch,setoverlaysearch,MovieDetailSearch}) {

  return (

<>

        <div className="overlayinner" id="overlayinnerid">
          <div className="ovainput" id="ovai" >
            <svg
              id="close"
              onClick={() => {
                const c = document.getElementById("oy");
                document.getElementById('overlayinnerid').style.opacity = 0;
                setTimeout(()=>{c.style.height = "0vh";  setsl(""); !overlaysearch ? setoverlay(false) : setoverlaysearch(false)},300)
               
              }}
              xmlns="http://www.w3.org/2000/svg"
              height="27"
              fill="white"
              viewBox="0 -960 960 960"
              width="27"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
            <div className="inputsearchbox">
              {" "}
              <input
                id="inputbox"
                autocomplete="off"
                placeholder="Enter movie or series name"
                value={movieName}
                onChange={handleInputChange}
              />
              <svg
                id="nextsymbol"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  const c = document.getElementById("oy");
                  const inputbix = document.getElementById("ovai");
                  inputbix.style.height = "20vh";
                  c.style.height = "110vh";
                  searchmovies();
                  document.getElementById("nextsymbol").style.rotate =
                    "90deg";
                }}
                fill="white"
                opacity="0.5"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
              </svg>
              <div
                id="nextsymbol1"
                onClick={() => {
                  const c = document.getElementById("oy");
                  const inputbix = document.getElementById("ovai");
                  inputbix.style.height = "20vh";
                  c.style.height = "110vh";
                  searchmovies();
                  document.getElementById("nextsymbol").style.rotate =
                    "90deg";
                }}
              ></div>
              <div className="btmvser" onClick={()=>{document.getElementById("nextsymbol").style.rotate ="0deg";console.log('sdasd')}} >
                <div
                  id="mvbt"
                  onClick={() => {
                    setmovies("true");
                    let bt = document.getElementById("mvbt");
                    bt.style.background = "white";
                    bt.style.color = "black";
                    let bt1 = document.getElementById("svbt");
                    bt1.style.background = "black";
                    bt1.style.color = "white";
                  }}
                >
                  movie
                </div>
                <div
                  id="svbt"
                  onClick={() => {
                    setmovies("false");
                    let bt = document.getElementById("svbt");
                    bt.style.background = "white";
                    bt.style.color = "black";
                    let bt1 = document.getElementById("mvbt");
                    bt1.style.background = "black";
                    bt1.style.color = "white";
                  }}
                >
                  series
                </div>
              </div>
            </div>
          </div>

          {searchList.results && searchList.results[0] ? (
            <div className="displaysearch">
              <div className="searchdisplay" id='searchdisplayid' >
                <List tren={searchList} movies={movies} MovieDetailSearch = {MovieDetailSearch} />
              </div>
            </div>
          ) : (
            document.getElementById("oy").style.height == "110vh" && (
              <div className="emtpy-display">
                <svg
                  id="svgpart222"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm20 180h240v-60H360v60ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
                </svg>
                <div id="textnotfound">Not found</div>{" "}
              </div>
            )
          )}
        </div>
   
      </>
  )
}
