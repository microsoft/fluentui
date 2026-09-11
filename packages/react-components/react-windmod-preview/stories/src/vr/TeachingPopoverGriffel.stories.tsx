import * as React from 'react';
import {
  Button,
  FluentProvider,
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverFooter,
  TeachingPopoverHeader,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
  webLightTheme,
} from '@fluentui/react-components';

import { TeachingPopoverVrScene } from './TeachingPopoverVrScene';

// Griffel portals each surface to its own node, so nothing needs pinning.
const surfaceProps = {};

export const TeachingPopoverGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <TeachingPopoverVrScene
      TeachingPopover={TeachingPopover as never}
      TeachingPopoverTrigger={TeachingPopoverTrigger as never}
      TeachingPopoverSurface={TeachingPopoverSurface as never}
      TeachingPopoverHeader={TeachingPopoverHeader as never}
      TeachingPopoverTitle={TeachingPopoverTitle as never}
      TeachingPopoverBody={TeachingPopoverBody as never}
      TeachingPopoverFooter={TeachingPopoverFooter as never}
      Button={Button}
      surfaceProps={surfaceProps}
    />
  </FluentProvider>
);
