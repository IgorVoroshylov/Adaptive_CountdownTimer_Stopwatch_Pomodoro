import React, { useState, useEffect } from 'react'
import './stopwatch.scss'

const Stopwatch = () => {
   const [time, setTime] = useState(0)
   const [timerOn, settimerOn] = useState(false)
   const [circles, setCircle] = useState([])

   const minutes = ('0' + Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))).slice(-2)
   const secomds = ('0' + Math.floor((time % (1000 * 60)) / 1000)).slice(-2)
   const mSeconds = ('0' + (time / 10) % 100).slice(-2)

   const checkCircle = () => {
      circles.push({
         minutes: minutes,
         seconds: secomds,
         mSeconds: mSeconds
      })
   }

   const reset = () => {
      setTime(0)
      setCircle([])
   }

   useEffect(() => {
      let interval = null
      if(timerOn) {
         interval = setInterval(() => {
            setTime(prevTime => prevTime + 10)
         }, 10)
      } else {
         clearInterval(interval)
      }
      return () => {
         clearInterval(interval)
      };
   }, [timerOn]);

   return (
      <div className="stopwatch">
         <section className="stopwatch_timer">
            <h2 className='stopwatch_timer_title'>Stopwatch</h2>
            <div className="stopwatch_timer_display">
               <div>
               <span>{minutes}:</span>
               <span>{secomds}:</span>
               <span className='stopwatch_timer_display_seconds'>{mSeconds}</span>
            </div>
            </div>
         </section>

         <section className='stopwatch_button'>
               {
                  !timerOn && time === 0 && <button
                     className='waves-effect waves-light btn blue'
                     onClick={() => settimerOn(true)}>Start</button>
               }
               {
                  timerOn && <button
                     className='waves-effect waves-light btn blue'
                     onClick={() => settimerOn(false)}>Stop</button>
               }
               {
                  timerOn && <button
                     className='waves-effect waves-light btn blue'
                     onClick={checkCircle}>Circle</button>
               }
               {
                  !timerOn && time > 0 && <button
                     className='waves-effect waves-light btn blue'
                     onClick={() => settimerOn(true)}>Resume</button>
               }
               {
                  !timerOn && time > 0 && <button
                     className='waves-effect waves-light btn blue'
                     onClick={reset}>Reset</button>
               }
         </section>

         <section className='circle'>
            {
               circles.map((itemCircle, index) =>
                  <div className='circle_item' key={index}>
                     <span className='circle_item_index green-text'>{index + 1}</span>
                     <div className='circle_item_time'>
                        <span>{itemCircle.minutes}</span>
                        <span className='circle_item_time_dots'>:</span>
                        <span>{itemCircle.seconds}</span>
                        <span className='circle_item_time_dots'>:</span>
                        <span>{itemCircle.mSeconds}</span>
                  </div>
                  </div>)
            }
         </section>
      </div>
   );
}

export default Stopwatch;