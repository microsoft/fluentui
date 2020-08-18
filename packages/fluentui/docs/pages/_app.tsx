import { Provider, teamsTheme } from '@fluentui/react-northstar';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider theme={teamsTheme}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
