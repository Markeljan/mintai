'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'

import { TooltipProvider } from '@/components/ui/tooltip'
import { DataProvider } from '@/lib/providers/data-provider'

export function Providers({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider {...props} >
            <TooltipProvider>
                <DataProvider>
                    {children}
                </DataProvider>
            </TooltipProvider>
        </NextThemesProvider>
    )
}