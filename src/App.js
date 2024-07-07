import {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [myTime, setMyTime] = useState(new Date());
  useEffect(()=>{
    const timer = setInterval(() => {
      setMyTime(new Date());
      return ()=> clearInterval(timer);
    }, 1000);
  },[]);

  const leadingZero = (digit) => {
    return digit < 10 ? `0${digit}` : digit;
  }

  const timeFormat = (Hour) => {
    return Hour === 0 ? 12 : Hour > 12 ? Hour - 12 : Hour;
  }
  
  const options = {weekday : "long", year : "numeric", month : "long", day : "numeric"}
  const dateFormat = (date) => {
    return date.toLocaleDateString(undefined, options);
  }

  return (
    <div className="App">
      <div className="clock">
        <h2>My Clock</h2>
        <b className='CurrentTime'>
          {leadingZero(timeFormat(myTime.getHours()))} : 
          {leadingZero(myTime.getMinutes())} :
          {leadingZero(myTime.getSeconds())}
          {myTime.getHours() >= 12 ? " PM" : " AM"}
        </b>
        <p className='day'>
          {dateFormat(myTime)}
        </p>
      </div>
    </div>
  );
}

export default App;
