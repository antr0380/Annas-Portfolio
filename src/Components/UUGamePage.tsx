
import UUGameEmbed from "./UUGameEmbed";
import "./Project.css";
import { useState } from "react";

export default function UUGamePage() {
  const [isGameLoaded, setIsGameLoaded] = useState(false);
  return (
    <div className="project-page uu-game">
        <div className ="content-container">
          <div className= "scroll-container">
            <div className ="header" style= {{paddingLeft: "20px"}}>UU Game</div>
            <div className="two-section-container-vertical">
              <div>
                <div className="two-section-container-horizontal">
                  <div className="section-text">
                    <div className="text">
                      Two-player strategy board game university project. Game rules given to us. Uppsala University
                      <br/>
                      Group collaboration. Proud of this, fun, spent a lot of time (more than necessary because I thought it was fun). 
                      (mostly on designing and implementing UI and setting up game loop or whatever. Git). First real UI-heavy project.
                      <br/>
                      <br/>
                      Technologies: Python, Pygame, Object-oriented programming
                      <br/>
                      <br/>
                      Learnings: UI design using figma, game-loop (fråga gpt vad den skulle sagt om det), collaboration, git, agile
                      <br/>
                      <br/>
                      Github: Private GitHub repository — access available upon request.
                    </div>
                  </div>
                  <div className="section-images">
                    <img src="/images/uu_game_gameplay.png" className="uu-game-img"/>
                  </div>
                </div>
              </div>
              <div className="text">
                <br/>
                ↓↓↓ Scroll down to play the game! ↓↓↓
                <br/>
                <br/>
              </div>
              <div className="uu-game-section">
                <div className="text"> </div>
                {!isGameLoaded ? (
                  <button
                    className="button button-load"
                    onClick={() => setIsGameLoaded(true)}
                  >
                    ▶ Load Game <br/><br/>
                    OBS loud sound.
                  </button>
                ) : (
                  <>
                    <div className="two-section-container-vertical">
                      <button
                        className="button button-unload"
                        onClick={() => setIsGameLoaded(false)}
                      >
                          ✖ Unload Game
                      </button>
                      <UUGameEmbed />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
