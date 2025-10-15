
import "./Project.css";

export default function ImproveYoutubePage() {
  return (
    <div className="project-page">
        <div className ="content-container">
          <div className="scroll-container">
            <div className ="header header-youtube" style= {{paddingLeft: "20px"}}>ImproveYoutube!</div>
            <div className="two-section-container-vertical">
              <div className="section-text">
                <div className="text">
                      I contributed to the open-source browser extension "ImproveYouTube!" 
                      by forking the project and adding a new color theme while ensuring text readability across all themes and system light/dark modes. 
                      Solved issue across themes.  <br/>  <br/>
                </div>
                <div className="two-section-container-horizontal">
                  <div className="flex-element">
                    <div className="text">
                      My Contributions: 
                    </div>
                    <ul className="text">
                      <li>Added a new color theme "Pink" and popup selection</li>
                      <li>Identified and solved issues with text not affected by regular CSS, due to inline styles on certain elements. </li>
                      <li>Applied colors to inline-styled text via JavaScript</li>
                      <li>Handled dynamically loaded content with observers and event listeners</li>
                    </ul>
                  </div>
                  <div className="divider"></div>
                  <div className="text flex-element"> 
                    <br/> 
                    Technologies: JavaScript, CSS, DOM manipulation  <br/>  <br/>
                    Learnings: Working with dynamic DOM content and exploring open-source project structure. Maintenance, understanding a code base. <br/>  <br/>
                    Link: <a href="https://github.com/antr0380/youtube" target="_blank" className="link link-pink" rel="noopener noreferrer">GitHub fork</a>
                  </div>
                </div>
              </div>
              <div className="section-images">
                <div className="two-section-container-horizontal">
                  <img src="/images/youtube_popup.png" className="youtube-popup-img"/>
                  <img src="/images/youtube.png" className="youtube-img"/>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}