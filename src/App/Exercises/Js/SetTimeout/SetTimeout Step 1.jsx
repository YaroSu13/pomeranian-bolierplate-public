import { useState } from 'react'
import './styles.css';

export const SetTimeout = () => {
  const [value, setValue] = useState(0);
  console.log ('Pierwsza Wiadomosc', value);

  const abc = '333';

  function handleOnClick(){
    console.log('klieknięto');
    setValue(value + 1);
  }
  return <div>
    <h1>useEffect, setTimeout, setInterval</h1>
    <p>Value = {value}</p>
    <button onCLick={handleOnClick}>CLICK</button>
  </div>;
};
