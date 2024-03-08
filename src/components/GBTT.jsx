import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import CryptoJS from 'crypto-js';

import axios from "axios";
export default function GBTT() {
    const onSuccess = async (response) => {
        // Use the access token to fetch the credential object from Google API
        try {
          const response1 = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: {
                Authorization: `Bearer ${response.access_token}`,
              },
            }
          );
    
          // Now you have the credential object
        
          if (response1.data.email) {
            var ciphertext = CryptoJS.AES.encrypt(response1.data.email, import.meta.env.VITE_ENCRPYT_KEY_ENV);
    
            document.cookie = `${import.meta.env.VITE_COOKIENAME_ENV}=${ciphertext}; path=/; samesite=strict; max-age=${30 * 60}; secure`;
           window.location.reload();
    
            console.log("success cookie is been set");
          }
        } catch (error) {
          console.error("Failed to fetch credential:", error);
        }
      };
      const login = useGoogleLogin({
        onSuccess,
        onError: (res) => console.log(res),
      });
    
      return (
        <>
          <svg
            onClick={() => login()}
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 50 50"
            width="24px"
            height="24px"
          >
            <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z" />
          </svg>
        </>
      );
}
