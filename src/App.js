import './App.scss'
import Timer from './pages/CountdownTimer/CountdownTimer'
import 'materialize-css' //скрипты которые оживят некоторые инпуты
import { Switch, Route, Redirect } from 'react-router-dom';
import Stopwatch from './pages/Stopwatch/Stopwatch';
import Pomodoro from './pages/Pomodoro/Pomodoro';
import Header from './component/Header/Header';

function App() {
  return (
    <div >
      <Header/>
      <Switch>
        <Route path='/' exact component={Timer}/>
        <Route path='/stopwatch' exact component={Stopwatch}/>
        <Route path='/pomodoro' exact component={Pomodoro}/>
        <Redirect to='/'/>
      </Switch>
    </div>
  );
}

export default App;
