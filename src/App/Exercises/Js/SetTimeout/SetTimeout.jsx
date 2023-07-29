import { useState } from 'react';
import { useEffect } from 'react';
import './styles.css';
import { cleanup } from '@testing-library/react';

export const SetTimeout = () => {
  const [value, setValue] = useState(0);
  const [progress, setProgress] = useState(10);

  function handleOnClick(){
    console.log('klieknięto');
    setValue(value + 1);
  }

useEffect(() => {
  console.log('Jestem funkcja effectCallback');

const id = setTimeout(() => {
  console.log('Zwiekszam rozmiar Progress Bar', value);
  setProgress(value);
}, 2000);
function cleanUp(){
  console.log('Sprzatam');
}
return cleanup;
  //setProgress(value);
}, [value]);


console.log('Pierwsza wiadomosc', value, progress);
  return (<div>
    <h1>useEffect, setTimeout, setInterval</h1>
    <p>Value = {value}</p>
    <button onCLick={handleOnClick}>CLICK</button>
    <div style={{ backgroundColor: 'red', width: progress}}>.</div>
  </div>
  );
};
