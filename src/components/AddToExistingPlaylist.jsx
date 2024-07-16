import React from 'react'

export default function AddToExistingPlaylist({md,nametemp,boxtoaddplaylist1,setboxtoaddplaylist1,set,playlist,setnametemp,addtoexistinglist}) {
  return (
<>
{boxtoaddplaylist1 && (
        <div id="boxofplaylist1" style={md ? { left: '50%' } : null}>
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
            {playlist[0] && playlist.map((item, index) => {
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
{
  !playlist[0] &&
  <div id='centerandrotate'>
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg>

  <div> fetching data</div>
</div>

}
          </div>
          <div
            id="sendtobackendplaylist"
            onClick={() => {
              addtoexistinglist();
             // console.log("text");
            }}
          >
            Add
          </div>
        </div>
      )}
 </>
)
}
