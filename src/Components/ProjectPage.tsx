import { useParams } from "react-router-dom";
import UUGamePage from "./UUGamePage";
import FlappyPage from "./FlappyPage";
import BilliardsPage from "./BilliardsPage";
import PicrossPage from "./PicrossPage";
import BudgetBitesPage from "./BudgetBitesPage";
import ThisSitePage from "./ThisSitePage";
import ImproveYoutubePage from "./ImproveYoutubePage";

export default function ProjectPage() {
  const { title } = useParams<{ title?: string }>();
  if (!title) return <p>Ingen titel angiven.</p>;

  const decodedTitle = decodeURIComponent(title);

  const pages: Record<string, JSX.Element> = {
    "UU Game": <UUGamePage />,
    "Flappy Bird": <FlappyPage />,
    "Billiards": <BilliardsPage />,
    "Picross (under development)": <PicrossPage />,
    "This Site": <ThisSitePage />,
    "ImproveYoutube!": <ImproveYoutubePage />,
  };

  return pages[decodedTitle];
}