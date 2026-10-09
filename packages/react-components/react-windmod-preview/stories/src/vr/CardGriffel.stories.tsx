import * as React from 'react';
import { Card, CardFooter, CardHeader, CardPreview, FluentProvider, webLightTheme } from '@fluentui/react-components';

import { CardVrScene } from './CardVrScene';

export const CardGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <CardVrScene
      Card={Card}
      CardHeader={CardHeader}
      CardFooter={CardFooter}
      CardPreview={CardPreview}
      interactiveProps={{ focusMode: 'off' }}
    />
  </FluentProvider>
);
