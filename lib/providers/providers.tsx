'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'

import { TooltipProvider } from '@/components/ui/tooltip'
import { DataProvider } from '@/lib/providers/data-provider'
import { WalletProvider } from '@/lib/providers/wallet-provider'

export function Providers({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider {...props} >
            <TooltipProvider>
                <WalletProvider>
                    <DataProvider>
                        {children}
                    </DataProvider>
                </WalletProvider>
            </TooltipProvider>
        </NextThemesProvider>
    )
}