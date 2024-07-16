import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Note: In a real project, you'd import the actual image
// import Pokeball from '../assets/Pokeball.png';

interface PokeballProps {
  displayLeft: boolean;
  hidden: boolean;
}

const PokeballIndicator: React.FC<PokeballProps> = ({ displayLeft, hidden }) => {
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    setIsSpinning(true);
    const timer = setTimeout(() => setIsSpinning(false), 1000);
    return () => clearTimeout(timer);
  }, [displayLeft, hidden]);

  const positionClass = displayLeft ? "left-4" : "right-4";
  const hiddenClass = hidden ? 'opacity-0' : 'opacity-100';
  
  return (
    <motion.div
      className={`absolute ${positionClass} bottom-4 ${hiddenClass} transition-opacity duration-300`}
      animate={{ rotate: isSpinning ? 360 : 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <img 
        src="/api/placeholder/50/50" 
        alt="Pokeball" 
        className="w-12 h-12"
      />
    </motion.div>
  );
}

export default PokeballIndicator;
