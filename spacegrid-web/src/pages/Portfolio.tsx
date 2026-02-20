interface TerritoryCardProps {
  id: string;
  hash: string;
  area: string;
  date: string;
  vertices: number;
  dividends: string;
}

function generatePolygonPoints(n: number): string {
  const points: string[] = [];
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const r = 30 + Math.random() * 15;
    points.push(`${(50 + Math.cos(angle) * r).toFixed(1)},${(50 + Math.sin(angle) * r).toFixed(1)}`);
  }
  return points.join(" ");
}

const TerritoryCard = ({ id, hash, area, date, vertices, dividends }: TerritoryCardProps) => (
  <div className="surface-panel rounded-lg p-4 card-hover">
    <div className="h-32 mb-3 border border-border rounded-lg flex items-center justify-center bg-muted/30 relative overflow-hidden">
      <svg viewBox="0 0 100 100" className="w-full h-full opacity-30 group-hover:opacity-60 transition-all">
        <polygon points={generatePolygonPoints(vertices)} fill="hsl(256 99% 56% / 0.08)" stroke="hsl(256 99% 56% / 0.5)" strokeWidth="0.8" />
      </svg>
      <span className="absolute top-2 left-2 text-[9px] text-muted-foreground font-space-mono bg-background/80 px-1.5 py-0.5 rounded">RWA #{id}</span>
    </div>
    <div className="space-y-1 font-space-mono text-[11px]">
      <div className="flex justify-between"><span className="text-muted-foreground">HASH</span><span className="text-primary truncate ml-2 max-w-[140px]">{hash}</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">AREA</span><span>{area} km²</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">VERTICES</span><span>{vertices}</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">MINTED</span><span>{date}</span></div>
      <div className="flex justify-between border-t border-border pt-1 mt-1">
        <span className="text-muted-foreground">DIVIDENDS</span>
        <span className="text-primary font-bold">{dividends} CTC/epoch</span>
      </div>
    </div>
  </div>
);

const territories = [
  { id: "0042", hash: "0x7f3a9b2c...d4e8f1a6", area: "0.847", date: "2025.11.23", vertices: 6, dividends: "12.4" },
  { id: "0039", hash: "0xa1c3e5f7...b9d2f4e6", area: "1.203", date: "2025.11.19", vertices: 8, dividends: "18.7" },
  { id: "0035", hash: "0x3d5f7a9c...e1f3b5d7", area: "0.512", date: "2025.11.14", vertices: 5, dividends: "8.1" },
  { id: "0028", hash: "0xb2d4f6a8...c3e5f7a9", area: "2.341", date: "2025.10.30", vertices: 10, dividends: "31.2" },
  { id: "0024", hash: "0xe4f6a8c2...d5f7b9e1", area: "0.673", date: "2025.10.22", vertices: 7, dividends: "10.8" },
  { id: "0019", hash: "0xf5a7c9e1...b3d5f7a2", area: "1.567", date: "2025.10.11", vertices: 9, dividends: "22.3" },
];

const Portfolio = () => {
  const totalArea = territories.reduce((s, t) => s + parseFloat(t.area), 0).toFixed(3);
  const totalDividends = territories.reduce((s, t) => s + parseFloat(t.dividends), 0).toFixed(1);

  return (
    <div className="min-h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [background-position:0_0,10px_10px] section-spacing">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <p className="font-space-mono text-xs text-muted-foreground tracking-widest mb-2">RWA INVENTORY // POLYGON NFT STORAGE</p>
          <h2 className="font-lufga">Territory Vault</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "TOTAL TERRITORIES", value: territories.length.toString() },
            { label: "TOTAL AREA", value: `${totalArea} km²` },
            { label: "PASSIVE DIVIDENDS", value: `${totalDividends} CTC/epoch`, highlight: true },
            { label: "VAULT STATUS", value: "SECURED" },
          ].map((m) => (
            <div key={m.label} className="surface-panel rounded-lg p-4 text-center">
              <div className={`font-space-mono text-lg font-bold mb-1 ${m.highlight ? "text-primary" : ""}`}>{m.value}</div>
              <div className="font-space-mono text-[10px] text-muted-foreground tracking-wider">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {territories.map((t) => <TerritoryCard key={t.id} {...t} />)}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
