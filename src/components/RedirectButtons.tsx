import React from 'react';
import { useNavigate, useParams, useLocation  } from 'react-router-dom';
import './RedirectButtons.css';




interface RedirectButtonsProps {
        pokemon_name: string;
        player: string;
}

const ChessGameButtons = () => {
    const navigate = useNavigate();
      const { pokemon_name, player  } = useParams();
        const location = useLocation();

        const handleChangePlayer = () => {
              const link = otherPlayerLink();
              navigate(link);
        };
        const otherPlayerLink = () => {
              const newPlayer = player === 'black' ? 'white' : 'black';
              return `/${pokemon_name}/${newPlayer}`;
        }

        const handleInviteUrl = () => {
              // invite the other player
              const url = window.location.origin + otherPlayerLink();
              
              navigator.clipboard.writeText(url).then(() => {
                      alert('URL copied to clipboard!');
                          
              }).catch(err => {
                      console.error('Failed to copy URL: ', err);
                          
              });
                
        };

        return (
                <div className="redirect-container">
                        <button
                        onClick={handleChangePlayer}
                        className="redirect-btn"
                        >
                                Change Player
                        </button>
                        <button
                        onClick={handleInviteUrl}
                        className="redirect-btn"
                        >
                                Copy Invite
                        </button>
                </div>

        );
        
};

export default ChessGameButtons;
