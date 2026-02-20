# SpaceGrid Design System

---

## 🎨 Visual Identity (Cyber-Geometric & Tactical)

### Color Palette

**The Grid Void (Deep Black): `#0A0B0E**`

* **Use for:** Main map backgrounds, creating infinite spatial depth.
* **Represents:** Unclaimed physical space, the base canvas of the network.

**Sector Surface (Eerie Black): `#13161A**`

* **Use for:** Elevated HUD panels, tactical modals, and wallet interfaces.
* **Creates:** Layered depth above the geographic map.

**Coordinate Primary (Pure White): `#FFFFFF**`

* **Use for:** Headings, active geospatial data, primary text.
* **Represents:** High-contrast clarity for Grid Runners in motion.

**Quantum Accent (Neon Cyan): `#00F0FF**`

* **Use for:** Active Quantum Trails, primary CTAs, closed loop boundaries.
* **Represents:** Real-time movement, cryptographic verification, and active connections.

### Supporting Colors

* **Text Secondary:** `#8A919E` (Muted slate for inactive sectors and secondary coordinates)
* **Surface Dark:** `#1E2329` (Dark borders, grid line dividers)
* **Warfare/Severed (Neon Crimson):** `#FF003C` (Interference Warfare alerts, severed connections, collapsed loops)
* **Staked/Yield (Electric Purple):** `#B026FF` (Staked CTC balances, protocol reward distributions)
* **Stealth Mode (Ghost Green):** `#00FF66` (Active Stealth upgrades purchased via `TacticsMarket.sol`)

### Visual Effects

* **Quantum Glow (Accent Only):** Neon cyan on active trails and critical actions.

```css
box-shadow: 0 0 20px rgba(0, 240, 255, 0.5);

```

* **Panel Elevation:** Hard-edged surfaces with crisp geometric borders.

```css
background: #13161A;
border: 1px solid rgba(0, 240, 255, 0.15);

```

* **Tactical Transitions:** Snappy, instantaneous UI shifts mimicking military hardware (100-150ms).

```css
transition: all 0.1s cubic-bezier(0, 0.5, 0.5, 1);

```

---

## 🎨 Typography (Tactical & Cryptographic)

### Headings: Rajdhani

A squared, geometric sans-serif that looks highly technical and futuristic. Perfect for a gamified DePIN protocol.

* **H1:** `56px Bold` (hero titles, overarching grid status)
* **H2:** `40px SemiBold` (tactical market headers, sector names)
* **H3:** `28px Medium` (HUD module titles, wallet states)
* **Data Callouts:** `48px Bold` (CTC staked, total area captured, polygon metrics)

### Body & UI Text: Space Mono

A monospaced typeface essential for the cryptographic and geographic nature of the protocol.

* **Body Text:** `16px Regular` (rules of engagement, tactical descriptions)
* **UI Labels:** `14px Regular` (staked amounts, form labels)
* **Button Text:** `15px Bold` (CTAs, upgrade purchases)
* **Data/Coordinates:** `13px Regular` (live GPS coords, PostGIS bounding boxes, ERC-721 hashes)

### Global CSS Implementation

```css
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

/* Apply globally */
h1, h2, h3, h4, h5, h6 { 
  font-family: 'Rajdhani', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

body, p, span, button, input { 
  font-family: 'Space Mono', monospace;
}

```

---

## 🏛️ Application Architecture

### Required Pages

1. **Landing Page (`/`)**

* **Hero:** Interactive WebGL grid of the globe with glowing cyan polygons.
* **Value Prop:** "WHERE PHYSICAL MOVEMENT BECOMES VERIFIABLE ON-CHAIN TERRITORY".
* **CTAs:** "INITIALIZE GRID RUNNER" (High-contrast cyan button).

1. **Grid Operator HUD (`/grid`)**

* Edge-to-edge dark map interface.
* Live WebSocket coordinate stream in the corner.
* "Close Loop" action button that triggers the `TerritoryRWA.sol` minting.

1. **Tactics Market (`/market`)**

* Cyberpunk vending machine layout for tactical upgrades.
* Purchase Shields, Stealth, and Disruption pulses via CTC micro-transactions.

1. **Territory Vault (`/portfolio`)**

* Grid layout of all captured polygons minted on Creditcoin EVM.
* Displays passive network dividends and staked CTC metrics.

1. **Staking Pool (`/staking`)**

* Interacts with `GridEntry.sol`.
* Stark, data-heavy tables showing entry fees and locked stakes.

---

