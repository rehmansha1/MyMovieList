import React from 'react'
import './Layer.css';
export default function Layers({count,setCount,trendingMovies}) {
console.log(trendingMovies);
  return (
<div className='mainPage'>
  <div className='title'>Recently Added</div>

  <svg   id='upToNextPage' onClick={()=> window.scrollTo({ top: 0, behavior: 'smooth' }) } xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>
     
    <div className='container' id='contain'>
    {trendingMovies.results && trendingMovies.results.map((item,index)=>(
       <img onClick={()=>{
      const image = document.querySelectorAll(".imageArray")[index];

       image.style.scale = 4;}} 
       className='imageArray' src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.poster_path}`}/>
    ))
    } 
    </div>
    <div className='bio'>
    {trendingMovies.results&& <h1>{trendingMovies.results[count].title}</h1>}
    <div>
    <div>2024</div><div>Action</div><div>2h 25m</div>
    </div>
    </div>
    {count > 1 && <svg
    
    onClick={()=>{
      var contain = document.getElementById('contain');
var marginLeft = (window.getComputedStyle(contain, null).getPropertyValue('margin-left')).split('px')[0];
marginLeft = -(Math.abs(marginLeft) - 300);
console.log(marginLeft);

      document.getElementById('contain').style.marginLeft = `  ${marginLeft}px`;
      var marginLeft1 = (window.getComputedStyle(contain, null).getPropertyValue('margin-left')).split('px')[0];
console.log(marginLeft1);


      document.querySelectorAll('.imageArray')[count].classList.remove('active')
      
      document.querySelectorAll('.imageArray')[count-1].classList.add('active');
      setCount(count-1);
    }}
    
    
     id='moveback' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>
    }
    <svg
    
    onClick={()=>{
      if(count>0){
var marginLeft = (window.getComputedStyle(contain, null).getPropertyValue('margin-left')).split('px')[0];
marginLeft = -(Math.abs(marginLeft) +  250 );
      document.getElementById('contain').style.marginLeft = `${marginLeft}px`;
      }else{
          
      document.getElementById('contain').style.marginLeft = `-0px`;
      
      }
      if(document.querySelectorAll('.imageArray')[count-1]){
      document.querySelectorAll('.imageArray')[count-1].classList.remove('active')
      };
      document.querySelectorAll('.imageArray')[count].classList.add('active');
      setCount(count+1);
    
    }}
    
    
     id='movenext' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>

    </div>
  )
}
