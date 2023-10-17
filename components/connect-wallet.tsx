'use client'

import { useWallet } from "@mintbase-js/react"
import { Button } from "@/components/ui/button"

export function ConnectWallet() {
    const { connect, disconnect, isConnected } = useWallet()

    return (
        <Button
            className="mr-4"
            onClick={() => {
                if (isConnected) {
                    disconnect()
                } else {
                    connect()
                }
            }}
        >
            {isConnected ? "Disconnect" : "Connect Wallet"}
        </Button>
    )
};
