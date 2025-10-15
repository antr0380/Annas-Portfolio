
import FlappyGameEmbed from "./FlappyGameEmbed";
import "./Project.css";
import { useState } from "react";

export default function FlappyPage() {
  const [isGameLoaded, setIsGameLoaded] = useState(false);
  return (
    <div className="project-page">
        <div className ="content-container">
          <div className= "scroll-container">
            
            <div className="two-section-container-vertical">
              <div>
                <div className="two-section-container-horizontal">
                  <div className="section-text">
                    <div className ="header" style= {{paddingBottom: "20px", paddingTop: "0"}}>Flappy Bird</div>
                    <div className="text">
                      <br/>
                      My first Unity project <br/>
                      Personal projekt  <br/>
                      Syfte: learn Unity for making larger project (picross, see coming soon) and for fun <br/>
                      Visa egna assets som jag skapat (ljudknappen, UI-element) eller bara nämnt här att du skapat dem <br/>
                      Lista var jag fick mina andra assets från? <br/>
                      <br/>
                      Technologies: Unity, C#
                      <br/>
                      <br/>
                      Learnings: Asset creation (fråga gpt)
                      <br/>
                      <br/>
                    </div>
                  </div>
                  <div className="section-images">
                    <img src="/images/flappy_menu.png" className="flappy-img"/>
                    <img src="/images/flappy_gameplay.png" className="flappy-img"/>
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
                    className="button button-load-flappy"
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
                      <FlappyGameEmbed />
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