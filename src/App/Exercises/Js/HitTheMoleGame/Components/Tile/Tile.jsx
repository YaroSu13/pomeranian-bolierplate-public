import './styles.css';
import { useState } from 'react';

export const Tile = ({hasMole, variant= 'neutral', onClick}) => {
  
  if (
    !(variant === 'correct' || variant === 'incorrect' || variant === 'neutral')
  )console.log('Bledny parametr variant', variant);

    let moleClass = ' ';
    if(hasMole) moleClass='mole-tile--has-mole';

    return (
        <div className = {`mole-tile mole-tile--${variant} ${moleClass}`} onClick={onClick }/>
    )
}