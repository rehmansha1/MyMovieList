import React from "react";
import "./r.css";
export default function ReviewBox({ setreviewbox }) {
  const glassOut = () => {
    document.getElementById("glassoverlay").style.animation =
      "transistionforglassbackup 0.5s  both";
  };
  return (
    <div id="rev-box">
      <h1>Review for this Movie</h1>

      <svg
        id="close-revbox"
        onClick={() => {
          document.getElementById("rev-box").style.animation =
            "downdownRevBox 0.4s both";
          glassOut();
          setTimeout(() => {
            setreviewbox(false);
          }, 300);
        }}
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e8eaed"
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>

      <textarea id="textareaofrevbox" placeholder="Add a review"></textarea>
      <div>
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
      <svg
        id="revbox-sendsvg"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e8eaed"
      >
        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
      </svg>
    </div>
  );
}
