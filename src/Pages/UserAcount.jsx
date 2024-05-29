import React, { useEffect, useState } from "react";
import "./UA.css";
import img from "../assets/p1.jpg";
import List from "../components/List";
import axios from "axios";
import Switchbutton from "../components/Switchbutton";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogOutbt from "../components/LogOutbt";
import CryptoJS from "crypto-js";

export default function UserAcount() {
  const imageSources = Array(5).fill(img);
  const [btstate, setbtstate] = useState("movies");
  const [btstate1, setbtstate1] = useState("movies");
  const [movies, setmylist] = useState({ results: [] });
  const [series, setseries] = useState({ results: [] });
  const [likedlist, setlikedlist] = useState();
  const [count, setcount] = useState(0);
  const [viewid, setviewid] = useState({});
  const [cplist, setcplist] = useState();
  const [watchlist, setwatchlist] = useState(false);

  const navigate = useNavigate();

  function getCookie(cookieName) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, encodedValue] = cookie.split("=");
      if (name === cookieName) {
        const decodedValue = decodeURIComponent(encodedValue);
        try {
          return JSON.parse(decodedValue);
        } catch (error) {
          return decodedValue;
        }
      }
    }
    return null;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserMovies();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  function checkCookie(name) {
    // Get all cookies from document.cookie and split into an array
    const cookies = document.cookie.split("; ");

    // Iterate over the array of cookies
    for (const cookie of cookies) {
      // Split the cookie into name and value
      const [cookieName, cookieValue] = cookie.split("=");

      // Trim any leading or trailing spaces
      const trimmedCookieName = cookieName.trim();

      // Check if the current cookie matches the specified name
      if (trimmedCookieName === name) {
        return true; // Cookie found
      }
    }

    return false; // Cookie not found
  }
  const decrpt = (value) => {
    let decryptedBytes = CryptoJS.AES.decrypt(
      value,
      `${import.meta.env.VITE_ENCRPYT_KEY_ENV}`
    );
    var username = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return username;
  };
  const printstars = (ratings) => {
    const stars = [];

    for (let i = 0; i < ratings; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill="gold"
          height="20"
          viewBox="0 -960 960 960"
          width="20"
        >
          <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
        </svg>
      );
    }

    return stars;
  };

  const getuserwatchlist = async () => {
    setlikedlist();
    setcplist();
    try {
      const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
      if (username) {
        const encodedUsername = encodeURIComponent(username);
        const response = await axios.get(
          `https://mymovielistserver.onrender.com/getIDS?username=${encodedUsername}`
        );
        const newData = response.data[0].Movies;
        const newData1 = response.data[0].Series;
        setseries({ results: newData1 });
        setmylist({ results: newData });
        setwatchlist(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const viewfunc = (imageUrl, Movie, id, index) => {
    setviewid({ imageUrl: imageUrl, Movie: Movie, id: id, index: index });
    setcount(index);
  };
  const fetchCompletedlist = async () => {
    setlikedlist();
    setwatchlist(false);
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    if (username) {
      const response = await axios.post(
        `https://mymovielistserver.onrender.com/getCompletedList`,
        { username }
      );
      console.log(response.data.list.movies);
      setcplist(response.data.list);
    }
  };

  const getLikedPosts = async () => {
    setcplist();
    setwatchlist(false);
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    if (username) {
      const encodedUsername = encodeURIComponent(username);
      const response = await axios.get(
        `https://mymovielistserver.onrender.com/getstillslist?username=${encodedUsername}`
      );
      setlikedlist(response.data);
      console.log(response.data);
    }
  };
  const deleteindb = async (id) => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    try {
      const resp = await axios.delete(
        "https://mymovielistserver.onrender.com/delete",
        {
          data: {
            username,
            id: id,
            type: btstate,
          },
        }
      );
      console.log(resp.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const removecompleted = async (id, index) => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);

    if (username) {
      const response = await axios
        .post(`https://mymovielistserver.onrender.com/removecompleted`, {
          username,
          id,
          movie: btstate == "movies" ? "true" : "false",
        })
        .then(() => {
          document
            .querySelectorAll(".UARevCard")
            [index].classList.add("notactive");
        });
      console.log(response.data);
    }
  };
  const deletesavedimages = async (id) => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    try {
      const resp = await axios.post("https://mymovielistserver.onrender.com/removeimageurl", {
        username,
        imageUrl: id,
      });
      console.log(resp.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    document.getElementById('clickthisonstart').click()
  }, [document.getElementById('clickthisonstart')]);
  const likedImages = document.querySelectorAll(".UAlikedlistinner > img");
  useEffect(() => {
    /*const arryofimgs = document.querySelectorAll(".UAlikedlistinner > img");
    arryofimgs.forEach((value, index) => {
      const delay = index * 0.1;
      value.style.animation = `scaleIn 1s both ${delay}s`;
    });*/
    const images = gsap.utils.toArray(".UAlikedlist > div > img");
    images.forEach((image) => {
      gsap.to(image, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        scrollTrigger: {
          trigger: image,
          start: "top 100%", // Start the animation when the top of the image reaches 80% of the viewport height
          toggleActions: "play none none none", // Actions for enter, leave, enter back, and leave back
        },
      });
    });
  }, [likedImages]);
  const watchlistdivs = document.querySelectorAll(".UAwatchlist > div");
  useEffect(() => {
    /*const arryofimgs = document.querySelectorAll(".UAlikedlistinner > img");
    arryofimgs.forEach((value, index) => {
      const delay = index * 0.1;
      value.style.animation = `scaleIn 1s both ${delay}s`;
    });*/
    const images = gsap.utils.toArray(".UAwatchlist > div ");
    images.forEach((image) => {
      gsap.to(image, {
        opacity: 1,
        scale: 1,
        delay:0.5,
        duration: 1,
        scrollTrigger: {
          trigger: image,
          start: "top 100%", // Start the animation when the top of the image reaches 80% of the viewport height
          toggleActions: "play none none none", // Actions for enter, leave, enter back, and leave back
        },
      });
    });
  }, [watchlistdivs]);
  return (
  
    <div className="UA">
      <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() =>
                    navigate('/')
                  }
                  className="gotolink2"
                  height="1px"
                  viewBox="0 -960 960 960"
                  width="1px"
                  fill="white"
                >
                  <path d="M760-200v-160q0-50-35-85t-85-35H273l144 144-57 56-240-240 240-240 57 56-144 144h367q83 0 141.5 58.5T840-360v160h-80Z" />
                </svg>
      <div className="UAmenu">
        <div className="UAinnermenu">
          <div className="UaINNERINNERMENU" >
            <div id="clickthisonstart" onClick={() => getuserwatchlist()}>Watchlist</div>
            <div onClick={() => fetchCompletedlist()}>Your Reviews </div>
            <div>reminderList</div>
            {!true && <div onClick={() => getLikedPosts()}>liked posts</div>}
          </div>
        </div>
        <div className="useraccounttag">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
            </svg>
            <div>
              {checkCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`)? decrpt(getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`)): null}
            </div>
          </div>
          <div id="drage111">
            <LogOutbt fromAcc={"fromAcc"} />
          </div>
        </div>
      </div>

      <div className="UAcontent">
      {
        !watchlist && !cplist && !likedlist &&
        (
          <div className="rotateandroate">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg>

          </div>
        )
      }
        {watchlist && !cplist && !likedlist && (
          <div className="UAouterwatchlist">
            <div className="UAbtbutton">
              <Switchbutton setbtstate={setbtstate} images={false} />
            </div>

            <div className="UAwatchlist">
              {btstate == "movies" ? (
                <List
                  tren={movies}
                  mylist={true}
                  deleteindb={deleteindb}
                  movies={"true"}
                />
              ) : (
                <List
                  tren={series}
                  mylist={true}
                  deleteindb={deleteindb}
                  movies={"false"}
                />
              )}
            </div>
          </div>
        )}
        {likedlist && !cplist && !watchlist && (
          <div className="olikedlist">
            {viewid.imageUrl && (
              <div id="viewimg" className="UAvi">
                <div
                  id="closepart99"
                  onClick={() => {
                    document.getElementById("viewimg").style.animation =
                      "scaleupreverse 0.5s both";
                    setTimeout(() => setviewid({}), 500);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="cp99svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </div>
                <img id="UAviewimgreal" src={viewid.imageUrl} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() =>
                    window.open(
                      `/detes/${viewid.id}?m=${viewid.Movie}`,
                      "_blank"
                    )
                  }
                  className="gotolink"
                  height="1px"
                  viewBox="0 -960 960 960"
                  width="1px"
                  fill="black"
                >
                  <path d="M760-200v-160q0-50-35-85t-85-35H273l144 144-57 56-240-240 240-240 57 56-144 144h367q83 0 141.5 58.5T840-360v160h-80Z" />
                </svg>
                <svg
                  onClick={() => {
                    setviewid({
                      imageUrl: document
                        .querySelectorAll(".UAlikedlistinner > img")
                        [count + 1].src.replace(
                          "w533_and_h300_bestv2",
                          "original"
                        ),
                      Movie: document
                        .querySelectorAll(".UAlikedlistinner > img")
                        [count + 1].alt.split("?")[0],
                      id: document
                        .querySelectorAll(".UAlikedlistinner > img")
                        [count + 1].alt.split("?")[1],
                    });
                    setcount((prev) => prev + 1);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  id="nextimg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="black"
                >
                  <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                </svg>
                <svg
                  onClick={() => {
                    setviewid({
                      imageUrl: document
                        .querySelectorAll(".UAlikedlistinner > img")
                        [count - 1].src.replace(
                          "w533_and_h300_bestv2",
                          "original"
                        ),
                      Movie: document
                        .querySelectorAll(".UAlikedlistinner > img")
                        [count - 1].alt.split("?")[0],
                      id: document
                        .querySelectorAll(".UAlikedlistinner > img")
                        [count - 1].alt.split("?")[1],
                    });
                    setcount((prev) => prev - 1);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  id="previmg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="black"
                >
                  <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                </svg>
              </div>
            )}
            <div className="UAlikedlist">
              {likedlist.map((src, index) => (
                <div className="UAlikedlistinner" id="UALLINNER">
                  <img
                    key={index}
                    onClick={() => {
                      viewfunc(src.imageUrl, src.Movie, src.id, index);
                    }}
                    src={src.imageUrl.replace(
                      "original",
                      "w533_and_h300_bestv2"
                    )}
                    alt={`${src.Movie}?${src.id}`}
                  />
                  <svg
                    id="UAllclose"
                    onClick={(event) => {
                      event.target.style.opacity = 0;
                      setTimeout(
                        () =>
                          (event.target.parentElement.style.position =
                            "absolute"),
                        500
                      );
                      setTimeout(() => deletesavedimages(src.imageUrl), 500);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e8eaed"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        )}
        {cplist && !likedlist && !watchlist && (
          <div className="ocplist">
            <div className="UAbtbutton1">
              <Switchbutton setbtstate={setbtstate1} images={false} />
            </div>
            <div className="UACompletedlistwrapper">
              {btstate1 == "movies" &&
                cplist.movies.map((item, index) => {
                  return (
                    <div
                      className="UARevCard"
                      onMouseEnter={() =>
                        (document.querySelectorAll(".UAllcloserevbox")[
                          index
                        ].style.opacity = 1)
                      }
                      onMouseLeave={() =>
                        (document.querySelectorAll(".UAllcloserevbox")[
                          index
                        ].style.opacity = 0)
                      }
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.imageurl}`}
                        className="UAComImg"
                      />
                      <div className="UArevcontents">
                        <div className="UArevtitleandstars">
                          <div className="UAComTitle">{item.name}</div>
                          <div className="UAComStars">
                            {printstars(item.stars)}
                          </div>
                        </div>
                        <div className="UAComRev">{item.review}</div>
                      </div>
                      <svg
                        onClick={() => removecompleted(item.id, index)}
                        className="UAllcloserevbox"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                      >
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                      </svg>
                    </div>
                  );
                })}
              {btstate1 == "series" &&
                cplist.series.map((item, index) => {
                  return (
                    <div
                      className="UARevCard"
                      onMouseEnter={() =>
                        (document.querySelectorAll(".UAllcloserevbox")[
                          index
                        ].style.opacity = 1)
                      }
                      onMouseLeave={() =>
                        (document.querySelectorAll(".UAllcloserevbox")[
                          index
                        ].style.opacity = 0)
                      }
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.imageurl}`}
                        className="UAComImg"
                      />
                      <div className="UArevcontents">
                        <div className="UArevtitleandstars">
                          <div className="UAComTitle">{item.name}</div>
                          <div className="UAComStars">
                            {printstars(item.stars)}
                          </div>
                        </div>
                        <div className="UAComRev">{item.review}</div>
                      </div>
                      <svg
                        onClick={() => removecompleted(item.id, index)}
                        className="UAllcloserevbox"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                      >
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                      </svg>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
