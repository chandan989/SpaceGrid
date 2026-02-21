# 🌌 SPACE GRID

**Where Physical Movement Becomes Verifiable On-Chain Territory.**

Space Grid is a decentralized physical infrastructure network (DePIN) and location-based real-world asset (RWA) protocol deployed on the **Creditcoin EVM** — a purpose-built Layer 1 blockchain for RWA infrastructure and financial inclusion. Space Grid gamifies the mapping and verification of geospatial data, allowing operators ("Grid Runners") to translate physical movement into cryptographic trails and claim real-world territories as persistent, tokenized assets.

> **Built on Creditcoin** — the world's leading RWA infrastructure chain, with over 3 million on-chain credit transactions recorded and an EVM-compatible mainnet live since August 2024.

---

## 🛸 THE PROTOCOL

Space Grid shatters the barrier between digital ledgers and physical space. Using a mobile device's GPS, operators emit a "Quantum Trail." By physically moving to close a loop, operators cryptographically capture that geographic polygon.

Rather than resetting after a session, Space Grid leverages Creditcoin's EVM to permanently record captured territories — turning localized spatial control into verifiable RWAs stored directly on-chain.

### 🔹 Core Mechanics

**1. Trail Emission (DePIN)**
Physical movement generates continuous, signed geographic coordinates broadcast to the network in real time via WebSocket.

**2. Territory Capture (RWA)**
Returning to your own trail closes a loop. The backend calculates the enclosed geometric area using PostGIS and triggers a smart contract call to register the polygon on Creditcoin EVM.

**3. Interference Warfare**
Intersecting an active, unclosed trail of a rival operator severs their connection, collapsing their loop potential and rewarding aggressive territorial play.

**4. Grid Economics**
Operators stake **CTC** to enter high-value grid sectors. Captured territories yield passive network dividends, and defensive tactical upgrades (Shields, Stealth) can be purchased on-chain via `TacticsMarket.sol`.

---

## 🏗️ SYSTEM ARCHITECTURE

Space Grid is built on a hybridized Web2/Web3 stack, ensuring zero-latency geospatial tracking while maintaining strict on-chain asset verification.

### Technology Stack

| Layer | Technology |
|---|---|
| Interface | React + Vite + TypeScript + Tailwind CSS |
| Core Logic | FastAPI (Python) + WebSocket |
| Spatial DB | Supabase + PostgreSQL (PostGIS) |
| Identity | Supabase Auth |
| Asset / Consensus | Creditcoin EVM — Solidity Smart Contracts |

### Why Creditcoin?

Creditcoin is a Layer 1 blockchain designed from the ground up for real-world asset (RWA) integration. Originally built to create immutable on-chain credit histories for underbanked communities globally, Creditcoin launched its EVM-compatible mainnet on **August 28, 2024**, transforming into a fully programmable, Solidity-native chain while retaining its core mission of anchoring digital assets to real-world value.

Key reasons Space Grid builds on Creditcoin:

- **RWA-native architecture** — Creditcoin's entire design philosophy centers on binding on-chain assets to real-world provenance, making it the ideal settlement layer for geospatially-anchored data.
- **EVM compatibility** — Full Solidity/Hardhat/Foundry toolchain support means Space Grid contracts are portable, auditable, and interoperable with the broader EVM ecosystem.
- **Universal Smart Contract (USC) layer** — Creditcoin's in-development USC protocol enables cross-chain smart contract coordination without bridges, a future upgrade path for Space Grid's multi-chain expansion.
- **Low-cost, high-throughput transactions** — Creditcoin's NPoS consensus and efficient block times make high-frequency territory capture and staking economics viable without gas spikes.
- **Developer grants** — Creditcoin's Ecosystem Investment Program (CEIP) offers grants of $25,000–$250,000 for projects building on its chain, supporting the Space Grid ecosystem directly.

---

### Network Configuration

**Mainnet (CTC)**

