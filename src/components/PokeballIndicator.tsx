import React, { useState, useEffect } from "react";
import "./PokeballIndicator.css";
// importing image
import Pokeball from "../assets/Pokeball.png";

interface PokeballProps {
  displayLeft: boolean;
  hidden: boolean;
}

const PokeballIndicator: React.FC<PokeballProps> = ({
  displayLeft,
  hidden,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (hidden) {
      return;
    }
    setIsSpinning(true);
    const timer = setTimeout(() => setIsSpinning(false), 1000);
    return () => clearTimeout(timer);
  }, [displayLeft, hidden]);

  const positionClass = displayLeft ? "pokeball-left" : "pokeball-right";
  const hiddenClass = hidden ? "pokeball-hidden" : "";
  const spinningClass = isSpinning ? "pokeball-spinning" : "";
  const combinedClasses = `pokeball ${positionClass} ${hiddenClass} ${spinningClass}`;

  return <img className={combinedClasses} src={Pokeball} alt="Pokeball" />;
};

export default PokeballIndicator;
