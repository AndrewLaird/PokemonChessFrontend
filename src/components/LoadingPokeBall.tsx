import React, { useState, useEffect } from "react";
import "./PokeballIndicator.css";
// importing image
import Pokeball from "../assets/Pokeball.png";

interface PokeballProps {
}

const PokeballIndicator: React.FC<PokeballProps> = ({}) => {
  return <img className="pokeball pokeball-spinning" src={Pokeball} alt="Pokeball" />;
};

export default PokeballIndicator;
