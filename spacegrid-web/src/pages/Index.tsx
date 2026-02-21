import { Link } from "react-router-dom";
import { ArrowRight, Broadcast, MapTrifold, Sword, Lightning } from "@phosphor-icons/react";
import { motion } from "framer-motion";


const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [background-position:0_0,10px_10px]">
      {/* ===== HERO ===== */}
      <section className="h-screen w-full flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [background-position:0_0,10px_10px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10"></div>
        <div className="container max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-2 gap-8 items-center w-full">
          <motion.div className="text-center md:text-left lg:text-left" {...fadeIn}>
            <h1 className="font-lufga text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-black leading-tight">
              Physical Movement. <br />
              <span className="text-[#5C27FE]">On-Chain Territory.</span>
            </h1>
            <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-gray-600 font-space-mono">
              Space Grid gamifies the mapping and verification of geospatial data. Translate your physical movement into cryptographic trails and claim real-world territories as persistent, tokenized assets on the Creditcoin EVM.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
              <Link
                to="/#protocol"
                className="w-full sm:w-auto bg-[#5C27FE] text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(92,39,254,0.5)] font-space-mono text-center flex items-center justify-center gap-2"
              >
                Discover How <ArrowRight size={16} weight="bold" />
              </Link>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full sm:w-auto bg-transparent border-2 border-[#5C27FE] text-[#5C27FE] font-bold py-3 px-8 rounded-lg hover:bg-violet-50 transition-colors duration-300 font-space-mono text-center flex items-center justify-center gap-2"
              >
                Connect Wallet <Lightning size={16} weight="duotone" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="hidden lg:flex items-center justify-center -mt-16 lg:-mt-0"
          >
            {/* Animated Planet SVG */}
            <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg">
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="10" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id="planetGradient" cx="50%" cy="50%" r="50%" fx="25%" fy="25%">
                  <stop offset="0%" style={{ stopColor: '#7c56ff', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#5C27FE', stopOpacity: 1 }} />
                </radialGradient>
                <style>
                  {`
                          @keyframes pulse {
                              0%, 100% { transform: scale(1); opacity: 1; }
                              50% { transform: scale(1.05); opacity: 0.8; }
                          }
                          .pulse-anim {
                              animation: pulse 4s ease-in-out infinite;
                              transform-origin: center;
                          }
                        `}
                </style>
              </defs>

              {/* Planet */}
              <circle cx="250" cy="250" r="100" fill="url(#planetGradient)" />
              <circle cx="250" cy="250" r="105" fill="#5C27FE" opacity="0.5" filter="url(#glow)" />
              <circle className="pulse-anim" cx="250" cy="250" r="100" fill="transparent" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

              {/* Orbit 1 */}
              <ellipse cx="250" cy="250" rx="150" ry="150" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2 6" />
              {/* Satellite 1 */}
              <g>
                <circle cx="100" cy="250" r="6" fill="#1A1A2E" />
                <animateMotion dur="10s" repeatCount="indefinite" path="M100,250 a150,150 0 1,0 300,0 a150,150 0 1,0 -300,0" />
              </g>

              {/* Orbit 2 */}
              <ellipse cx="250" cy="250" rx="200" ry="80" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2 6" />
              {/* Satellite 2 */}
              <g>
                <rect x="-5" y="-5" width="10" height="10" fill="#5C27FE" transform="rotate(45)">
                  <animateMotion dur="15s" repeatCount="indefinite" path="M250,170 a200,80 0 1,0 0.001,0" />
                </rect>
              </g>

              {/* Orbit 3 */}
              <ellipse cx="250" cy="250" rx="120" ry="220" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2 6" />
              {/* Satellite 3 */}
              <g>
                <circle r="5" fill="#1A1A2E">
                  <animateMotion dur="20s" repeatCount="indefinite" path="M250,30 a120,220 0 1,0 0.001,0" />
                </circle>
              </g>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ===== THE PROTOCOL ===== */}
      <section id="protocol" className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center max-w-2xl mx-auto mb-14" {...fadeIn} viewport={{ once: true }} whileInView="animate" initial="initial">
            <h2 className="font-lufga mb-4">Shattering The Digital Barrier</h2>
            <p className="text-muted-foreground text-sm font-space-mono leading-relaxed">
              Space Grid breaks the barrier between digital ledgers and physical space.
              Using your mobile device's GPS, you can permanently record captured territories
              as real-world assets.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Broadcast size={28} weight="duotone" />,
                title: "Trail Emission (DePIN)",
                desc: "Physical movement generates continuous, signed geographic coordinates broadcast to the network in real time via zero-latency WebSocket connections.",
              },
              {
                icon: <MapTrifold size={28} weight="duotone" />,
                title: "Territory Capture (RWA)",
                desc: "Returning to your own trail closes a loop. The backend calculates the area using PostGIS and securely registers the geometric polygon on the Creditcoin EVM.",
              },
              {
                icon: <Sword size={28} weight="duotone" />,
                title: "Interference Warfare",
                desc: "Intersect an active, unclosed trail of a rival operator to sever their connection, collapsing their loop potential and asserting local dominance.",
              },
            ].map((item) => (
              <div key={item.title} className="surface-panel rounded-lg p-6 card-hover">
                <div className="text-primary mb-4">{item.icon}</div>
                <h3 className="font-lufga text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-space-mono leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CORE MECHANICS ===== */}
      <section id="mechanics" className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-lufga mb-4">Core Mechanics of The Grid</h2>
            <p className="text-muted-foreground text-sm font-space-mono leading-relaxed">
              A continuous loop from real-time physical movement to permanent on-chain asset verification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Left: SVG illustration */}
            <div className="flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full max-w-sm" fill="none">
                <circle cx="200" cy="200" r="160" stroke="hsl(256 99% 56% / 0.08)" strokeWidth="1" fill="none" />
                <circle cx="200" cy="200" r="110" stroke="hsl(256 99% 56% / 0.12)" strokeWidth="1" fill="none" />
                <circle cx="200" cy="200" r="60" stroke="hsl(256 99% 56% / 0.2)" strokeWidth="1.5" fill="hsl(256 99% 56% / 0.04)" />
                {/* Trail path */}
                <path d="M120 280 Q140 200 200 180 Q260 160 280 120" stroke="hsl(256 99% 56% / 0.5)" strokeWidth="2" strokeDasharray="6 4" fill="none" />
                {/* Nodes */}
                <circle cx="120" cy="280" r="8" fill="hsl(256 99% 56% / 0.2)" stroke="hsl(256 99% 56%)" strokeWidth="1.5" />
                <circle cx="200" cy="180" r="6" fill="hsl(256 99% 56% / 0.3)" />
                <circle cx="280" cy="120" r="8" fill="hsl(256 99% 56%)" />
                {/* Labels */}
                <text x="95" y="305" fill="hsl(256 99% 56%)" fontSize="10" fontFamily="Space Mono">EMIT</text>
                <text x="178" y="210" fill="hsl(256 99% 56% / 0.6)" fontSize="10" fontFamily="Space Mono">CALC</text>
                <text x="265" y="110" fill="hsl(256 99% 56%)" fontSize="10" fontFamily="Space Mono">REGISTER</text>
              </svg>
            </div>

            {/* Right: Steps */}
            <div className="space-y-6">
              {[
                {
                  num: "1",
                  title: "LAYER ONE: The Quantum Trail",
                  desc: "Activate your device to emit a Quantum Trail. Your movements are continuously tracked and broadcast with strict geospatial fidelity.",
                },
                {
                  num: "2",
                  title: "LAYER TWO: Spatial Calculation",
                  desc: "PostGIS algorithms verify the enclosed geometric area of your path, preventing overlaps and quantifying the physical footprint.",
                },
                {
                  num: "3",
                  title: "LAYER THREE: Asset Registration",
                  desc: "The territory is registered via TerritoryRWA.sol as an asset on the Creditcoin EVM, cementing your undeniable claim.",
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-lufga font-bold text-lg">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-lufga text-base font-bold mb-1">{step.title}</h3>
                    <p className="text-muted-foreground text-sm font-space-mono leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SYSTEM ARCHITECTURE ===== */}
      <section id="technology" className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-lufga mb-4">System Architecture</h2>
            <p className="text-muted-foreground text-sm font-space-mono leading-relaxed">
              Built on a hybridized Web2/Web3 stack, ensuring zero-latency geospatial tracking
              while maintaining strict on-chain validation.
            </p>
          </div>

          <div className="surface-panel rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left font-space-mono text-xs text-muted-foreground tracking-wider px-6 py-4 font-bold">Domain</th>
                  <th className="text-left font-space-mono text-xs text-muted-foreground tracking-wider px-6 py-4 font-bold">Technology</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Smart Contracts", "Solidity, GridEntry.sol, TerritoryRWA.sol, TacticsMarket.sol"],
                  ["Blockchain", "Creditcoin EVM (Mainnet & Testnet)"],
                  ["Backend Logic", "FastAPI (Python) + WebSocket"],
                  ["Spatial Database", "Supabase + PostgreSQL (PostGIS)"],
                  ["Interface Layer", "React + Vite + TypeScript + Tailwind CSS"],
                  ["Identity", "Supabase Auth"],
                  ["Token Economics", "CTC (staking, in-game tactics, network dividends)"],
                  ["Consensus Layer", "Creditcoin NPoS with USC Support"],
                ].map(([domain, tech]) => (
                  <tr key={domain} className="border-b border-border last:border-0 hover:bg-violet-light/50 transition-colors duration-200">
                    <td className="px-6 py-3.5 font-space-mono text-sm font-bold">{domain}</td>
                    <td className="px-6 py-3.5 font-space-mono text-sm text-muted-foreground">{tech}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== DEPLOYMENT SEQUENCE ===== */}
      <section id="deployment" className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-lufga mb-4">Deployment Sequence</h2>
            <p className="text-muted-foreground text-sm font-space-mono leading-relaxed">
              The grid is coming online. From local spatial tests to complete decentralized mainnet deployment.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-10">
              {[
                { phase: "0", title: "EVM Contracts", desc: "Deploying GridEntry, TerritoryRWA, and TacticsMarket to Creditcoin Testnet (tCTC)." },
                { phase: "1", title: "Spatial Backend", desc: "Configuring FastAPI logic and initializing PostGIS schema for area validation." },
                { phase: "2", title: "Interface Layer", desc: "Launching the React+Vite frontend for real-time WebSocket communication and operator wallet integration." },
                { phase: "3", title: "Tactical Markets", desc: "Enabling in-game tactical upgrades like Shields, Stealth, and Disruption pulses via CTC." },
                { phase: "4", title: "Mainnet Launch", desc: "Migrating to Creditcoin Mainnet for live, tokenized territory capture using real CTC economics." },
              ].map((item, i) => (
                <div key={item.phase} className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:text-${i % 2 === 0 ? "right" : "left"}`}>
                  <div className="flex-shrink-0 relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-lufga font-bold text-sm ${i <= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground border border-border"
                      }`}>
                      {item.phase}
                    </div>
                  </div>
                  <div className="surface-panel rounded-lg p-5 flex-1 max-w-md card-hover">
                    <h3 className="font-lufga font-bold mb-1">Phase {item.phase}: {item.title}</h3>
                    <p className="text-muted-foreground text-sm font-space-mono leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== GRID ECONOMICS ===== */}
      <section id="economics" className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-lufga mb-4">Grid Economics</h2>
            <p className="text-muted-foreground text-sm font-space-mono leading-relaxed">
              Operators stake CTC to enter high-value sectors, while captured territories yield passive network dividends.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Demand Drivers",
                items: ["High-value sector entry stakes", "Tactical Upgrades (Shields, Stealth)", "Disruption pulses (TacticsMarket)", "Network operation gas"],
              },
              {
                title: "Economy Sinks",
                items: ["Locked stakes during active trails", "Tactical upgrade consumption", "Slashed stakes from interference", "Territory capture registration fees"],
              },
              {
                title: "Protocol Rewards",
                items: ["Territory holding dividends", "Aggressive interference bounties", "Loop closure payouts", "On-chain RWA asset appreciation"],
              },
            ].map((col) => (
              <div key={col.title} className="surface-panel rounded-lg p-6 card-hover">
                <h3 className="font-lufga font-bold mb-4 text-primary">{col.title}</h3>
                <ul className="space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-space-mono text-muted-foreground">
                      <span className="text-primary mt-1 flex-shrink-0">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-spacing">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-lufga mb-4">Enter The Grid</h2>
          <p className="text-muted-foreground text-sm font-space-mono leading-relaxed mb-8 max-w-xl mx-auto">
            From the physical streets to the blockchain ledger. The map is blank and the
            territories are waiting to be claimed. Start your quantum trail today.
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <button className="btn-primary glow-violet text-sm px-8 py-4 inline-flex items-center gap-2">
              Connect Wallet <ArrowRight size={16} weight="bold" />
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Index;
