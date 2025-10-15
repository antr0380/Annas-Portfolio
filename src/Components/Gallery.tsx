import "./Gallery.css";
import { useNavigate } from "react-router-dom";

function Gallery() {
    const navigate = useNavigate();
  const images = [
    {src: "images/uu_game_thumbnail1.png", title: "UU Game"},
    {src: "images/flappy_gameplay.png", title: "Flappy Bird"},
    {src: "images/youtube.png", title: "ImproveYoutube!"},
    {src: "images/this_site.png", title: "This Site"},
    {src: "images/billiards2.png", title: "Billiards"},
    {src: "images/pyramider.jpeg", title: "Picross (under development)"},
  ];

  return (
    <div>
      <div className="title-container">
        <h1>ANNA'S PORTFOLIO</h1>
      </div>
      <div className= "gallery-container">
          <div className="gallery">
          {images.map((img, i) => (
              <div
              key={i}
              className="thumbnail"
              onClick={() => navigate(`/project/${encodeURIComponent(img.title)}`)}
              >
              <img src={img.src} alt={`Bild ${i + 1}`} />
              <p className="text caption">{img.title}</p>
              </div>
          ))}
          </div>
      </div>
    </div>
  );
}

export default Gallery;