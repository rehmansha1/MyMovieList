import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function List({
  tren,
  putInDbMovies,
  putInDbSeries,
  mylist,
  deleteindb,
  movies,
  mbk,
  getCookie,
  playlist,
  boxtoaddplaylist,
  boxtoaddplaylist1,
  setboxtoaddplaylist,
  setboxtoaddplaylist1,
  pl,
  setboxForRmPlItem,
  boxForRmPlItem,
  activebt,
  getpllist,
  set,
  setset,
  setplaylist

}) {
  const navigate = useNavigate();
  const [reviewmy, setreviewmy] = useState(false);
  const [reviewarray, setreviewarray] = useState([]);
  const [stars, setstars] = useState();
  const [counter, setcounter] = useState(false);
  const [npl, setnpl] = useState("");
  const [nametemp, setnametemp] = useState(null);


  
  const  renameplaylistfunc = async () => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    console.log(set);
   /* const resp = await axios.post("http://localhost:3001/deleteformplaylistitem", {
      username,
      index:activebt,
    

    });
    if(resp){
      document.getElementById("removeplitem").style.animation =
                "downdown 0.5s both ";
              document.getElementById("glassoverlay").style.animation =
                "transistionforglassbackup 0.5s  both";
              setTimeout(() => {
                setboxForRmPlItem(!boxForRmPlItem);
              }, 500);

    }
getpllist(activebt)
*/
  };
  const  removeplitemfunc = async () => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    const resp = await axios.post("http://localhost:3001/deleteformplaylistitem", {
      username,
      index:activebt,
      playlistname: npl,
      id: set.id,
      title: set.name,
    });
    if(resp){
      document.getElementById("removeplitem").style.animation =
                "downdown 0.5s both ";
              document.getElementById("glassoverlay").style.animation =
                "transistionforglassbackup 0.5s  both";
              setTimeout(() => {
                setboxForRmPlItem(!boxForRmPlItem);
              }, 500);

    }
    setTimeout(() => {
      getpllist(activebt)
      console.log('deletedf')
    }, 500);
  };
  const sendingplaylistname = async () => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    const resp = await axios.post("http://localhost:3001/sendplaylistnew", {
      username,
      playlistname: npl,
      id: set.id,
      url: set.url,
      title: set.name,
      movie:movies,
    });
    if(resp){
      document.getElementById("boxofplaylist").style.animation =
                "downdown 0.5s both ";
              document.getElementById("glassoverlay").style.animation =
                "transistionforglassbackup 0.5s  both";
              setTimeout(() => {
                setboxtoaddplaylist(!boxtoaddplaylist);
              }, 500);
              setTimeout(async() => {
                const responseofpl = await axios.post(
                  `http://localhost:3001/getplaylist`,
                  { username }
                );
                setplaylist(responseofpl.data);
            
              }, 500);
    }
  };
  const addtoexistinglist = async () => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    const resp = await axios.post(
      "http://localhost:3001/addtoexistingplaylist",
      {
        username,
        playlistname: nametemp,
        id: set.id,
        url: set.url,
        title: set.name,
        movie:movies
      }
    );
    if (resp){
      document.getElementById("boxofplaylist1").style.animation =
      "downdown 0.5s both ";
     document.getElementById("glassoverlay").style.animation =
      "transistionforglassbackup 0.5s  both";
     
      setTimeout(() => {
      setboxtoaddplaylist1(!boxtoaddplaylist1);
     }, 500);
     
    }
  };
  const handleButtonClick = (id,movie) => {
    navigate(`/detes/${id}?m=${!pl?movies:movie}`);
    //window.open(`/detes/${id}?m=${movies}`, '_blank')
    //window.location.href=`/detes/${id}?m=${movies}`;
  };

  const sendcompletedidtodb = async (arrayImgNameId, inputText, starsvalue) => {
    const urlformovies =
      "https://mymovielistserver.onrender.com/completed/movies";
    const urlforseries =
      "https://mymovielistserver.onrender.com/completed/series";

    const options = {
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
      },
    };
    const url = movies == "true" ? urlformovies : urlforseries;
    try {
      const response = await axios.post(url, {
        username: "rehmnshs@gmail.com",
        imageurl: arrayImgNameId[0],
        name: arrayImgNameId[1],
        id: arrayImgNameId[2],
        review: inputText,
        stars: starsvalue,
      });

      console.log(response);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const [text1, setText] = useState("");

  // Function to handle changes in the textarea
  const handleChange = (event) => {
    setText(event.target.value);
  };


  return (
    <>
      {reviewmy && reviewarray && (
        <div className="rvmybox">
          {" "}
          <div className="innerrvbox">
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${reviewarray[0]}`}
                id="imgofinnerbox"
              />
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setreviewmy(!reviewmy);
                setreviewarray([]);
                console.log(reviewarray);
              }}
              fill="white"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              id="myrvboxclose"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
            <div id="ratinguser">
              <div>Your Rating</div>
              <div className="ratinguserinner">
                <div class="star-rating">
                  <input
                    type="radio"
                    id="5-stars"
                    name="rating"
                    value="5"
                    onClick={() => setstars(5)}
                  />
                  <label for="5-stars" class="star">
                    &#9733;
                  </label>
                  <input
                    type="radio"
                    id="4-stars"
                    name="rating"
                    value="4"
                    onClick={() => setstars(4)}
                  />
                  <label for="4-stars" class="star">
                    &#9733;
                  </label>
                  <input
                    type="radio"
                    id="3-stars"
                    name="rating"
                    value="3"
                    onClick={() => setstars(3)}
                  />
                  <label for="3-stars" class="star">
                    &#9733;
                  </label>
                  <input
                    type="radio"
                    id="2-stars"
                    name="rating"
                    value="2"
                    onClick={() => setstars(2)}
                  />
                  <label for="2-stars" class="star">
                    &#9733;
                  </label>
                  <input
                    type="radio"
                    id="1-star"
                    name="rating"
                    value="1"
                    onClick={() => setstars(1)}
                  />
                  <label for="1-star" class="star">
                    &#9733;
                  </label>
                </div>
              </div>
            </div>
            <div id="reviewuser">
              <div>Your Review for this Movie</div>
              <div id="rvinput">
                <textarea
                  placeholder="write here"
                  value={text1}
                  onChange={handleChange}
                />
              </div>
              <svg
                className="sendsymbol"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  sendcompletedidtodb(reviewarray, text1, stars);
                }}
                fill="white"
                opacity="1"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
              </svg>
            </div>
          </div>
        </div>
      )}
      {boxForRmPlItem && (
        <div id="removeplitem">
          <svg
            className="rmbox1"
            onClick={() => {
              document.getElementById("removeplitem").style.animation =
                "downdown 0.5s both ";
              document.getElementById("glassoverlay").style.animation =
                "transistionforglassbackup 0.5s  both";
              setTimeout(() => {
                setboxForRmPlItem(!boxForRmPlItem);
                console.log(activebt)
              }, 500);
            }}
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
          <h1>
            Are you sure you want to delete "{set.name}" from this playlist
          </h1>
          <div className="plynbox">
          <div
              onClick={() => {
                removeplitemfunc()

              }}
            >
              Yes
            </div>
            <div
              onClick={() => {
                document.getElementById("removeplitem").style.animation =
                  "downdown 0.5s both ";
                document.getElementById("glassoverlay").style.animation =
                  "transistionforglassbackup 0.5s  both";
                setTimeout(() => {
                  setboxForRmPlItem(!boxForRmPlItem);
                }, 500);
              }}
            >
              No
            </div>
          </div>
        </div>
      )}

      {boxtoaddplaylist && (
        <div id="boxofplaylist">
          <h1>Add "{set.name}" to a new playlist?</h1>
          <svg
            onClick={() => {
              document.getElementById("boxofplaylist").style.animation =
                "downdown 0.5s both ";
              document.getElementById("glassoverlay").style.animation =
                "transistionforglassbackup 0.5s  both";
              setTimeout(() => {
                setboxtoaddplaylist(!boxtoaddplaylist);
              }, 500);

            }}
            id="playlistclose"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="white"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
          <div className="bopboxinner">
            {" "}
            <input
              className="daw"
              value={npl}
              onChange={(event) => {
                setnpl(event.target.value);
              }}
              placeholder="Enter Playlist Name"
            />
            <div
              id="sendtobackendplaylist"
              onClick={() => {
                if (npl != "") {
                  sendingplaylistname();
                  console.log("text");
                } else {
                  console.log("empty str cant be sent");
                }
              }}
            >
              Add
            </div>
          </div>
        </div>
      )}
      {boxtoaddplaylist1 && (
        <div id="boxofplaylist1">
          <svg
            onClick={() => {
              document.getElementById("boxofplaylist1").style.animation =
                "downdown 0.5s both ";
              document.getElementById("glassoverlay").style.animation =
                "transistionforglassbackup 0.5s  both";
              setTimeout(() => {
                setboxtoaddplaylist1(!boxtoaddplaylist1);
              }, 500);
            }}
            id="playlistclose"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="white"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
          <h1>Add "{set.name}" to a existing playlist?</h1>
          <div className="boxplaylistinner1">
            {playlist.map((item, index) => {
              return (
                <div
                  className="itemsofllp"
                  onClick={() => {
                    if (nametemp == index) {
                      setnametemp(null);
                      document.querySelectorAll(".itemsofllp")[
                        index
                      ].style.color = "white";
                    } else {
                      setnametemp(index);
                      document.querySelectorAll(".itemsofllp")[
                        index
                      ].style.color = "gold";
                    }
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div
            id="sendtobackendplaylist"
            onClick={() => {
              addtoexistinglist();
              console.log("text");
            }}
          >
            Add
          </div>
        </div>
      )}
      {tren.results &&
        tren.results.map(
          (item, index) =>
            (item.poster_path || item.URL) && (
              <div key={index} id="trengallary" >
                <div id="outimg">
                 {!pl && <>  {mylist ? (
                    <svg
                      onClick={(event) => {
                        deleteindb(item.id);
                        event.target.parentElement.parentElement.parentElement.style.position =
                          "absolute";
                        event.target.parentElement.parentElement.style.opacity = 0;

                        console.log(
                          event.target.parentElement.parentElement.parentElement
                        );
                      }}
                      id="tdots"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                      fill="white"
                    >
                      <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z" />
                    </svg>
                  ) : (
                    <svg
                      id="tdots"
                      onClick={() => {
                        if (putInDbMovies) {
                          putInDbMovies(item.id, item.poster_path, item.title);
                        }
                        if (putInDbSeries) {
                          putInDbSeries(item.id, item.poster_path, item.name);
                        }
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path
                        fill="white"
                        d="M200-120v-640q0-33 23.5-56.5T280-840h400q33
                     0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 
                     200-86 200 86v-518H280v518Zm0-518h400-400Z"
                      />
                    </svg>
                  )}</>}
                  {
                    pl &&<> 
                    <svg
                      onClick={() => {
                        
                            setboxForRmPlItem(!boxForRmPlItem)
                            setset({
                                id: item.id,
                                url: item.poster_path || item.URL,
                                name: item.title || item.name,
                              });
                      }}
                      className="takethisout"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e8eaed"
                    >
                      <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                    </svg>
                    </>
                  }
                  {mylist && (
                    <>
                      <svg
                        className="playlistadd"
                        id="pladd"
                        onClick={() => {
                          document.querySelectorAll("#addtoplaylist")[
                            index
                          ].style.animation = "plaanimation 0.3s both ";
                          document.querySelectorAll("#closeadtoplaylist")[
                            index
                          ].style.fill = "white";
                          document.querySelectorAll("#closeadtoplaylist")[
                            index
                          ].style.rotate = "90deg";
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                      >
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                      </svg>
                      <div id="addtoplaylist">
                        <div className="pllayer1">
                          <svg
                            id="closeadtoplaylist"
                            onClick={() => {
                              document.querySelectorAll("#addtoplaylist")[
                                index
                              ].style.animation =
                                "plaanimationbackup 0.3s both 0.5s";
                              document.querySelectorAll("#closeadtoplaylist")[
                                index
                              ].style.rotate = "45deg";
                              setTimeout(() => {
                                document.querySelectorAll("#closeadtoplaylist")[
                                  index
                                ].style.fill = "transparent";
                              }, 500);
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                            fill="transparent"
                          >
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                          </svg>
                        </div>
                        <div className="pllayer2">
                          <div
                            className="asda"
                            onClick={() => {
                              setset({
                                id: item.id,
                                url: item.poster_path || item.URL,
                                name: item.title || item.name,
                              });
                              setboxtoaddplaylist1(!boxtoaddplaylist1);
                              console.log(boxtoaddplaylist1);
                            }}
                          >
                            Add to existing playlist
                          </div>
                          <div
                            className="asda"
                            onClick={() => {
                              setset({
                                id: item.id,
                                url: item.poster_path || item.URL,
                                name: item.title || item.name,
                              });
                              setboxtoaddplaylist(!boxtoaddplaylist);
                              console.log(boxtoaddplaylist);
                            }}
                          >
                            Add to a new playlist
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <img
                    id="imgofthis"
                    onClick={() => {
                      handleButtonClick(item.id,pl?item.movie:null);
                    }}
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${
                      item.poster_path || item.URL
                    }`}
                    alt={item.title || "Image Alt Text"}
                  />
                </div>
                <a
                  id="clickthishref"
                  href={pl?`https://mymovielist-mkra.onrender.com/detes/${item.id}?m=${item.movie}`:`https://mymovielist-mkra.onrender.com/detes/${item.id}?m=${movies}`}
                >
                  <div className="trndetes">
                    <div id="listcon">
                      <div>{item.title || item.name}</div>
                      <div id="year">
                        {item.release_date ? item.release_date.slice(0, 4) : ""}
                      </div>
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

                      {item.vote_average ? item.vote_average.toFixed(1) : ""}
                    </div>
                  </div>
                </a>
              </div>
            )
        )}
    </>
  );
}
