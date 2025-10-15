
import BilliardsVideo from "../assets/billiards.mp4";

export default function VideoComponent() {
  return (
    <div>
      <video
        src={BilliardsVideo}
        controls   // visar play/pause m.m.
        className="billiards-video"
        autoPlay={false} 
        loop={false} 
        muted
      />
    </div>
  );
}