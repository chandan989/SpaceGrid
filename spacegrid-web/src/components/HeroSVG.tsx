const HeroSVG = () => (
  <svg viewBox="0 0 500 500" className="w-full h-full max-w-md mx-auto" fill="none">
    {/* Outer orbit */}
    <g className="orbit" style={{ transformOrigin: "250px 250px" }}>
      <circle cx="250" cy="250" r="200" stroke="hsl(256 99% 56% / 0.15)" strokeWidth="1" fill="none" />
      <circle cx="250" cy="50" r="6" fill="hsl(256 99% 56% / 0.6)" />
      <circle cx="450" cy="250" r="4" fill="hsl(256 99% 56% / 0.4)" />
    </g>

    {/* Inner orbit reverse */}
    <g className="orbit-reverse" style={{ transformOrigin: "250px 250px" }}>
      <circle cx="250" cy="250" r="140" stroke="hsl(256 99% 56% / 0.1)" strokeWidth="1" fill="none" />
      <circle cx="250" cy="110" r="5" fill="hsl(256 99% 56% / 0.5)" />
      <circle cx="110" cy="250" r="3" fill="hsl(256 99% 56% / 0.3)" />
    </g>

    {/* Center hexagon */}
    <g className="pulse-anim" style={{ transformOrigin: "250px 250px" }}>
      <polygon
        points="250,180 310,215 310,285 250,320 190,285 190,215"
        fill="hsl(256 99% 56% / 0.08)"
        stroke="hsl(256 99% 56% / 0.4)"
        strokeWidth="1.5"
      />
    </g>

    {/* Inner polygon */}
    <polygon
      points="250,210 280,230 280,270 250,290 220,270 220,230"
      fill="hsl(256 99% 56% / 0.12)"
      stroke="hsl(256 99% 56% / 0.6)"
      strokeWidth="1"
    />

    {/* Center diamond */}
    <path d="M250 230L265 250L250 270L235 250Z" fill="hsl(256 99% 56%)" />
    <circle cx="250" cy="250" r="4" fill="white" />

    {/* Grid lines */}
    <line x1="100" y1="250" x2="400" y2="250" stroke="hsl(256 99% 56% / 0.06)" strokeWidth="1" />
    <line x1="250" y1="100" x2="250" y2="400" stroke="hsl(256 99% 56% / 0.06)" strokeWidth="1" />
    <line x1="130" y1="130" x2="370" y2="370" stroke="hsl(256 99% 56% / 0.04)" strokeWidth="1" />
    <line x1="370" y1="130" x2="130" y2="370" stroke="hsl(256 99% 56% / 0.04)" strokeWidth="1" />

    {/* Scattered dots */}
    <circle cx="160" cy="160" r="2" fill="hsl(256 99% 56% / 0.3)" />
    <circle cx="340" cy="160" r="2" fill="hsl(256 99% 56% / 0.3)" />
    <circle cx="340" cy="340" r="2" fill="hsl(256 99% 56% / 0.2)" />
    <circle cx="160" cy="340" r="2" fill="hsl(256 99% 56% / 0.2)" />
  </svg>
);

export default HeroSVG;
