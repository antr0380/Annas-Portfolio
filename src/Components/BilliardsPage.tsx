
import "./Project.css";
import VideoComponent from "./BilliardsVideoComponent";

export default function BilliardsPage() {
  return (
    <div className="project-page">
      <div className ="content-container">
        <div className ="header" style= {{paddingLeft: "40px"}} >Billiards</div>
          <div className="two-section-container-horizontal">
            <div className="section-images section-billiards-video">
              <VideoComponent/>
            </div>
            <div className="section-billiards-text">
              <div className="text">
                <br/>
                <br/>
                Developed a 2D billiards game using Java Swing with realistic ball movement and collision physics.<br/>
                Developed as part of a university course on object-oriented programming. <br/>
                Solo project focused on learning game physics and GUI development in Java and applying object-oriented programming (principles).<br/>
                <br/>
                Features: <br/>
                <ul>
                  <li>Implemented ball physics, collision detection, and friction</li>
                  <li>Designed the GUI and game controls in Swing </li>
                  <li>Added scoring and turn-based logic</li>
                </ul>
                
                Technologies: Java, Swing, Object-Oriented Programming <br/>
                <br/>
                Link: <a href="https://github.com/antr0380/youtube" target="_blank" className="link" rel="noopener noreferrer">Github obs fel länk</a>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}