import './styles.css';
import { useEffect, useState } from 'react';

export const JsAnimation = ({ duration = 5000 }) => {
  const startSize = 10;
  const endSize = 100;
  const [size, setSize] = useState(startSize);
  const distance = (endSize - startSize) * 2;
  const noOfSteps = 20;
  const stepSize = Math.round(distance / noOfSteps);
  const midWay = startSize + (stepSize * (noOfSteps / 2));
  const stepInterval = Math.round(duration / noOfSteps); 
  const [isIncrementing, setisIncrementing] = useState(true);
useEffect(() => {
  function increment() {
    setSize((currentSize) => currentSize + startSize);
  }
  function decrement() {
    setSize((currentSize) => currentSize - startSize)
  }
  return 
}, [stepInterval, stepSize])

  return (
    <div>
    <h1>Ćwiczenie - animacja</h1>
  <div>
    <p style ={{backgroundColor: 'lightblue', width: size, height: size}}></p>
  </div>
  </div>
  );
};  
