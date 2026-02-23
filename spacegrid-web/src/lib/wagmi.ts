import { http, createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import { defineChain } from "viem";

export const creditcoin = defineChain({
    id: 102030,
    name: "Creditcoin",
    nativeCurrency: {
        decimals: 18,
        name: "CTC",
        symbol: "CTC",
    },
    rpcUrls: {
        default: {
            http: ["https://mainnet3.creditcoin.network"],
        },
        public: {
            http: ["https://mainnet3.creditcoin.network"],
        },
    },
    blockExplorers: {
        default: { name: "Explorer", url: "https://creditcoin.blockscout.com" },
    },
});

export const config = createConfig({
    chains: [creditcoin],
    connectors: [injected()],
    transports: {
        [creditcoin.id]: http(),
    },
});
