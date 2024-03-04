import React from 'react'
import { useSwiper } from 'swiper/react'
import './navbt.css';
export default function NavbuttonsSwi() {
const swiper = useSwiper();
    return (
    <div className='swiper-nav-btns'>

        <button onClick={()=>{swiper.slidePrev(); console.log('clickjed')}} id='swipernavbt1'>Prev</button>

    </div>
  )
}
