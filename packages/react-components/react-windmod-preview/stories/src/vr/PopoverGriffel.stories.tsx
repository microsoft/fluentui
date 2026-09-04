import * as React from 'react';
import {
  Button,
  FluentProvider,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  webLightTheme,
} from '@fluentui/react-components';

import { PopoverVrScene } from './PopoverVrScene';

// Griffel portals each surface to its own node, so nothing needs pinning.
const surfaceProps = {};

export const PopoverGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <PopoverVrScene
      Popover={Popover as never}
      PopoverTrigger={PopoverTrigger as never}
      PopoverSurface={PopoverSurface as never}
      Button={Button}
      surfaceProps={surfaceProps}
    />
  </FluentProvider>
);
