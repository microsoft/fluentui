import * as React from 'react';
import { Button, FluentProvider, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-windmod-preview';

import { PopoverVrScene } from './PopoverVrScene';

// Fourteen surfaces are pinned open at once — see PopoverGriffelComparison.stories.tsx.
const surfaceProps = { popover: 'manual' };

export const PopoverWindmod = (): React.ReactNode => (
  <FluentProvider>
    <PopoverVrScene
      Popover={Popover as never}
      PopoverTrigger={PopoverTrigger as never}
      PopoverSurface={PopoverSurface as never}
      Button={Button}
      surfaceProps={surfaceProps}
    />
  </FluentProvider>
);
