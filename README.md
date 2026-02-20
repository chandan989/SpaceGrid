# 🌌 SPACE GRID

**Where Physical Movement Becomes Verifiable On-Chain Territory.**

Space Grid is a decentralized physical infrastructure network (DePIN) and location-based real-world asset (RWA) protocol deployed on the **Creditcoin EVM**. It gamifies the mapping and verification of geospatial data, allowing operators ("Grid Runners") to translate physical movement into cryptographic trails and claim real-world territories as persistent, tokenized assets.



## 🛸 THE PROTOCOL 

Space Grid shatters the barrier between digital ledgers and physical space. Using a mobile device's GPS, operators emit a "Quantum Trail." By physically moving to close a loop, operators cryptographically capture that geographic polygon. 

Rather than resetting after a session, Space Grid utilizes Creditcoin’s scalable EVM to permanently tokenize these captured territories as ERC-721 assets, turning localized spatial control into a tradable, verifiable RWA.

### 🔹 Core Mechanics
1. **Trail Emission (DePIN):** Physical movement generates continuous, signed geographic coordinates.
2. **Territory Capture (RWA):** Returning to your own trail closes a loop. The backend calculates the enclosed geometric area and triggers a smart contract call to mint the polygon as an NFT.
3. **Interference Warfare:** Intersecting an active, unclosed trail of a rival operator severs their connection, collapsing their loop potential. 
4. **Grid Economics:** Operators stake **CTC** to enter high-value grid sectors. Captured territories yield passive network dividends, and defensive tactical upgrades (Shields, Stealth) can be purchased on-chain.

---

## 🏗️ SYSTEM ARCHITECTURE

Space Grid is built on a high-performance, hybridized Web2/Web3 stack, ensuring zero-latency geospatial tracking while maintaining strict on-chain asset verification.

### Technology Stack
* **Interface Layer:** React + Vite + TypeScript + Tailwind CSS (Cyber-neon, high-contrast geometric design system)
* **Core Logic:** FastAPI (Python) for rapid spatial calculations and WebSocket management
* **Identity & State Archive:** Supabase Auth & PostgreSQL (PostGIS for heavy spatial querying)
* **Asset & Consensus Layer:** Creditcoin EVM (Solidity Smart Contracts)

### Creditcoin EVM Integration
Space Grid bypasses Substrate-specific complexities by leveraging Creditcoin’s Ethereum Virtual Machine compatibility. All financial logic, territory ownership, and protocol upgrades are handled via Solidity contracts deployed on the Creditcoin network.

**Network Configuration (Testnet)**
* **Network Name:** Creditcoin Testnet
* **RPC URL:** `https://rpc.cc3-testnet.creditcoin.network/`
* **Chain ID:** `102031`
* **Currency Symbol:** `tCTC`
* **Block Explorer:** `https://creditcoin-testnet.blockscout.com/`

---

## 🚀 DEPLOYMENT SEQUENCE

### 1. Smart Contract Deployment (Creditcoin EVM)
Ensure you have a funded wallet with tCTC from the Creditcoin Discord faucet.
```bash
cd contracts/
npm install
# Configure your .env with your private key and the Creditcoin Testnet RPC
npx hardhat run scripts/deploy.js --network creditcoinTestnet

```

### 2. Core Logic (FastAPI Backend)

The Python backend handles the PostGIS territory calculations and WebSocket trail broadcasting.

```bash
cd backend/
pip install -r requirements.txt
# Set SUPABASE_URL, SUPABASE_KEY, and CONTRACT_ADDRESS in .env
python scripts/init_spatial_db.py
uvicorn main:app --reload --port 8000

```

### 3. Interface Layer (React Frontend)

The client interface renders the neon-drenched grid and handles wallet connectivity.

```bash
cd frontend/
npm install
# Set VITE_RPC_URL to the Creditcoin RPC and VITE_WS_URL to the backend
npm run dev

```

---

## 📜 SMART CONTRACT OVERVIEW

* `GridEntry.sol`: Manages CTC staking pools for active grid sessions and handles the distribution of protocol rewards.
* `TerritoryRWA.sol`: An ERC-721 implementation that stores the encoded PostGIS bounding box coordinates as on-chain metadata, proving geographic ownership.
* `TacticsMarket.sol`: Handles micro-transactions for in-game power-ups (e.g., spending CTC to temporarily blind rival operators on the map).

---

## 👥 CORE PROTOCOL TEAM

* **Chandan Soni** - Protocol Architecture & EVM Smart Contracts
* **Nikhil Sharma** - Client Interface & Real-time Synchronization

---

## ⚖️ LICENSE

MIT License - The grid belongs to everyone and no one.
