import * as React from 'react';
import {
  Button,
  FluentProvider,
  TeachingPopover,
  TeachingPopoverHeader,
  TeachingPopoverSurface,
  TeachingPopoverTrigger,
  webLightTheme,
} from '@fluentui/react-components';

import { TeachingPopoverPlacementsVrScene } from './TeachingPopoverPlacementsVrScene';

// Griffel portals each surface to its own node, so nothing needs pinning.
const surfaceProps = {};

export const TeachingPopoverPlacementsGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <TeachingPopoverPlacementsVrScene
      TeachingPopover={TeachingPopover as never}
      TeachingPopoverTrigger={TeachingPopoverTrigger as never}
      TeachingPopoverSurface={TeachingPopoverSurface as never}
      TeachingPopoverHeader={TeachingPopoverHeader as never}
      Button={Button}
      surfaceProps={surfaceProps}
    />
  </FluentProvider>
);
