import '../styles/global.css'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider, styled } from 'baseui'

import { Provider as Web3Provider } from '../hooks/useWeb3'
import { styletron } from '../lib/styletron'

function MyApp({ Component, pageProps }) {
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>
        <Web3Provider>
          <Component {...pageProps} />
        </Web3Provider>
      </BaseProvider>
    </StyletronProvider>
  )
}

export default MyApp
