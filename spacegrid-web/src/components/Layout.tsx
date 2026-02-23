import { Link, useLocation, Outlet, Navigate, useNavigate } from "react-router-dom";
import { Globe, Crosshair, ShoppingCart, Vault, CurrencyEth, Wallet, User, SignOut } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const landingNavItems = [
  { path: "/#protocol", label: "The Protocol" },
  { path: "/#mechanics", label: "Mechanics" },
  { path: "/#technology", label: "Technology" },
  { path: "/#deployment", label: "Deployment" },
  { path: "/#economics", label: "Grid Economics" },
];

const appNavItems = [
  { path: "/grid", label: "Grid HUD" },
  { path: "/market", label: "Tactics" },
  { path: "/portfolio", label: "Territory" },
  { path: "/staking", label: "Economics" },
];

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const connectWallet = () => {
    connect({ connector: injected() });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-0"
          : "bg-transparent border-b-transparent py-2"
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Space Grid Logo" className="w-7 h-7" />
            <span className="font-lufga text-lg font-bold tracking-tight">SPACE GRID</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {(isConnected ? appNavItems : landingNavItems).map((item) => {
              const isActive = location.pathname === item.path;
              const isAnchor = item.path.includes("#");

              if (isAnchor) {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="px-3 py-1.5 text-sm font-space-mono rounded-md transition-colors duration-200 text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 text-sm font-space-mono rounded-md transition-colors duration-200 ${isActive
                    ? "text-primary font-bold"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Wallet */}
          {isConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden md:flex items-center gap-2 text-sm font-space-mono rounded-lg px-4 py-2 transition-all duration-200 bg-violet-light text-primary border border-primary/20">
                  <Wallet size={16} weight="duotone" />
                  {address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : "Connected"}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 font-space-mono">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={() => disconnect()}>
                  <SignOut className="mr-2 h-4 w-4" />
                  <span>Disconnect</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              onClick={connectWallet}
              className="hidden md:flex items-center gap-2 text-sm font-space-mono rounded-lg px-4 py-2 transition-all duration-200 btn-primary"
            >
              <Wallet size={16} weight="duotone" />
              Connect Wallet
            </button>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
          >
            <div className="space-y-1.5">
              <div className={`w-5 h-0.5 bg-foreground transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <div className={`w-5 h-0.5 bg-foreground transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <div className={`w-5 h-0.5 bg-foreground transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-2">
            {(isConnected ? appNavItems : landingNavItems).map((item) => {
              const isAnchor = item.path.includes("#");
              if (isAnchor) {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-sm font-space-mono text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-sm font-space-mono text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              );
            })}
            {isConnected ? (
              <div className="pt-2 pb-1 border-t border-border mt-4">
                <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Account</p>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 py-2 px-2 text-sm font-space-mono text-foreground hover:bg-muted rounded-md"
                >
                  <User size={16} />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    disconnect();
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 py-2 px-2 text-sm font-space-mono text-destructive hover:bg-destructive/10 rounded-md mt-1"
                >
                  <SignOut size={16} />
                  <span>Disconnect</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  connectWallet();
                  setMenuOpen(false);
                }}
                className="btn-primary w-full mt-2"
              >
                Connect Wallet
              </button>
            )}
          </div>
        )}
      </nav>

      <main className="flex-1 pt-20">
        {!isConnected && location.pathname !== "/" ? (
          <Navigate to="/" replace />
        ) : (
          <Outlet />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Space Grid Logo" className="w-5 h-5 opacity-50" />
            <span className="font-lufga font-bold">SPACE GRID</span>
          </div>
          <p className="text-xs text-muted-foreground font-space-mono">
            © 2024 Space Grid Protocol. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground font-space-mono text-center">
            Decentralized Physical Infrastructure and Location-Based RWA Protocol
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
