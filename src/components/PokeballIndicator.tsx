import React from 'react';
import "./PokeballIndicator.css"

// importing image
import Pokeball from '../assets/Pokeball.png';

interface PokeballProps {
  displayLeft: boolean;
  hidden: boolean;
}

const PokeballIndicator: React.FC<PokeballProps> = ({ displayLeft, hidden }) => {
  const positionClass = displayLeft ? "pokeball-left" : "pokeball-right";
  const hiddenClass = hidden ? 'pokeball-hidden' : '';
  const combinedClasses = `pokeball ${positionClass} ${hiddenClass}`;
  
  return <img className={combinedClasses} src={Pokeball} alt="Pokeball" />;
}

export default PokeballIndicator;
