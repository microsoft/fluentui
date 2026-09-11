import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverFooter,
  TeachingPopoverHeader,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
} from '@fluentui/react-windmod-preview/teaching-popover';

import { TeachingPopoverVrScene } from './TeachingPopoverVrScene';

// Four surfaces are pinned open at once — see PopoverGriffelComparison.stories.tsx.
const surfaceProps = { popover: 'manual' };

export const TeachingPopoverWindmod = (): React.ReactNode => (
  <FluentProvider>
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
