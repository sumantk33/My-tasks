import AuthProvider from '@/context/AuthContext'
import PrimaryLayout from '@/layouts/PrimaryLayout'
import '@/styles/globals.scss'
import Meta from '@/utils/Meta'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <AuthProvider>
        <Meta />
        <PrimaryLayout>
          <Component {...pageProps} />
        </PrimaryLayout>
      </AuthProvider>
    </SessionContextProvider>
  ) 
}
