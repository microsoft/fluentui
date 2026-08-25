import * as React from 'react';
import { Button, FluentProvider, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-windmod-preview';
import {
  Button as GriffelButton,
  FluentProvider as GriffelFluentProvider,
  Popover as GriffelPopover,
  PopoverSurface as GriffelPopoverSurface,
  PopoverTrigger as GriffelPopoverTrigger,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

/**
 * Pinned-open windmod popover next to its Griffel-suite twin. The mechanisms differ (a native
 * <dialog> in the top layer + CSS anchor positioning vs portal + react-positioning) — the
 * SURFACES must match pixel-for-pixel; small placement offsets are the audit surface.
 */
export const GriffelComparison = (): React.ReactNode => (
  <div className={styles.spacer}>
    <FluentProvider>
      <Popover open withArrow>
        <PopoverTrigger>
          <Button>Windmod</Button>
        </PopoverTrigger>
        {/* popover='manual' ONLY because both sides are pinned open at once: popover='auto'
            surfaces are mutually exclusive by spec. */}
        <PopoverSurface popover="manual">Windmod popover</PopoverSurface>
      </Popover>
    </FluentProvider>
    <GriffelFluentProvider theme={webLightTheme}>
      <GriffelPopover open withArrow>
        <GriffelPopoverTrigger>
          <GriffelButton>Griffel</GriffelButton>
        </GriffelPopoverTrigger>
        <GriffelPopoverSurface>Griffel popover</GriffelPopoverSurface>
      </GriffelPopover>
    </GriffelFluentProvider>
  </div>
);
