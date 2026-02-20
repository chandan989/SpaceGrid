import { Crosshair, Trophy, Skull, PresentationChart, Medal, MapPin, GameController, WarningCircle, CheckCircle } from "@phosphor-icons/react";

interface Match {
    id: string;
    opponent: string;
    result: "Victory" | "Defeat" | "Draw";
    areaCaptured: string;
    tacticsUsed: number;
    date: string;
}

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: JSX.Element;
    dateEarned: string;
}

const mockMatches: Match[] = [
    { id: "M-992", opponent: "0x4F12...8A9b", result: "Victory", areaCaptured: "1.2", tacticsUsed: 2, date: "2026-02-19" },
    { id: "M-987", opponent: "0x1A2B...3C4D", result: "Defeat", areaCaptured: "0.0", tacticsUsed: 1, date: "2026-02-18" },
    { id: "M-981", opponent: "0x9E8D...7C6B", result: "Victory", areaCaptured: "2.4", tacticsUsed: 5, date: "2026-02-15" },
    { id: "M-975", opponent: "0x5A4B...6C7D", result: "Victory", areaCaptured: "0.8", tacticsUsed: 0, date: "2026-02-10" },
    { id: "M-962", opponent: "0x1122...3344", result: "Draw", areaCaptured: "0.5", tacticsUsed: 3, date: "2026-02-05" },
];

const mockAchievements: Achievement[] = [
    { id: "A-01", title: "First Blood", description: "Won your first territory dispute.", icon: <Crosshair size={24} className="text-destructive" />, dateEarned: "2026-01-10" },
    { id: "A-02", title: "Grid Master", description: "Captured over 10km² in total area.", icon: <MapPin size={24} className="text-primary" />, dateEarned: "2026-02-01" },
    { id: "A-03", title: "Tactician", description: "Successfully deployed 5 tactics in a single match.", icon: <PresentationChart size={24} className="text-yellow-500" />, dateEarned: "2026-02-15" },
];

