import { useEffect, useState } from "react";

const generateCoord = () => ({
  lat: (Math.random() * 180 - 90).toFixed(6),
  lng: (Math.random() * 360 - 180).toFixed(6),
  alt: (Math.random() * 500).toFixed(1),
  acc: (Math.random() * 10 + 1).toFixed(1),
  ts: Date.now(),
});

const CoordinateTicker = () => {
  const [coords, setCoords] = useState(generateCoord());
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoords(generateCoord());
      setConnected(Math.random() > 0.05);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="surface-panel rounded-lg p-3 font-space-mono text-[11px] leading-relaxed min-w-[260px]">
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-2 h-2 rounded-full ${connected ? "bg-green-500" : "bg-red-500"} animate-pulse-ring`} />
        <span className="text-muted-foreground tracking-wider text-[10px]">GPS_STREAM</span>
        <span className="text-muted-foreground ml-auto text-[10px]">{connected ? "LOCKED" : "SEARCHING"}</span>
      </div>
      <div className="space-y-0.5">
        <div className="flex justify-between">
          <span className="text-muted-foreground">LAT</span>
          <span className="text-primary tabular-nums font-bold">{coords.lat}°</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">LNG</span>
          <span className="text-primary tabular-nums font-bold">{coords.lng}°</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">ALT</span>
          <span className="tabular-nums">{coords.alt}m</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">ACC</span>
          <span className="tabular-nums">±{coords.acc}m</span>
        </div>
        <div className="flex justify-between border-t border-border pt-1 mt-1">
          <span className="text-muted-foreground">EPOCH</span>
          <span className="text-muted-foreground tabular-nums">{coords.ts}</span>
        </div>
      </div>
    </div>
  );
};

export default CoordinateTicker;
