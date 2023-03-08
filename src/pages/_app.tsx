import { Header } from '@/components/Header'
import { ContextProvider } from '@/contexts/Context'
import { globalStyles } from '@/styles/global'
import { AppContainer } from '@/styles/pages/_app'
import type { AppProps } from 'next/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContainer className="container">
      <ContextProvider>
        <Header />

        <Component {...pageProps} />
      </ContextProvider>
    </AppContainer>
  )
}