## 🎯 Key UI Components (Grid-Style)

### 1. The Map Canvas

* Completely desaturated, unlabelled dark basemap.
* Rivals show as red blips; your active Quantum Trail is a solid neon cyan line.
* Captured territories display as translucent cyan polygons with a 2px solid border.

### 2. Live Coordinate Ticker

* Monospaced stream of GPS data constantly updating via WebSocket.
* Green/Red connection status dot.

### 3. Tactical Upgrade Button (e.g., Disruption Pulse)

* Geometric rectangle with a thin glowing border.
* Displays CTC cost clearly.
* Triggers a smart contract call on `TacticsMarket.sol`.

### 4. Polygon NFT Card (`TerritoryRWA`)

* Wireframe rendering of the specific geographic polygon.
* Hash, area size (calculated via PostGIS), and generation date strictly aligned in `Space Mono`.
* No border radius.

### 5. Interference Alert Modal

* Harsh `#FF003C` crimson border and text.
* Warns that a rival is severing your connection.

---

## 🎬 Animations & Interactions

### Micro-interactions

* **Trail Emission:** Continuous drawing animation of the cyan stroke as GPS updates occur.
* **Button Hover:** Instantaneous color inversion (Black text on Cyan background). Zero fade-in.
* **Warfare Severance:** Screen glitch effect and harsh red flash when a rival crosses an unclosed loop.
* **Territory Capture:** The moment a loop closes, the enclosed polygon rapidly fills with cyan and pulses once, signifying the smart contract call to mint the NFT.

---

## 🛠️ Technical Stack (Cyber-Neon Frontend)

```json
{
  "framework": "React + Vite + TypeScript",
  "styling": "Tailwind CSS (Custom geometric grid theme)",
  "fonts": "Rajdhani (Google Fonts) + Space Mono (Google Fonts)",
  "icons": "Phosphor Icons (Duotone, sharp variants)",
  "maps": "Mapbox GL JS (Custom dark void style) + PostGIS data",
  "web3": "Ethers.js / Wagmi (Connecting to Creditcoin EVM Chain ID: 102030 / 102031)",
  "realtime": "FastAPI WebSockets",
  "animations": "Framer Motion (Strictly linear, no spring physics)"
}

```

---

## 📐 Layout Structure

```text
┌─────────────────────────────────────────────────┐
│  [SPACE GRID]   Lat: 34.0522° N, Lon: 118.24° W │
│  [Staked: 500 CTC]            [Network: ONLINE] │
├──────────┬──────────────────────────────────────┤
│ TACTICS  │                                      │
│ ┌──────┐ │   THE GRID (Mapbox Canvas)           │
│ │SHIELD│ │                                      │
│ └──────┘ │          /\                          │
│ ┌──────┐ │         /  \   [Active Trail]        │
│ │STEALTH │        /____\                        │
│ └──────┘ │   [Captured Territory]               │
│          │                                      │
│ RIVALS: 2│                                      │
│          │                                      │
└──────────┴──────────────────────────────────────┘

```

---

## ☑️ SpaceGrid Design Checklist

* [x] Void theme by default (`#0A0B0E` background)
* [x] Geometric, 0px border-radius on ALL components.
* [x] Rajdhani for tactical headers (uppercase, spaced out).
* [x] Space Mono for GPS data, WebSocket feeds, and smart contract hashes.
* [x] Neon cyan (`#00F0FF`) used specifically to track the active Quantum Trail.
* [x] Crimson (`#FF003C`) exclusively reserved for Interference Warfare events.
* [x] Instant, linear transitions (no bouncy/soft animations).
* [x] Data-first layout (always display CTC balances and staking metrics).
* [x] Wireframe aesthetics for territory NFTs (`TerritoryRWA.sol`).

---

## 💜 Brand Voice (Grid Runner Tone)

* **Do:** Use military, spatial, and cryptographic terminology. Speak in terms of "Sectors," "Territories," "Severance," and "Operators."
* **Don't:** Use friendly Web2 onboarding language, soft emojis, or gamified "level up" tropes. The grid is an unfeeling infrastructure layer; it is up to the operator to capture it.

## ✨ Easter Eggs (Grid Protocols)

* Click the live GPS coordinate stream 3 times → Toggles raw PostGIS bounding box JSON output.
* Attempt to cross your own unclosed trail backwards → "PARADOX DETECTED" warning flashes.
* View an NFT minted on August 28, 2024 (Creditcoin EVM Mainnet launch) → Displays a "Genesis Block" golden border.
