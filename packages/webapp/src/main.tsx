import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'

import App from './App'
import { wagmiConfig } from './lib/wagmi'
import './styles.css'
import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient()

const theme = darkTheme({
  accentColor: '#F07A3F',
  accentColorForeground: '#14110e',
  borderRadius: 'medium',
  overlayBlur: 'small',
  fontStack: 'system',
})

function Root() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en-US" theme={theme}>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <App />
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
