import React from 'react'
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

export default function LogOutbt({fromAcc}) {
  const navigate = useNavigate();

    function deleteAllCookies(cookieName) {
        googleLogout();
    
        const cookies = document.cookie.split("; ");
    
        for (const cookie of cookies) {
          const [name] = cookie.split("=");
    
          if (name === cookieName) {
            // Expire the cookie by setting its expiration date to a date in the past
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1969 00:00:00 UTC; path=/;`;
          }
        }
    
        fromAcc ?  navigate("/") : window.location.reload()
 }
  return (
    <svg  onClick={()=>deleteAllCookies(`${import.meta.env.VITE_COOKIENAME_ENV}`)} xmlns="http://www.w3.org/2000/svg" fill='white' height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>

  )
}
