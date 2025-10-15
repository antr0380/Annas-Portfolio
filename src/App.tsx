
import './App.css'
import AnimatedBackground from './Components/AnimatedBackground'
import Gallery from './Components/Gallery'
import { Routes, Route } from "react-router-dom";
import ProjectPage from "./Components/ProjectPage";

function App() {

  return (
  <div>
    <AnimatedBackground />
    <div className="text credits">Website by Anna Trägårdh</div>
    <div className ="parent-container">
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/project/:title" element={<ProjectPage />} />
      </Routes>
    </div>
    
  </div>
  )
}

export default App


