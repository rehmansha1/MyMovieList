import React, { useEffect, useState } from "react";
import List from "../components/List";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Mylist() {
  const [movies, setmylist] = useState({ results: [] });
  const [series, setseries] = useState({ results: [] });

  const [userName, setusername] = useState("Rehman");
  const [btstate, setbtstate] = useState("movies");

  const navigate = useNavigate();

  const getUserMovies = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/getIDS?username=${userName}`
      );
      const newData = response.data[0].Movies;
      const newData1 = response.data[0].Series;
      setseries({ results: newData1 });
      setmylist({ results: newData });

      // await mylistimpl(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const deleteindb = async (id) => {
    console.log("pressed");
    try {
      const resp = await axios.delete("http://localhost:3001/delete", {
        data: {
          username: "Rehman",
          postText: id,
        },
      });
      console.log(resp.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
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

  return (
    <>
      {movies && (
        <>
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
              movies
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
              series
            </div>
          </div>
          <div className="overlay1inner">
            <div className="ov1ih1">
              <div style={{ color: "white" }}>My List</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  navigate("/");
                }}
                fill="white"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </div>
            <div className="ov1box" style={{ opacity: "1" }}>
              {btstate=='movies' && <List tren={movies} mylist={true} deleteindb={deleteindb} movies={'true'}/>}
              {btstate=='series' && <List tren={series} mylist={true} deleteindb={deleteindb} movies={'false'}/>}
            </div>
          </div>
        </>
      )}
    </>
  );
}
