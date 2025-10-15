
function UUGameEmbed() {
  // Sökvägen måste vara relativ till din React-apps rot/public-mapp
  const gameUrl = import.meta.env.BASE_URL + 'UUGame/web/index.html';

  return (
    <iframe
      src={gameUrl}
      title="Ditt Pygame-spel"
      style={{ border: 'none', width: '57vw', height: '86vh' }}
    />
  );
}

export default UUGameEmbed;