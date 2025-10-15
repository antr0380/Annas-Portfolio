
import "./Project.css";

export default function ThisSitePage() {
  return (
    <div className="project-page">
      <div className ="content-container">
        <div className ="two-section-container-horizontal">
          <div className ="section-sheep-text">
            <div className ="header">Portfolio website</div>
            <div className ="text">
              <br/>
              <br/>
              Making this website was really fun!<br/>
              I created this portfolio website to showcase my programming projects in an interactive and visually appealing way. 
              I especially liked making the animated background (using assets by). It was also the most challenging and time-consuming part. I feel more confident in my frontend skills now! <br/><br/>
              
              Tech stack:
              React, TypeScript, CSS, Vite(?) <br/><br/>

              Learnings: Frontend design, Integration of embedded games, Animation, (pixel asset modification aseprite) <br/><br/>

              Links:<br/>
              Github link: obs fel länk! <br/>
              Credits: Using png assets by: bleh. lägg in länk <br/><br/>
              <br/><br/>
              Psst! Click on a sheep.<br/><br/>

            </div>
          </div>
          <div className="section-sheep-images">
            <img src="/images/sheep.png" className="sheep-img"/>
          </div>
        </div>
      </div>
    </div>
  );
}