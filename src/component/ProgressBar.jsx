import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import Playbutton from './PlayButton'
import Pausebutton from './PauseButton'
import Settingsbutton from './SettingsButton'
import SettingsContext from '../utils/settingsContext'

const Progressbar = () => {
   const green = '#c5e1a5'
   const red = '#ff8a80'

   const { workMinutes, breakMinutes, setShowSettings } = useContext(SettingsContext)

   const [isPause, setIsPause] = useState(true)
   const [mode, setMode] = useState('work')
   const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60)

   // ref
   const secondsLeftRef = useRef(secondsLeft)
   const modeRef = useRef(mode)

   // chengeMode
   const chengeMode = useCallback(() => {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work'
      const nextSeconds = (nextMode === 'work' ? workMinutes : breakMinutes) * 60

      setMode(nextMode)
      modeRef.current = nextMode

      setSecondsLeft(nextSeconds)
      secondsLeftRef.current = nextSeconds
   }, [breakMinutes, workMinutes])

   // step
   const step = () => {
      secondsLeftRef.current = secondsLeftRef.current - 1
      setSecondsLeft(secondsLeftRef.current)
   }

   useEffect(() => {
      const interval = setInterval(() => {
         if(isPause) return
         if(secondsLeftRef.current === 0) {
            return chengeMode()
         }

         step()
      }, 1000)

      return () => {
         clearInterval(interval)
      };
   }, [secondsLeft, isPause, chengeMode])

   const totalSeconds = (mode === 'work' ? workMinutes : breakMinutes) * 60
   const percent = (secondsLeftRef.current / totalSeconds) * 100

   let minutes = Math.floor(secondsLeftRef.current / 60)
   if(minutes < 10) minutes = '0' + minutes

   let seconds = secondsLeftRef.current % 60
   if(seconds < 10) seconds = '0' + seconds

   return (
      <div className='progressBar'>
         <CircularProgressbar value={percent} text={`${minutes}:${seconds}`} styles={buildStyles({
               pathColor: modeRef.current === 'work' ? green : red,
               textColor: modeRef.current === 'work' ? green : red,
               trailColor: 'rgba(255,255,255,.2)',
         })}/>
      <div>
         {isPause
         ?
         <Playbutton onClick={() => setIsPause(false)}/>
         :
         <Pausebutton onClick={() => setIsPause(true)}/>}
      </div>
      <div>
         <Settingsbutton onClick={() => setShowSettings(true)} />
      </div>
   </div>
   );
}

export default Progressbar;