const StatCard = ({ title, value, icon, highlight = false }: { title: string; value: string | number; icon: JSX.Element; highlight?: boolean }) => (
    <div className={`surface-panel rounded-lg p-5 flex items-center justify-between ${highlight ? 'border-primary/50 bg-violet-light/10 shadow-[0_0_15px_rgba(92,39,254,0.1)]' : ''}`}>
        <div>
            <p className="font-space-mono text-xs text-muted-foreground tracking-wider mb-2">{title}</p>
            <h3 className={`font-space-mono text-2xl font-bold ${highlight ? 'text-primary' : 'text-foreground'}`}>{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${highlight ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
            {icon}
        </div>
    </div>
);

const Profile = () => {
    const totalMatches = 152;
    const wins = 89;
    const losses = 51;
    const draws = totalMatches - wins - losses;
    const winRate = ((wins / totalMatches) * 100).toFixed(1);

    return (
        <div className="min-h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [background-position:0_0,10px_10px] pb-24 pt-10">
            <div className="max-w-6xl mx-auto px-6 space-y-12">

                {/* Profile Header */}
                <section className="flex flex-col md:flex-row items-start md:items-center gap-6 surface-panel p-8 rounded-xl border border-border">
                    <div className="relative w-24 h-24 shrink-0">
                        {/* Hexagonal/Tech borders */}
                        <div className="absolute inset-0 border-2 border-primary/40 rounded-lg transform rotate-3 transition-transform duration-500 hover:rotate-6"></div>
                        <div className="absolute inset-0 border border-border rounded-lg bg-muted/30 flex items-center justify-center overflow-hidden z-10">
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(92,39,254,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[bg-pan_3s_linear_infinite]" />
                            <img src="/logo.svg" alt="Avatar" className="w-14 h-14 opacity-80 z-20" />
                        </div>
                        {/* Corner accents */}
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-primary z-20"></div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-primary z-20"></div>
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="font-lufga text-3xl font-bold">0x7F3a...9B2c</h1>
                            <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-space-mono font-bold tracking-widest">RANK: VANGUARD</span>
                        </div>
                        <p className="font-space-mono text-muted-foreground text-sm">Joined Sector: Alpha-7 • Last Active: 2 hours ago</p>
                    </div>
                    <div className="hidden md:block text-right space-y-1">
                        <p className="font-space-mono text-xs text-muted-foreground tracking-wider">TOTAL AREA CONTROLLED</p>
                        <p className="font-space-mono text-2xl font-bold text-primary">14.6 km²</p>
                    </div>
                </section>

                {/* Lifetime Stats */}
                <section>
                    <div className="mb-6">
                        <h2 className="font-lufga text-2xl flex items-center gap-2"><Trophy className="text-primary" /> Combat Record</h2>
                        <p className="font-space-mono text-sm text-muted-foreground mt-1">Lifetime performance metrics across all contested sectors.</p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard title="MATCHES PLAYED" value={totalMatches} icon={<GameController size={24} />} />
                        <StatCard title="VICTORIES" value={wins} icon={<Trophy size={24} />} highlight />
                        <StatCard title="DEFEATS" value={losses} icon={<Skull size={24} />} />
                        <StatCard title="WIN RATE" value={`${winRate}%`} icon={<PresentationChart size={24} />} />
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Match History */}
                    <section className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-lufga text-2xl">Recent Engagements</h2>
                            <button className="text-xs font-space-mono text-primary hover:underline">View Full Log</button>
                        </div>

                        <div className="surface-panel rounded-xl overflow-hidden border border-border">
                            <table className="w-full text-left font-space-mono">
                                <thead className="bg-muted/50 text-xs text-muted-foreground border-b border-border">
                                    <tr>
                                        <th className="p-4 font-normal">ENGAGEMENT ID</th>
                                        <th className="p-4 font-normal">OPPONENT</th>
                                        <th className="p-4 font-normal">OUTCOME</th>
                                        <th className="p-4 font-normal text-right">AREA / TACTICS</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-border">
                                    {mockMatches.map((match) => (
                                        <tr key={match.id} className="hover:bg-muted/30 transition-colors">
                                            <td className="p-4 font-bold">{match.id}</td>
                                            <td className="p-4">{match.opponent}</td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-bold
                          ${match.result === 'Victory' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                                                        match.result === 'Defeat' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                                                            'bg-orange-500/10 text-orange-600 border-orange-500/20'
                                                    }`}>
                                                    {match.result === 'Victory' && <CheckCircle weight="bold" />}
                                                    {match.result === 'Defeat' && <WarningCircle weight="bold" />}
                                                    {match.result}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="font-bold">{match.areaCaptured} km²</div>
                                                <div className="text-xs text-muted-foreground mt-1">{match.tacticsUsed} Tactics Used</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Achievements */}
                    <section>
                        <h2 className="font-lufga text-2xl mb-6 flex items-center gap-2"><Medal className="text-yellow-500" /> Commendations</h2>
                        <div className="space-y-4">
                            {mockAchievements.map((achievement) => (
                                <div key={achievement.id} className="surface-panel rounded-xl p-5 flex gap-4 items-start border border-border hover:border-primary/40 transition-colors">
                                    <div className="p-3 bg-muted rounded-lg shrink-0">
                                        {achievement.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-space-mono font-bold">{achievement.title}</h4>
                                        <p className="text-xs font-space-mono text-muted-foreground mt-1 leading-relaxed">{achievement.description}</p>
                                        <p className="text-[10px] font-space-mono text-muted-foreground mt-3 uppercase tracking-wider">{achievement.dateEarned}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-4 py-3 border border-dashed border-border rounded-xl text-xs font-space-mono text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
                            View All Unlocked Commendations
                        </button>
                    </section>

                </div>

            </div>
        </div>
    );
};

export default Profile;
