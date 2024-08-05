import React, { useState } from 'react';
import { generateName, startGame } from '../utils/api_functions';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Tooltip from './Tooltip'; // Import the Tooltip component

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleNewGame = async () => {
        const gameName = await generateName();
        // get the inputs
        const localPlay = document.getElementById('local-play') as HTMLInputElement;
        const criticalHits = document.getElementById('critical-hits') as HTMLInputElement;
        const misses = document.getElementById('miss') as HTMLInputElement;

        console.log("starting game: " + gameName);
        await startGame(
          gameName,
          localPlay.checked,
          criticalHits.checked,
          misses.checked
        );

        navigate(`/${gameName}`);
    };

    return (
        <div className="home-container">
            <h1>Welcome to Pokémon Chess!</h1>
            <button className="new-game-btn" onClick={handleNewGame}>Create a New Game</button>

            <div className="settings-box">
                <div className="settings-container">
                    <h2 className="settings-title">Settings</h2>
                    <div className="setting">
                        <input type="checkbox" id="local-play" />
                        <label htmlFor="local-play">Local Game</label><span className="spacer"></span>
                        <Tooltip content="Board flips after each move, play on the same device">
                            <a href="#" className="info">?</a>
                        </Tooltip>
                    </div>
                    <div className="setting">
                        <input type="checkbox" id="critical-hits" />
                        <label htmlFor="critical-hits">Critical Hits</label><span className="spacer"></span>
                        <Tooltip content="1/10 chance on any hit to be Critical, Critical Hits allow the player another turn">
                            <a href="#" className="info">?</a>
                        </Tooltip>
                    </div>
                    <div className="setting">
                        <input type="checkbox" id="miss" />
                        <label htmlFor="miss">Misses</label><span className="spacer"></span>
                        <Tooltip content="1/16 chance on any hit to be Miss, Misses pass the turn to the opponent, neither piece is damaged">
                            <a href="#" className="info">?</a>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
