import React, { useContext } from 'react'
import ReactSlider from 'react-slider'
import SettingsContext from '../utils/settingsContext'
import Backbutton from './BackButton'

const Settings = () => {
   const { workMinutes, setWorkMinutes, setBreakMinutes, breakMinutes, setShowSettings } = useContext(SettingsContext);

   return (
      <div className='settings'>
         <div className='settings_title'>Set work and break minutes</div>
         <label htmlFor="">work: {workMinutes}:00</label>
            <ReactSlider
               className={'settings_slider greenColor'}
               thumbClassName={'thumb greenColor'}
               trackClassName={'track'}
               value={workMinutes}
               onChange={newValue => setWorkMinutes(newValue)}
               min={1}
               max={120}/>
         <label htmlFor="">break: {breakMinutes}:00</label>
         <ReactSlider
               className={'settings_slider'}
               thumbClassName={'thumb'}
               trackClassName={'track'}
               value={breakMinutes}
               onChange={newValue => setBreakMinutes(newValue)}
               min={1}
               max={120}/>
         <div className='settings_backButton'>
            <Backbutton onClick={() => setShowSettings(false)} />
         </div>
      </div>
   );
}

export default Settings;
