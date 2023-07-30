import './styles.css';
import { Label, Button, Output, Result, Tile } from  './Components';
import { useState, useEffect } from 'react';

const MINUTE = 60000; //1 minuta
const DURATIONS = [
  { label: '1 minuta', duration: MINUTE },
  { label: '2 minuty', duration: MINUTE * 2 },
  { label: '3 minuty', duration: MINUTE * 3 },
];

const MOLES = [
  { label: '1 kret', molesNo: 1, tiles: 10, timeVisible: 10000},
  { label: '2 krety', molesNo: 2, tiles: 15, timeVisible: 500},
  { label: '3 krety', molesNo: 3, tiles: 20, timeVisible: 350},
];


export const HitTheMoleGame = () => {
  const [duration, setDuration] = useState();
  const [molesNo, setMolesNo] =useState();
  const [status, setStatus] = useState('notStarted');
  const [timeLeft, setTimeLeft] = useState();
  const [score, setScore] =useState();  
  const [showWarning, setShowWarning] = useState(false);
  const [tiles, setTiles] = useState([]);

  useEffect(()=>{
    console.log('Status sie zmienil', status)
    if (status === 'notStarted'){
     setTimeLeft(0); 
    };
    if(status === 'started'){
      setTimeLeft(duration)
      setTiles(getInitialTiles(molesNo))
      ;
    };
    if(status !== 'finished'){
      setScore(0);
    }
  },[status, duration])

function getInitialTiles(molesNumber){
  const tiles = MOLES.find((mole) => mole.molesNo === molesNumber).tiles;
  return Array(tiles).fill(0);
}


  function formatTime(time) {
    const timeInSeconds = Math.round(time/1000);
    const timeInMinutes = Math.round(timeInSeconds / 60).toString();
    const seconds = Math.round(timeInSeconds % 60);
    return `${timeInMinutes} : ${seconds}`
  }

  function settingsValidation(){
    if (duration > 0 && molesNo > 0 ){
      return false
    }
    else {
      return true
    }
  }

  function handleStart(){
    const validation = settingsValidation();
    if (validation === false){
      setStatus('started');
      setShowWarning(false);
    }
    else{
      setShowWarning(true);
    }
  }



  return (
     <div>
      <h1>Kret</h1>
      <p>Gra polegająca na podążaniu za krecikiem i trafieniu na kwadrat, w którym się pojawił. </p>
      {showWarning && <p className='mole-warning'>Brak Ustawień gry</p>} 
      
      <Result duration={formatTime(duration)} score={score} />
      <p>duration:{duration} </p>
      <p>ilosc kretow:{molesNo}</p>
      <p>Status: {status}</p>
      <p>timeLeft:</p>
      <p>Tiles:{JSON.stringify(tiles)}</p>
      <div className='game-time' >
        < Label value = 'CZAS GRY' />
        {DURATIONS.map((item) => < Button key={item.label} value = {item.label} variant={item.duration !== duration ? 'primary' : 'secondary'} onClick={()=>setDuration(item.duration)} /> )}
      </div>

      <div className='moles-no'>
        < Label value = 'LICZBA KRETÓW' />
        {MOLES.map((item) => < Button key={item.label} value = {item.label} variant={item.molesNo !== molesNo ? 'primary' : 'secondary'} onClick={()=>setMolesNo(item.molesNo)} />)}
      </div>

      <div className='control-buttons'>
        < Label value = ' PRZYCISKI STERUJĄCE' />
        < Button onClick={handleStart} value={'START'} />
      </div>

      <div>
        < Label value='CZAS DO KOŃCA' />
        < Output value = {formatTime (timeLeft)} />
     </div>

     <div>
        < Label value='WYNIK' />
        < Output value = {score} />
     </div>

     <div>
        < Label value = ' PRZYCISKI STERUJĄCE' />
        <Button onClick={() => setStatus('notStarted')} value={'STOP'} variant='tertiary' />
      </div>

    <div>
      < Tile />
      < Tile hasMole variant='correct' />
      < Tile hasMole variant='incorrect' />
      < Tile hasMole variant='neutral' />
    </div>
    </div>
    );
};
