import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Crosshair, MapPin, Lightning, Coins } from "@phosphor-icons/react";
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { toast } from "sonner";
import CoordinateTicker from "@/components/CoordinateTicker";
import { MapContainer, TileLayer, Marker, Polyline, Polygon, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useGameSocket } from "@/hooks/useGameSocket";

const LOBBIES = [
  { id: "free", name: "Training Grounds", fee: 0, description: "Practice arena. No stakes, no rewards." },
  { id: "low", name: "Sector 7G", fee: 10, description: "Low stakes engagement. Good for beginners." },
  { id: "mid", name: "Orbital Decay", fee: 50, description: "Standard tactical operations." },
  { id: "high", name: "The Void", fee: 100, description: "High stakes. High risk. High reward." },
];

const DEFAULT_POS: [number, number] = [34.0522, -118.2437]; // Los Angeles coordinates
const DUMMY_GAME_ID = "spacegrid-alpha-sector";

const createPulseIcon = (color: string, isMe: boolean) => L.divIcon({
  className: 'custom-pulse-icon',
  html: `<div class="relative flex items-center justify-center">
            <div class="absolute w-4 h-4 rounded-full animate-ping opacity-75" style="background-color: ${color}"></div>
            <div class="relative w-3 h-3 rounded-full border-2 border-white shadow-lg" style="background-color: ${color}; transform: scale(${isMe ? 1.2 : 1.0})"></div>
         </div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

// Recenter Helper
const Recenter = ({ pos }: { pos: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(pos);
  }, [pos, map]);
  return null;
};

const GridHUD = () => {
  const [hasJoinedGame, setHasJoinedGame] = useState(false);
  const [selectedLobby, setSelectedLobby] = useState<string | null>(null);

  const { isConnected, address } = useAccount();
  const { sendTransaction, data: hash, isPending: isConfirming } = useSendTransaction();
  const { isLoading: isMining, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Use wallet address as player ID for now, fallback to generic if not connected
  const playerId = address || "anonymous-runner";

  // Game Socket
  const { gameState, isConnected: wsConnected, sendPosition } = useGameSocket(
    hasJoinedGame ? DUMMY_GAME_ID : undefined,
    hasJoinedGame ? playerId : null
  );

  const [myPos, setMyPos] = useState<[number, number]>(DEFAULT_POS);
  const mapRef = useRef<L.Map | null>(null);

  // Sync refs for event listeners
  const myPosRef = useRef(myPos);
  const wsConnectedRef = useRef(wsConnected);
  useEffect(() => { myPosRef.current = myPos; }, [myPos]);
  useEffect(() => { wsConnectedRef.current = wsConnected; }, [wsConnected]);

  // Derived State
  const otherPlayers = useMemo(() => {
    return (gameState?.players || []).filter(p => p.id !== playerId);
  }, [gameState, playerId]);

  const trails = useMemo(() => {
    return (gameState?.trails || []).map(t => ({
      id: t.playerId,
      isMe: t.playerId.toLowerCase() === playerId.toLowerCase(),
      color: t.playerId.toLowerCase() === playerId.toLowerCase() ? '#5C27FE' : '#FF003C', // Violet for me, Crimson for others
      path: t.path.coordinates.map(c => [c[1], c[0]] as [number, number]) // [lat, lng]
    }));
  }, [gameState, playerId]);

  const territories = useMemo(() => {
    return (gameState?.territories || []).map(t => ({
      id: t.playerId,
      isMe: t.playerId.toLowerCase() === playerId.toLowerCase(),
      color: t.playerId.toLowerCase() === playerId.toLowerCase() ? '#5C27FE' : '#333333',
      path: t.polygon.coordinates[0].map(c => [c[1], c[0]] as [number, number]),
      area: t.area
    }));
  }, [gameState, playerId]);

  const myStats = useMemo(() => {
    const myTrail = trails.find(t => t.isMe);
    const points = myTrail ? myTrail.path.length : 0;
    const myTotalArea = territories.filter(t => t.isMe).reduce((acc, t) => acc + t.area, 0);
    return { area: myTotalArea, points };
  }, [trails, territories]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Transaction confirmed! Entering game...");
      setHasJoinedGame(true);
    }
  }, [isSuccess]);

  const handleJoin = (fee: number, lobbyId: string) => {
    if (!isConnected) {
      toast.error("Please connect your wallet first.");
      return;
    }

    if (fee === 0) {
      toast.success("Entering free training grounds...");
      setHasJoinedGame(true);
      return;
    }

    setSelectedLobby(lobbyId);

    // Dummy vault address for now
    const dummyRecepient = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
    try {
      sendTransaction({
        to: dummyRecepient,
        value: parseEther(fee.toString()),
      });
    } catch (error) {
      toast.error("Transaction failed to initiate");
      setSelectedLobby(null);
    }
  };

  // Keyboard Movement (Dev Testing)
  useEffect(() => {
    if (!hasJoinedGame) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 0.00002;
      let dLat = 0;
      let dLng = 0;

      switch (e.key) {
        case 'ArrowUp': case 'w': case 'W': dLat = step; break;
        case 'ArrowDown': case 's': case 'S': dLat = -step; break;
        case 'ArrowLeft': case 'a': case 'A': dLng = -step; break;
        case 'ArrowRight': case 'd': case 'D': dLng = step; break;
        default: return;
      }

      const currentPos = myPosRef.current;
      const newLat = currentPos[0] + dLat;
      const newLng = currentPos[1] + dLng;

      setMyPos([newLat, newLng]);

      if (wsConnectedRef.current) {
        sendPosition(newLat, newLng);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasJoinedGame, sendPosition]);

  // Geolocation Tracking
  useEffect(() => {
    if (!hasJoinedGame) return;

    let watchId: number | null = null;
    const startWatching = (highAccuracy: boolean) => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);

      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMyPos([latitude, longitude]);
          if (wsConnectedRef.current) {
            sendPosition(latitude, longitude);
          }
        },
        (err) => {
          console.warn(`Geolocation Error:`, err.message);
          if (highAccuracy) startWatching(false);
        },
        { enableHighAccuracy: highAccuracy, maximumAge: 5000, timeout: 10000 }
      );
    };

    if (navigator.geolocation) {
      startWatching(true);
    }

    return () => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    };
  }, [hasJoinedGame, sendPosition]);

  if (!hasJoinedGame) {
    return (
      <div className="relative min-h-[calc(100vh-64px)] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [background-position:0_0,10px_10px] p-6 lg:p-12 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full mx-auto space-y-10 mt-[-10vh]">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-lufga font-bold tracking-tighter text-black">
              Deploy to <span className="text-[#5C27FE]">The Grid</span>
            </h1>
            <p className="text-gray-600 font-space-mono max-w-lg mx-auto text-sm md:text-base">
              Choose your operational sector. Higher stakes yield higher network dividends and tokenized rewards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LOBBIES.map((lobby) => (
              <div
                key={lobby.id}
                className="surface-panel rounded-lg p-6 card-hover relative flex flex-col h-full bg-white"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-lufga font-bold mb-2 text-black">{lobby.name}</h3>
                      <p className="text-sm text-gray-500 font-space-mono">{lobby.description}</p>
                    </div>
                    {lobby.fee > 0 ? (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-[#5C27FE]/10 rounded-full border border-[#5C27FE]/20 text-[#5C27FE] font-bold text-sm">
                        <Coins size={16} weight="duotone" />
                        {lobby.fee} CTC
                      </div>
                    ) : (
                      <div className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200 text-gray-500 text-sm font-bold">
                        FREE
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-6">
                    <button
                      onClick={() => handleJoin(lobby.fee, lobby.id)}
                      disabled={(isConfirming || isMining) && selectedLobby === lobby.id}
                      className="w-full bg-[#5C27FE] text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_15px_rgba(92,39,254,0.3)] font-space-mono text-sm tracking-wider flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {(isConfirming || isMining) && selectedLobby === lobby.id ? (
                        <>
                          <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                          {isConfirming ? "CONFIRMING..." : "DEPLOYING..."}
                        </>
                      ) : (
                        <>DEPLOY <Crosshair size={16} weight="bold" /></>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-64px)] bg-[#f3f4f6] overflow-hidden relative z-0">

      {/* Map Layer */}
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={myPos}
          zoom={18}
          style={{ height: '100%', width: '100%', backgroundColor: '#f3f4f6' }}
          zoomControl={false}
          attributionControl={false}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            maxZoom={20}
          />

          <Recenter pos={myPos} />

          {/* Territories */}
          {territories.map((terr, idx) => (
            <Polygon
              key={`terr-${idx}`}
              positions={terr.path}
              pathOptions={{
                color: terr.color,
                fillColor: terr.color,
                fillOpacity: 0.15,
                weight: 2,
                stroke: true
              }}
            />
          ))}

          {/* Trails */}
          {trails.map((trail, idx) => (
            <Polyline
              key={`trail-${idx}`}
              positions={trail.path}
              pathOptions={{
                color: trail.color,
                weight: trail.isMe ? 4 : 3,
                opacity: 0.8,
                lineCap: 'square'
              }}
            />
          ))}

          {/* My Marker */}
          <Marker position={myPos} icon={createPulseIcon('#5C27FE', true)} />

          {/* Other Players */}
          {otherPlayers.map(p => {
            const pTrail = trails.find(t => t.id.toLowerCase() === p.id.toLowerCase());
            if (!pTrail || !pTrail.path || pTrail.path.length === 0) return null;
            const currentPos = pTrail.path[pTrail.path.length - 1];
            return (
              <Marker
                key={p.id}
                position={currentPos}
                icon={createPulseIcon(pTrail.color, false)}
              />
            );
          })}
        </MapContainer>
      </div>

      {/* Top HUD */}
      <div className="absolute top-4 left-4 z-[400] flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3">
        <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm rounded-lg px-3 py-2 flex items-center gap-2 text-xs font-space-mono">
          <Crosshair size={16} weight="duotone" className="text-[#5C27FE]" />
          <span className="text-gray-600 font-bold">OPERATOR MODE</span>
        </div>
        <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm rounded-lg px-3 py-2 flex items-center gap-2 text-xs font-space-mono">
          <MapPin size={16} weight="duotone" className="text-[#5C27FE]" />
          <span className="text-[#5C27FE] font-bold">{myStats.points}</span>
          <span className="text-gray-500">TRAIL</span>
        </div>
      </div>

      {/* Top Right HUD */}
      <div className="hidden md:block absolute top-4 right-4 z-[400]">
        <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm rounded-lg px-4 py-3 text-xs font-space-mono space-y-2 min-w-[180px]">
          <div className="flex justify-between gap-6 items-center">
            <span className="text-gray-500">EMISSION</span>
            <span className={wsConnected ? "text-[#10b981] font-bold flex items-center gap-1.5" : "text-red-500 font-bold flex items-center gap-1.5"}>
              <div className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-[#10b981] animate-pulse' : 'bg-red-500'}`} />
              {wsConnected ? "ACTIVE" : "OFFLINE"}
            </span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-gray-500">STATUS</span>
            <span className="text-[#5C27FE] font-bold">TRACING</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-gray-500">AREA</span>
            <span className="font-bold text-gray-800">{myStats.area.toFixed(2)} m&sup2;</span>
          </div>
        </div>
      </div>

      {/* Bottom Left: Live Coordinates */}
      <div className="absolute bottom-20 md:bottom-6 left-1/2 md:left-4 -translate-x-1/2 md:translate-x-0 z-[400] w-[calc(100%-2rem)] md:w-auto flex justify-center md:justify-start">
        <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          <CoordinateTicker customLat={myPos[0]} customLng={myPos[1]} />
        </div>
      </div>

      {/* Bottom Center: Register Territory CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[400]"
      >
        <button className="bg-[#5C27FE] text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(92,39,254,0.4)] font-space-mono text-sm tracking-wider flex items-center gap-2">
          <Lightning size={18} weight="fill" className="animate-pulse" />
          REGISTER TERRITORY
        </button>
      </motion.div>

      {/* Bottom Right HUD */}
      <div className="hidden md:block absolute bottom-6 right-4 z-[400]">
        <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm rounded-lg px-4 py-3 text-xs font-space-mono space-y-2 min-w-[180px]">
          <div className="flex justify-between gap-6">
            <span className="text-gray-500">RUNNERS</span>
            <span className="font-bold text-gray-800">{otherPlayers.length}</span>
          </div>
          <div className="flex justify-between gap-6 items-center">
            <span className="text-gray-500">INTERFERENCE</span>
            <span className="text-[#10b981] font-bold">CLEAR</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-gray-500">BLOCK</span>
            <span className="text-gray-400">#4,891,203</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridHUD;
