import * as React from 'react';
import {
  createDOMRenderer,
  FluentProvider,
  GriffelRenderer,
  SSRProvider,
  RendererProvider,
  webLightTheme,
} from '@fluentui/react-components';
import type { AppProps } from 'next/app';

type EnhancedAppProps = AppProps & { renderer?: GriffelRenderer };

function MyApp({ Component, pageProps, renderer }: EnhancedAppProps) {
  const SSRProviderWithChildren = SSRProvider as React.FC<{ children: React.ReactNode }>;

  return (
    <RendererProvider renderer={renderer || createDOMRenderer()}>
      <SSRProviderWithChildren>
        <FluentProvider theme={webLightTheme}>
          <Component {...pageProps} />
        </FluentProvider>
      </SSRProviderWithChildren>
    </RendererProvider>
  );
}

export default MyApp;
