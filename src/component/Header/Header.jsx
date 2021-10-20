import React from 'react'
import './header.scss'

const Header = () => {
   const addActive = e => {
      e.target.classList.toggle('active')
      e.target.closest('.header_body').classList.toggle('active')
   }

   return (
   <div className="header">
      <div className="header_body">
         <div className="header_logo">Timer</div>
         <div className="header_burger" onClick={addActive}>
            <span></span>
         </div>
         <div className="header_menu">
            <ul className="header_list">
               <li>
                  <a href="/" className="header_link">Countdown timer</a>
               </li>
               <li>
                  <a href="/stopwatch" className="header_link">Stopwatch</a>
               </li>
               <li>
                  <a href="/pomodoro" className="header_link">Pomodoro</a>
               </li>
            </ul>
         </div>
      </div>
   </div>
   );
}

export default Header;
