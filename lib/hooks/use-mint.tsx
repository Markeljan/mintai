'use client'

import { useState } from "react";
import { constants } from "@/lib/constants";
import { useWallet } from "@mintbase-js/react/lib/WalletContext";

export function useMint() {

    const [isLoading, setIsLoading] = useState(false);
    const { selector, activeAccountId } = useWallet();

    const mintImage = async (arweaveId: string) => {
        if (!activeAccountId) return null;
        const wallet = await selector.wallet();
        setIsLoading(true);

        const currentUrl = new URL(window.location.href);

        const protocol = currentUrl.protocol;
        const domain = currentUrl.hostname;
        const port = currentUrl.port;

        const result = await wallet?.signAndSendTransaction({
            signerId: activeAccountId,
            receiverId: constants.proxyContractAddress,
            actions: [
                {
                    type: "FunctionCall",
                    params: {
                        methodName: "mint",
                        args: {
                            metadata: JSON.stringify({
                                reference: arweaveId,
                                extra: null,
                            }),
                            nft_contract_id: constants.tokenContractAddress,
                        },
                        gas: "200000000000000",
                        deposit: "10000000000000000000000",
                    },
                },
            ],
            callbackUrl: `${protocol}//${domain}${!port ? "" : ":" + port}`,
        });
    };

    return { mintImage }
}
