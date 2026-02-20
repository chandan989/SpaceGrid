import { Lock, TrendUp, Coins, ArrowsClockwise } from "@phosphor-icons/react";

const pools = [
  { name: "GRID_ENTRY_V1", fee: "100 CTC", locked: "42,500 CTC", apy: "14.2%", status: "ACTIVE", participants: 234 },
  { name: "GRID_ENTRY_V2", fee: "250 CTC", locked: "128,000 CTC", apy: "22.8%", status: "ACTIVE", participants: 89 },
  { name: "SENTINEL_POOL", fee: "500 CTC", locked: "315,000 CTC", apy: "31.5%", status: "ACTIVE", participants: 42 },
  { name: "QUANTUM_RESERVE", fee: "1000 CTC", locked: "890,000 CTC", apy: "45.3%", status: "LOCKED", participants: 18 },
];

const distributions = [
  { epoch: "E-4891", reward: "2,450 CTC", runners: 1204, timestamp: "2025-11-23 14:32:01 UTC" },
  { epoch: "E-4890", reward: "2,380 CTC", runners: 1198, timestamp: "2025-11-23 08:00:00 UTC" },
  { epoch: "E-4889", reward: "2,510 CTC", runners: 1215, timestamp: "2025-11-22 14:32:01 UTC" },
  { epoch: "E-4888", reward: "2,290 CTC", runners: 1187, timestamp: "2025-11-22 08:00:00 UTC" },
  { epoch: "E-4887", reward: "2,670 CTC", runners: 1242, timestamp: "2025-11-21 14:32:01 UTC" },
];

const Staking = () => (
  <div className="min-h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [background-position:0_0,10px_10px] section-spacing">
    <div className="max-w-6xl mx-auto px-6">
      <div className="mb-10">
        <p className="font-space-mono text-xs text-muted-foreground tracking-widest mb-2">GRIDENTRY.SOL // ECONOMIC HUB</p>
        <h2 className="font-lufga">Staking Pool</h2>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "TOTAL LOCKED", value: "1.37M CTC", icon: Lock },
          { label: "PROTOCOL APY", value: "28.4%", icon: TrendUp },
          { label: "YOUR STAKE", value: "350 CTC", icon: Coins },
          { label: "PENDING REWARDS", value: "42.7 CTC", icon: ArrowsClockwise },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="surface-panel rounded-lg p-4 card-hover">
              <Icon size={20} weight="duotone" className="text-primary mb-2" />
              <div className="font-space-mono text-xl font-bold text-primary mb-0.5">{m.value}</div>
              <div className="font-space-mono text-[10px] text-muted-foreground tracking-wider">{m.label}</div>
            </div>
          );
        })}
      </div>

      {/* Pools Table */}
      <div className="mb-10">
        <h3 className="font-lufga font-bold mb-4">Entry Pools</h3>
        <div className="surface-panel rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {["POOL", "ENTRY FEE", "TOTAL LOCKED", "APY", "RUNNERS", "STATUS", ""].map((h) => (
                  <th key={h} className="text-left font-space-mono text-[10px] text-muted-foreground tracking-wider px-5 py-3 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pools.map((pool) => (
                <tr key={pool.name} className="border-b border-border last:border-0 hover:bg-violet-light/50 transition-colors duration-200">
                  <td className="px-5 py-3 font-space-mono text-xs font-bold text-primary">{pool.name}</td>
                  <td className="px-5 py-3 font-space-mono text-xs">{pool.fee}</td>
                  <td className="px-5 py-3 font-space-mono text-xs">{pool.locked}</td>
                  <td className="px-5 py-3 font-space-mono text-xs font-bold text-primary">{pool.apy}</td>
                  <td className="px-5 py-3 font-space-mono text-xs text-muted-foreground">{pool.participants}</td>
                  <td className="px-5 py-3 font-space-mono text-[10px]">
                    <span className={pool.status === "ACTIVE" ? "text-stealth font-bold" : "text-warfare font-bold"}>{pool.status}</span>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      className={`font-space-mono text-[10px] px-3 py-1.5 rounded tracking-wider ${pool.status === "ACTIVE" ? "btn-primary" : "bg-muted text-muted-foreground cursor-not-allowed"
                        }`}
                      disabled={pool.status !== "ACTIVE"}
                    >
                      {pool.status === "ACTIVE" ? "STAKE" : "LOCKED"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Distributions */}
      <div>
        <h3 className="font-lufga font-bold mb-4">Reward Distributions</h3>
        <div className="surface-panel rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {["EPOCH", "REWARD POOL", "RUNNERS", "TIMESTAMP"].map((h) => (
                  <th key={h} className="text-left font-space-mono text-[10px] text-muted-foreground tracking-wider px-5 py-3 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {distributions.map((d) => (
                <tr key={d.epoch} className="border-b border-border last:border-0 hover:bg-violet-light/50 transition-colors duration-200">
                  <td className="px-5 py-3 font-space-mono text-xs font-bold text-primary">{d.epoch}</td>
                  <td className="px-5 py-3 font-space-mono text-xs font-bold text-primary">{d.reward}</td>
                  <td className="px-5 py-3 font-space-mono text-xs text-muted-foreground">{d.runners}</td>
                  <td className="px-5 py-3 font-space-mono text-[10px] text-muted-foreground">{d.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default Staking;
