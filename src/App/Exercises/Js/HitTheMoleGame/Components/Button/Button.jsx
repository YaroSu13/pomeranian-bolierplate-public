import './styles.css';
import { useState } from 'react';

export const Button = ({value, variant= 'primary', onClick}) => {
  
  if (
    !(variant === 'primary' || variant === 'secondary' || variant === 'tertiary')
  )console.log('Bledny parametr variant', variant);
  
    return (
        <button className = {`mole-button mole-button--${variant}` } onClick={onClick }>{value}</button>
    )
}