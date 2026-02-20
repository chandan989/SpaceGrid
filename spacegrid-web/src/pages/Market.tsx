import { Shield, Eye, Lightning, Skull, Rocket, Target } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TacticCardProps {
  name: string;
  description: string;
  cost: string;
  icon: ReactNode;
  tier: string;
  cooldown: string;
}

const TacticCard = ({ name, description, cost, icon, tier, cooldown }: TacticCardProps) => (
  <div className="surface-panel rounded-lg p-6 card-hover">
    <div className="flex items-start justify-between mb-4">
      <div className="text-primary">{icon}</div>
      <span className="text-[10px] text-muted-foreground border border-border px-2 py-0.5 rounded font-space-mono tracking-wider">
        {tier}
      </span>
    </div>
    <h3 className="font-lufga text-lg font-bold mb-1">{name}</h3>
    <p className="text-xs text-muted-foreground font-space-mono mb-4 leading-relaxed">{description}</p>
    <div className="flex justify-between text-xs font-space-mono mb-4 text-muted-foreground">
      <span>COOLDOWN</span>
      <span className="font-bold text-foreground">{cooldown}</span>
    </div>
    <div className="flex items-center justify-between border-t border-border pt-4">
      <span className="font-space-mono text-lg font-bold text-primary">{cost} CTC</span>
      <button className="btn-primary text-[10px] px-4 py-2">ACQUIRE</button>
    </div>
  </div>
);

const tactics = [
  { name: "QUANTUM SHIELD", description: "Deploys a 24-hour interference barrier around your active territory. Blocks disruption pulses from hostile operators.", cost: "250", icon: <Shield size={28} weight="duotone" />, tier: "TIER I", cooldown: "24H" },
  { name: "STEALTH CLOAK", description: "Renders your trail emissions invisible to nearby runners for 12 hours. GPS signature masked from all grid scanners.", cost: "180", icon: <Eye size={28} weight="duotone" />, tier: "TIER II", cooldown: "12H" },
  { name: "DISRUPTION PULSE", description: "Emits a localized EMP that fragments enemy trail data within 500m radius. Resets their loop progress by 25%.", cost: "400", icon: <Lightning size={28} weight="duotone" />, tier: "TIER III", cooldown: "48H" },
  { name: "TERRITORY SIEGE", description: "Initiates hostile takeover protocol on unclaimed territory. Requires 72-hour sustained presence within target zone.", cost: "800", icon: <Skull size={28} weight="duotone" />, tier: "TIER IV", cooldown: "72H" },
  { name: "TRAIL ACCELERATOR", description: "Doubles quantum trail emission rate for 6 hours. Close loops 2x faster. Stack with stealth for covert expansion.", cost: "320", icon: <Rocket size={28} weight="duotone" />, tier: "TIER II", cooldown: "6H" },
  { name: "PRECISION LOCK", description: "Reduces GPS accuracy threshold to ±0.5m for 4 hours. Enables micro-territory captures in dense urban grids.", cost: "150", icon: <Target size={28} weight="duotone" />, tier: "TIER I", cooldown: "4H" },
];

const Market = () => (
  <div className="min-h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [background-position:0_0,10px_10px] section-spacing">
    <div className="max-w-6xl mx-auto px-6">
      <div className="mb-10">
        <p className="font-space-mono text-xs text-muted-foreground tracking-widest mb-2">TACTICAL ACQUISITIONS // MICRO-TX MODULE</p>
        <h2 className="font-lufga">Tactics Market</h2>
      </div>

      <div className="surface-panel rounded-lg p-4 mb-8 flex items-center justify-between">
        <div className="font-space-mono text-sm">
          <span className="text-muted-foreground mr-2">AVAILABLE BALANCE</span>
          <span className="text-primary text-xl font-bold">1,250 CTC</span>
        </div>
        <div className="font-space-mono text-xs text-muted-foreground">
          GAS: <span className="text-stealth font-bold">~0.002 CTC</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tactics.map((t) => <TacticCard key={t.name} {...t} />)}
      </div>
    </div>
  </div>
);

export default Market;
