import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./RedirectButtons.css";

interface RedirectButtonsProps {
  pokemon_name: string;
  player: string;
}

const ChessGameButtons: React.FC = () => {
  const navigate = useNavigate();
  const { pokemon_name, player } = useParams();
  const location = useLocation();

  const handleChangePlayer = () => {
    const link = otherPlayerLink();
    navigate(link);
  };

  const otherPlayerLink = () => {
    const newPlayer = player === "black" ? "white" : "black";
    return `/${pokemon_name}/${newPlayer}`;
  };

  const handleInviteUrl = () => {
    const url = window.location.origin + otherPlayerLink();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("URL copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy URL: ", err);
          fallbackCopyTextToClipboard(url);
        });
    } else {
      fallbackCopyTextToClipboard(url);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      const msg = successful
        ? "URL copied to clipboard!"
        : "Unable to copy URL";
      alert(msg);
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
  };

  return (
    <div className="redirect-container">
      <button onClick={handleChangePlayer} className="redirect-btn">
        Change Player
      </button>
      <button onClick={handleInviteUrl} className="redirect-btn">
        Copy Invite
      </button>
    </div>
  );
};

export default ChessGameButtons;
