import React from 'react'

export default function AddNewPlaylist({md,sendingplaylistname,setboxtoaddplaylist,boxtoaddplaylist,set,setnpl,npl}) {
  return (
 <>
{boxtoaddplaylist && (
        <div id="boxofplaylist" style={md ? { left: '50%' } : null}>
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
                if (event.target.value.length <= 15){
                setnpl(event.target.value);
                }
              }}
              placeholder="Enter Playlist Name"
            />
            <div
              id="sendtobackendplaylist"
         
              onClick={() => {
                if (npl != "") {
                  sendingplaylistname();
                 // console.log("text");
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


   </>
  )
}
