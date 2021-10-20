import React, { useState } from 'react'
import './pomodoro.scss'
import 'react-circular-progressbar/dist/styles.css'
import Settings from '../../component/Settings'
import Progressbar from '../../component/ProgressBar'
import SettingsContext from '../../utils/settingsContext'


const Pomodoro = () => {
   const [showSettings, setShowSettings] = useState(false)
   const [workMinutes, setWorkMinutes] = useState(45)
   const [breakMinutes, setBreakMinutes] = useState(15)

   return (
      <SettingsContext.Provider value={{
         workMinutes,
         setWorkMinutes,
         breakMinutes,
         setBreakMinutes,
         setShowSettings
      }}>
         <div className='pomodoro'>
            <div className='container'>
               {showSettings ? <Settings/> : <Progressbar/>}
            </div>
         </div>
      </SettingsContext.Provider>
   );
}

export default Pomodoro;