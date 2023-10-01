import AuthProvider from '@/context/AuthContext'
import '@/styles/globals.scss'
import Meta from '@/utils/Meta'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { theme } from '@/utils/theme'
import Header from '@/components/common/header'

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
        <CacheProvider>
          <ChakraProvider theme={theme}>
            <AuthProvider>
              <Meta />
              <Header />
              <Component {...pageProps} />
            </AuthProvider>
          </ChakraProvider>
        </CacheProvider>
    </SessionContextProvider>
  ) 
}