| Parameter | Value |
|---|---|
| Network Name | Creditcoin |
| RPC URL | `https://rpc.cc3-mainnet.creditcoin.network` |
| Chain ID | `102030` |
| Currency Symbol | `CTC` |
| Block Explorer | [creditcoin.blockscout.com](https://creditcoin.blockscout.com/) |

**Testnet (tCTC) — Active Development**

| Parameter | Value |
|---|---|
| Network Name | Creditcoin Testnet |
| RPC URL | `https://rpc.cc3-testnet.creditcoin.network` |
| Chain ID | `102031` |
| Currency Symbol | `tCTC` |
| Block Explorer | [creditcoin-testnet.blockscout.com](https://creditcoin-testnet.blockscout.com/) |

> Obtain testnet `tCTC` from the **Creditcoin Discord faucet**. Testnet mirrors mainnet logic with no economic risk, ideal for contract iteration and spatial calculation testing.

---

## 🚀 DEPLOYMENT SEQUENCE

### Prerequisites

- Node.js ≥ 18, Python ≥ 3.10
- A funded wallet with `tCTC` (testnet) or `CTC` (mainnet)
- Supabase project with PostGIS enabled

### 1. Smart Contract Deployment (Creditcoin EVM)

```bash
cd contracts/
npm install

# Configure .env
cp .env.example .env
# Set PRIVATE_KEY and RPC_URL (testnet or mainnet)

npx hardhat run scripts/deploy.js --network creditcoinTestnet
```

Your `hardhat.config.js` should include:

```js
creditcoinTestnet: {
  url: "https://rpc.cc3-testnet.creditcoin.network",
  chainId: 102031,
  accounts: [process.env.PRIVATE_KEY],
}
```

### 2. Core Logic — FastAPI Backend

```bash
cd backend/
pip install -r requirements.txt

# Configure .env
cp .env.example .env
# Set SUPABASE_URL, SUPABASE_KEY, CONTRACT_ADDRESS

python scripts/init_spatial_db.py   # Initialize PostGIS schema
uvicorn main:app --reload --port 8000
```

### 3. Interface Layer — React Frontend

```bash
cd frontend/
npm install

# Configure .env
cp .env.example .env
# Set VITE_RPC_URL and VITE_WS_URL

npm run dev
```

---

## 📜 SMART CONTRACT OVERVIEW

All contracts are written in Solidity and deployed to the Creditcoin EVM using Hardhat.

### `GridEntry.sol`

Manages CTC staking pools for active grid sessions. Handles entry fees, stake locking during active trails, and protocol reward distribution to territory holders.

### `TerritoryRWA.sol`

Stores encoded PostGIS bounding box coordinates as on-chain metadata, providing cryptographic proof of geographic ownership. Each registered territory represents a unique, non-overlapping polygon on the physical Earth.

### `TacticsMarket.sol`

Handles CTC micro-transactions for in-game tactical upgrades — purchasing temporary Shields (block interference), Stealth (hide your trail from rivals), and Disruption pulses (collapse nearby unclosed loops).

---

## 📂 PROJECT STRUCTURE

```
space-grid/
├── contracts/          # Solidity smart contracts (Hardhat)
│   ├── GridEntry.sol
│   ├── TerritoryRWA.sol
│   └── TacticsMarket.sol
├── backend/            # FastAPI — spatial logic + WebSocket relay
│   ├── main.py
│   ├── routers/
│   └── scripts/
│       └── init_spatial_db.py
└── frontend/           # React + Vite — grid UI + wallet integration
    ├── src/
    └── public/
```

---

## 👥 CORE PROTOCOL TEAM

| Name | Role |
|---|---|
| **Chandan Soni** | Protocol Architecture & EVM Smart Contracts |
| **Nikhil Sharma** | Client Interface & Real-time Synchronization |

---

## 🔗 RESOURCES

- [Creditcoin Official Site](https://creditcoin.org)
- [Creditcoin Developer Docs](https://docs.creditcoin.org)
- [Creditcoin EVM Endpoints](https://docs.creditcoin.org/smart-contract-guides/creditcoin-endpoints)
- [Creditcoin Testnet Block Explorer](https://creditcoin-testnet.blockscout.com/)
- [Creditcoin Mainnet Block Explorer](https://creditcoin.blockscout.com/)
- [Creditcoin Discord (Faucet)](https://discord.gg/creditcoin)
- [Creditcoin Ecosystem Investment Program](https://creditcoin.org)

---

## ⚖️ LICENSE

MIT License — The grid belongs to everyone and no one.
