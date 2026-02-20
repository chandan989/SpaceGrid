import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Crosshair, MapPin, Lightning } from "@phosphor-icons/react";
import CoordinateTicker from "@/components/CoordinateTicker";

const GridHUD = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [trailPoints, setTrailPoints] = useState(47);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    const draw = () => {
      t += 0.003;
      ctx.clearRect(0, 0, w(), h());

      // Light grid
      ctx.strokeStyle = "rgba(92, 39, 254, 0.06)";
      ctx.lineWidth = 1;
      const sp = 60;
      for (let x = 0; x < w(); x += sp) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h()); ctx.stroke();
      }
      for (let y = 0; y < h(); y += sp) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w(), y); ctx.stroke();
      }

      const cx = w() / 2;
      const cy = h() / 2;
      const pts = [
        [cx - 120, cy - 80], [cx + 80, cy - 100], [cx + 150, cy + 20],
        [cx + 60, cy + 120], [cx - 100, cy + 90], [cx - 160, cy + 10],
      ];

      ctx.fillStyle = "rgba(92, 39, 254, 0.05)";
      ctx.strokeStyle = "rgba(92, 39, 254, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      pts.forEach(([x, y], i) => {
        const px = x + Math.sin(t * 2 + i) * 3;
        const py = y + Math.cos(t * 2 + i) * 3;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Trail dots
      for (let i = 0; i < 20; i++) {
        const angle = t * (0.3 + i * 0.05) + (i * Math.PI) / 10;
        const r = 50 + i * 12;
        const dx = cx + Math.cos(angle) * r;
        const dy = cy + Math.sin(angle) * r;
        ctx.fillStyle = `rgba(92, 39, 254, ${0.4 - i * 0.015})`;
        ctx.beginPath();
        ctx.arc(dx, dy, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // User location
      ctx.strokeStyle = `rgba(92, 39, 254, ${0.3 + 0.2 * Math.sin(t * 5)})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 10 + Math.sin(t * 4) * 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(92, 39, 254, 0.9)";
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    draw();
    const interval = setInterval(() => setTrailPoints((p) => p + 1), 2000);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); clearInterval(interval); };
  }, []);

  return (
    <div className="relative h-[calc(100vh-64px)] bg-background overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Top HUD */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
        <div className="surface-panel rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-space-mono">
          <Crosshair size={14} weight="duotone" className="text-primary" />
          <span className="text-muted-foreground">OPERATOR MODE</span>
        </div>
        <div className="surface-panel rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-space-mono">
          <MapPin size={14} weight="duotone" className="text-primary" />
          <span className="text-primary font-bold">{trailPoints}</span>
          <span className="text-muted-foreground">TRAIL POINTS</span>
        </div>
      </div>

      {/* Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <div className="surface-panel rounded-lg px-4 py-3 text-xs font-space-mono space-y-1.5">
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">EMISSION</span>
            <span className="text-stealth font-bold">ACTIVE</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">LOOP STATUS</span>
            <span className="text-primary font-bold">72% CLOSED</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">EST. AREA</span>
            <span className="font-bold">0.847 km²</span>
          </div>
        </div>
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-4 left-4 z-10">
        <CoordinateTicker />
      </div>

      {/* Bottom Center */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
      >
        <button className="btn-primary glow-violet px-10 py-4 text-sm tracking-wider flex items-center gap-3">
          <Lightning size={16} weight="duotone" />
          CLOSE LOOP — MINT TERRITORY RWA
        </button>
      </motion.div>

      {/* Bottom Right */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="surface-panel rounded-lg px-4 py-3 text-xs font-space-mono space-y-1.5">
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">NEARBY RUNNERS</span>
            <span className="font-bold">23</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">INTERFERENCE</span>
            <span className="text-warfare font-bold">LOW</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">BLOCK</span>
            <span className="text-muted-foreground">#4,891,203</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridHUD;
