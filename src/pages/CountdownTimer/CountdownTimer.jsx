import React, { useState, useEffect } from 'react'
import './countdownTimer.scss'

const Timer = () => {
   const [days, setDays] = useState('00')
   const [hours, setHours] = useState('00')
   const [minutes, setMinutes] = useState('00')
   const [seconds, setSeconds] = useState('00')
   let interval


   const [necessaryDay, setNecessaryDay] = useState('')
   const necessaryDayArray = necessaryDay.split('-')
   const [year, mounth, day] = necessaryDayArray

   const stop = () => {
      setNecessaryDay('')
   }

   const start = (e) => {
      e.preventDefault()

      const countDownDate = new Date(`${mounth} ${day}, ${year}`).getTime()
      if(!countDownDate) {
         setDays('00')
         setHours('00')
         setMinutes('00')
         setSeconds('00')
         return
      }

      interval = setInterval(() => {
         const dateNow = Date.now()
         const distance = countDownDate - dateNow

         const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24))
         const hoursLeft = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
         const minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
         const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000)

         if(distance < 0) {
            clearInterval(interval)
         } else {
            setDays(('0' + daysLeft).slice(-2))
            setHours(('0' + hoursLeft).slice(-2))
            setMinutes(('0' + minutesLeft).slice(-2))
            setSeconds(('0' + secondsLeft).slice(-2))
         }
      }, 1000)
   }

   useEffect(() => {
      return () => {
         clearInterval(interval)
      };
   }, [interval, necessaryDay]);

   return (
      <article className='countdown'>
         <section className='countdown_title'>
            <div>Contdown timer</div>
            <i className="material-icons countdown_title_icon">av_timer</i>
         </section>

         <section className='countdown_timer'>
            <div className='countdown_timer_display'>
               <div className='countdown_timer_display_item'>
                  <div className='countdown_timer_display_item_time'>{days}</div>
                  <div className='countdown_timer_display_item_description'>Days</div>
               </div>
               <div className='countdown_timer_display_dots'>:</div>
               <div className='countdown_timer_display_item'>
                  <div className='countdown_timer_display_item_time'>{hours}</div>
                  <div className='countdown_timer_display_item_description'>Hours</div>
               </div>
               <div className='countdown_timer_display_dots'>:</div>
               <div className='countdown_timer_display_item'>
                  <div className='countdown_timer_display_item_time'>{minutes}</div>
                  <div className='countdown_timer_display_item_description'>Minutes</div>
               </div>
               <div className='countdown_timer_display_dots'>:</div>
               <div className='countdown_timer_display_item'>
                  <div className='countdown_timer_display_item_time'>{seconds}</div>
                  <div className='countdown_timer_display_item_description'>Seconds</div>
               </div>
            </div>
         </section>

         <section className='form'>
            <form className='form form-login' onSubmit={start}>
               <div className="row">
                  <div className="input-field col s12">
                     <input
                        type="date"
                        id='date'
                        value={necessaryDay}
                        className='validate'
                        onChange={e => setNecessaryDay(e.target.value)}/>
                  </div>
               </div>

               <div className="row">
                  <button className='waves-effect waves-light btn blue btn_right'>Start</button>
                  <button
                     className='waves-effect waves-light btn blue'
                     onClick={stop}>Stop</button>
               </div>
            </form>
         </section>

      </article>
   );
}

export default Timer;