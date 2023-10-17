

import "@near-wallet-selector/modal-ui/styles.css";
import { WalletContextProvider } from "@mintbase-js/react";
import { setupAuthWallet } from "@mintbase-js/wallet";
import { constants } from "@/lib/constants";



export function WalletProvider({ children }: { children: React.ReactNode }) {

    return (
        <WalletContextProvider
            contractAddress={constants.tokenContractAddress}
            network={constants.network as any}
            additionalWallets={[
                //@ts-ignore
                setupAuthWallet({
                    networkId: constants.network as "testnet" | "mainnet",
                    relayerUrl: "/api/relay",
                    signInContractId: constants.tokenContractAddress,
                    walletUrl: constants.mintbaseWalletUrl,
                }),
            ]}
        >
            {children}
        </WalletContextProvider>
    )
};
