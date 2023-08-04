import './styles.css';
import { Label, Button, Output, Result, Tile } from  './Components';
import { useState, useEffect } from 'react';
import { formatTime, getNewMolePosition } from './Utils';


const MINUTE = 5000; //1 minuta
const HIGHLIGHT_TIME = 500; // 0.5 sekundy
const DURATIONS = [
  { label: '1 minuta', duration: MINUTE + 1 },
  { label: '2 minuty', duration: MINUTE * 2 + 100 },
  { label: '3 minuty', duration: MINUTE * 3 + 100 },
];

const MOLES = [
  { label: '1 kret', molesNo: 1, tiles: 10, timeVisible: 10000},
  { label: '2 krety', molesNo: 2, tiles: 15, timeVisible: 500},
  { label: '3 krety', molesNo: 3, tiles: 20, timeVisible: 350},
];


export const HitTheMoleGame = () => {
  const [duration, setDuration] = useState();
  const [prevDuration, setPrevDuration] = useState();
  const [molesOption, setMolesOption] =useState();
  const [status, setStatus] = useState('notStarted');
  const [timeLeft, setTimeLeft] = useState();
  const [score, setScore] =useState();  
  const [showWarning, setShowWarning] = useState(false);
  const [tiles, setTiles] = useState([]);
  const [intervalId, setIntervalId] = useState();
  const [molePosition, setMolePosition] = useState();
  const [correct, setCorrect] = useState();
  const [incorrect, setIncorrect] = useState();
 

  function startCountDown(){
    const id = setInterval(() => setTimeLeft((prev) => prev - 100 ), 100);
    setIntervalId(id);
  }
      
 useEffect(() => {
  if (timeLeft <= 0){
    clearInterval(intervalId);
    setStatus('finished');
    setDuration('undefined');
    setMolesOption('undefined');
  }
 }, [intervalId, timeLeft] );
 
 useEffect(() => {
  let timeoutId;
  if (correct !== undefined) {
    timeoutId = setTimeout(() => setCorrect(undefined), HIGHLIGHT_TIME);
  }
  return () => clearTimeout(timeoutId);
}, [correct]);

useEffect(() => {
  let timeoutId;
  if (incorrect !== undefined) {
    timeoutId = setTimeout(() => setIncorrect(undefined), HIGHLIGHT_TIME);
  }
  return () => clearTimeout(timeoutId);
}, [incorrect]);

  function getInitialTiles(molesOption) {

    // const tiles = MOLES.find((mole) => mole.molesNo === molesNumber).tiles;
    return Array(molesOption.tiles)
    .fill(0)
    .map((tile, index) => ({ index }));
  }

 
  // function settingsValidation(){
  //   if (duration > 0 && molesNo > 0 ){
  //     return false
  //   }
  //   else {
  //     return true
  //   }
  // }

  function handleStart(){
    // const validation = settingsValidation();
    if (duration && molesOption){
      setStatus('started');
      setShowWarning(false);
      setTimeLeft(duration);
      setPrevDuration(duration);
      setTiles(getInitialTiles(molesOption));
      setScore(0);
      startCountDown();
      setMolePosition(getNewMolePosition(molePosition, molesOption.tiles));
    }
    else{
      setShowWarning(true);
    }
  }

function handleStop(){
  setStatus('notStarted');
  clearInterval(intervalId);
  setMolesOption('undefined');
}

function handleTileClick(index){
  if (molePosition === index){
    setCorrect(index);
    setScore((prev) => prev + 1 );
    setMolePosition(getNewMolePosition(index, molesOption.tiles));
  }
  else{
    setIncorrect(index);
    setScore((prev) => prev - 1 );
  }
}

function getTileVariant(index) {
  if (index === correct) return 'correct';
  if (index === incorrect) return 'incorrect';
  return 'neutral';
}

  return (
     <div>
      <h1>Kret</h1>
      <p>Gra polegająca na podążaniu za krecikiem i trafieniu na kwadrat, w którym się pojawił. </p>
      {showWarning && <p className='mole-warning'>Brak Ustawień gry</p>} 
      
      { status === 'finished' && <Result duration={formatTime(prevDuration)} score={score} />}
      <p>duration:{duration}, ilosc kretow:{molesOption && molesOption.molesNo}, Status: {status}, timeLeft:, Tiles:{JSON.stringify(tiles)}</p>
      {status !== 'started' && <>
      <div className='game-time' >
        < Label value = 'CZAS GRY' />
        {DURATIONS.map((item) => < Button key={item.label} value = {item.label} variant={item.duration !== duration ? 'primary' : 'secondary'} onClick={()=>setDuration(item.duration)} /> )}
      </div>

      <div className='moles-no'>
        < Label value = 'LICZBA KRETÓW' />
        {MOLES.map((item) => < Button key={item.label} value = {item.label} variant={molesOption && (item.molesNo !== molesOption.molesNo ? 'primary' : 'secondary')} onClick={()=>setMolesOption(item)} />)}
      </div>

      <div className='control-buttons'>
        < Label value = ' PRZYCISKI STERUJĄCE' />
        < Button onClick={handleStart} value={'START'} />
      </div></>}
{status === 'started' && <>
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
        < Button 
          onClick={handleStop} 
          value={'STOP'} 
          variant='tertiary' 
        />
      </div>
      </>};
      <div>
        {status === 'started' && (
          <div className='mole-board'>
            {tiles.map(({index}) => (
              < Tile key={index} onClick={() => handleTileClick(index)} hasMole={index === molePosition} variant= {getTileVariant(index)}/>
            ))}
            </div>
        )}
      </div>
    <div>
    
    </div>
    </div>
    );
};
