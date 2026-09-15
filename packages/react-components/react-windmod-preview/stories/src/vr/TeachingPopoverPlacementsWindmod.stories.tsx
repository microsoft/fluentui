import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import {
  TeachingPopover,
  TeachingPopoverHeader,
  TeachingPopoverSurface,
  TeachingPopoverTrigger,
} from '@fluentui/react-windmod-preview/teaching-popover';

import { TeachingPopoverPlacementsVrScene } from './TeachingPopoverPlacementsVrScene';

// Eight surfaces are pinned open at once — see PopoverGriffelComparison.stories.tsx.
const surfaceProps = { popover: 'manual' };

export const TeachingPopoverPlacementsWindmod = (): React.ReactNode => (
  <FluentProvider>
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
