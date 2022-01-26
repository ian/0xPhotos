import '../styles/global.css'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider, styled } from 'baseui'
import AnalyticsProvider from 'next-lytics'
import { GoogleAnalytics, Plausible } from 'next-lytics/plugins'

import { Provider as Web3Provider } from '../hooks/useWeb3'
import { styletron } from '../lib/styletron'

const plugins = [
  GoogleAnalytics({
    trackingId: 'G-NVNNBJN6M7',
  }),
  Plausible({
    domain: '0xphotos.com',
  }),
]

function MyApp({ Component, pageProps }) {
  return (
    <AnalyticsProvider plugins={plugins}>
      <StyletronProvider value={styletron}>
        <BaseProvider theme={LightTheme}>
          <Web3Provider>
            <Component {...pageProps} />
          </Web3Provider>
        </BaseProvider>
      </StyletronProvider>
    </AnalyticsProvider>
  )
}

export default MyApp
