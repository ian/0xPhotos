import '../styles/global.css'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider, styled } from 'baseui'
import { MoralisProvider } from 'react-moralis'

import { styletron } from '../lib/styletron'

function MyApp({ Component, pageProps }) {
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>
        <MoralisProvider
          appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
          serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
        >
          <Component {...pageProps} />
        </MoralisProvider>
      </BaseProvider>
    </StyletronProvider>
  )
}

export default MyApp
