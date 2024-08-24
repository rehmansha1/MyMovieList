import React from 'react'

export default function AddNewPlaylist({setwatchbtloading,md,sendingplaylistname,setboxtoaddplaylist,boxtoaddplaylist,set,setnpl,npl}) {
  function getCookie(cookieName) {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
      const [name, encodedValue] = cookie.split("=");

      if (name === cookieName) {
        const decodedValue = decodeURIComponent(encodedValue);

        try {
          // Try to parse the cookie value as JSON
          return JSON.parse(decodedValue);
        } catch (error) {
          // If parsing fails, return the original value
          return decodedValue;
        }
      }
    }

    return null; // Return null if the cookie with the specified name is not found
  }
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
                
                if (npl != ""  ) {
                  const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
                  console.log(username)
                  if (!username){
                  document.getElementById("remindnotifycard").innerHTML =
        "You are not Logged in";

      document.getElementById("remindnotifycard").style.top = "5%";
      setwatchbtloading(false)
      setTimeout(() => {
        document.getElementById("remindnotifycard").style.top = "-10%";
      }, 1500);}
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
