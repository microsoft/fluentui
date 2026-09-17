import * as React from 'react';
import { FluentProvider, Link as GriffelLink, webLightTheme } from '@fluentui/react-components';

import { LinkVrScene } from './LinkVrScene';

export const LinkGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <LinkVrScene Link={GriffelLink} />
  </FluentProvider>
);
