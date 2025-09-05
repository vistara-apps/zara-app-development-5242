'use client';

import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { type ReactNode } from 'react';

// Define Base chain configuration
const base = {
  id: 8453,
  name: 'Base',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet.base.org'],
    },
  },
  blockExplorers: {
    default: { name: 'BaseScan', url: 'https://basescan.org' },
  },
} as const;

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MiniKitProvider
      chain={base}
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'cdp_demo_key'}
    >
      {children}
    </MiniKitProvider>
  );
}
