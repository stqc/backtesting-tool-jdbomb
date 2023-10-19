import React from 'react'
import { createRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createChart,update , getNextCandle} from './component/chart'

export var updateNextCandleTime;
function App() {
  var symbol=createRef();
  var startTime = createRef();
  var endTime = createRef();
  var tf = createRef();
  const [lastCandle,updateLastCandle]=React.useState(0)
  updateNextCandleTime=updateLastCandle;
  return (
    <>
    <h1>Backtesting Tool</h1>
    <h3> By JDBomb</h3>
      <div style={{width:"100%"}}>
          <div className='chart' id="charts" style={{margin:"0 auto",width:"80%", height:"500px", border:"2px solid grey"}}>

          </div>
          <button onClick={()=>{getNextCandle(tf.current.value,lastCandle,symbol.current.value)}}>Next Candle</button>
          <div className='info'>
            <input type='text' ref={symbol} placeholder='Enter Symbol (example BTCUSDT, ETHUSDT, SOLUSDT etc)'></input>
            <p>Select Start Date Time </p>
            <input type='datetime-local' ref={startTime}></input>
            <p>Select End Date Time </p>
            <input type='datetime-local' ref={endTime}></input>
            <select ref={tf}>
              <option>Choose a Time Frame</option>
              <option>1m</option>
              <option>5m</option>
              <option>15m</option>
              <option>30m</option>
              <option>1h</option>
              <option>4h</option>
              <option>6h</option>
              <option>12h</option>
              <option>1d</option>
              <option>1w</option>
            </select>
            <button onClick={async()=>{
              await createChart(tf.current.value,startTime.current.value,endTime.current.value,symbol.current.value);
              await update(tf.current.value,startTime.current.value,endTime.current.value,symbol.current.value)
            }}>Start Backtesting</button>
          </div>
      </div>
    </>
  )
}

export default App
